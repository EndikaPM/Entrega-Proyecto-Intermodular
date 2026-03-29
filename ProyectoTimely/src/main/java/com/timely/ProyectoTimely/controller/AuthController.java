package com.timely.ProyectoTimely.controller;

import com.timely.ProyectoTimely.Service.AuthService;
import com.timely.ProyectoTimely.model.Dto.LoginRequisitoDto;
import com.timely.ProyectoTimely.model.Dto.LoginRespuestaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequisitoDto loginRequisitos) {
        try {
            //Llamar al servicio para autenticar
            LoginRespuestaDto respuesta = authService.autenticar(loginRequisitos);
            return ResponseEntity.ok(respuesta);
        } catch (IllegalArgumentException e) {
            // Credenciales inválidas o datos mal formados
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            // Error inesperado del servidor
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Error interno del servidor"));
        }
    }

    /**
     * Clase interna para devolver mensajes de error en formato JSON.
     * Ejemplo: { "error": "Credenciales inválidas" }
     */
    private static class ErrorResponse {
        private String error;

        public ErrorResponse(String error) {
            this.error = error;
        }

        public String getError() {
            return error;
        }

        public void setError(String error) {
            this.error = error;
        }
    }
}
