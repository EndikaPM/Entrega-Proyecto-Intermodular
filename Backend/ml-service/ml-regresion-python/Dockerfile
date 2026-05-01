# 1. Imagen base ligera de Python
FROM python:3.10-slim

# 2. Directorio de trabajo dentro del contenedor
WORKDIR /code

# 3. Copiar solo el archivo de requisitos para aprovechar la caché de capas
COPY requirements.txt .

# 4. Instalar las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copiar el resto del código y los modelos ya entrenados
# Copiamos la carpeta app y la carpeta models al contenedor
COPY ./app ./app
COPY ./models ./models

# 6. Exponer el puerto donde corre FastAPI
EXPOSE 8001

# 7. Comando para arrancar la aplicación
# Usamos el formato de módulo para que encuentre bien las rutas
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
