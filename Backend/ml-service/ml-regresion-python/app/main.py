from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import pandas as pd
import joblib
import json
from pathlib import Path

FESTIVOS = {
    (1, 1),   
    (1, 6),   
    (5, 1),   
    (8, 15),  
    (10, 12), 
    (11, 1),  
    (12, 6),  
    (12, 8),  
    (12, 25), 
}

app = FastAPI(title="Timely ML — Regresión de ausencias", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Cargar modelo una sola vez al arrancar ---
BASE_DIR   = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"

modelo       = joblib.load(MODELS_DIR / "modelo_regresion.pkl")
features_list = joblib.load(MODELS_DIR / "features_list.pkl")
with open(MODELS_DIR / "modelo_metadata.json") as f:
    metadata = json.load(f)

N_EMPLEADOS = metadata["n_empleados"]   # 20

# --- Schemas ---
class PrediccionRequest(BaseModel):
    fecha: str          # "YYYY-MM-DD"

class PrediccionResponse(BaseModel):
    fecha:      str
    dia_semana: str
    ausencias:  int     # número entero redondeado
    porcentaje: float   # ausencias / n_empleados * 100
    alerta:     bool    # True si porcentaje >= 80

# --- Endpoint ---
DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

@app.post("/api/v1/predecir", response_model=PrediccionResponse)
def predecir(req: PrediccionRequest):
    try:
        fecha = datetime.strptime(req.fecha, "%Y-%m-%d")
    except ValueError:
        raise HTTPException(400, "Formato inválido. Usa YYYY-MM-DD")

    if fecha.weekday() >= 5:
        raise HTTPException(400, "Fin de semana: no hay jornada laboral")

    mes = fecha.month
    dia = fecha.day
    es_festivo = int((mes, dia) in FESTIVOS)
    X = pd.DataFrame([{
        "dia_semana":  fecha.weekday(),
        "mes":         mes,
        "es_lunes":    int(fecha.weekday() == 0),
        "es_viernes":  int(fecha.weekday() == 4),
        "es_invierno": int(mes in [12, 1, 2]),
        "es_verano":   int(mes in [6, 7, 8]),
        "es_festivo":  es_festivo,
    }])[features_list]

    raw       = float(modelo.predict(X)[0])
    ausencias = int(round(max(0, min(N_EMPLEADOS, raw))))
    porcentaje = round(ausencias / N_EMPLEADOS * 100, 1)

    return PrediccionResponse(
        fecha      = req.fecha,
        dia_semana = DIAS[fecha.weekday()],
        ausencias  = ausencias,
        porcentaje = porcentaje,
        alerta     = porcentaje >= 80.0,
    )

@app.get("/api/v1/health")
def health():
    return {"status": "ok", "modelo": metadata["tipo"], "r2": metadata["r2"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)