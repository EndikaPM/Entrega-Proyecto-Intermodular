package com.timely.ProyectoTimely.controller;

import com.timely.ProyectoTimely.model.Usuario;
import com.timely.ProyectoTimely.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // GET /api/usuarios → Todos los usuarios
    @GetMapping
    public List<Usuario> getAll() {
        return usuarioRepository.findAll();
    }

    // GET /api/usuarios/52413669H → Un usuario por DNI
    @GetMapping("/{dni}")
    public ResponseEntity<Usuario> getByDni(@PathVariable String dni) {
        Optional<Usuario> usuario = usuarioRepository.findById(dni);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        }
        return ResponseEntity.notFound().build();
    }

    // POST /api/usuarios → Crear usuario
    @PostMapping
    public ResponseEntity<Usuario> create(@RequestBody Usuario usuario) {
        Usuario guardado = usuarioRepository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
    }

    // PUT /api/usuarios/52413669H → Actualizar usuario
    @PutMapping("/{dni}")
    public ResponseEntity<Usuario> update(@PathVariable String dni,
                                          @RequestBody Usuario usuario) {
        if (!usuarioRepository.existsById(dni)) {
            return ResponseEntity.notFound().build();
        }
        usuario.setDni(dni);
        Usuario actualizado = usuarioRepository.save(usuario);
        return ResponseEntity.ok(actualizado);
    }

    // DELETE /api/usuarios/52413669H → Eliminar usuario
    @DeleteMapping("/{dni}")
    public ResponseEntity<Void> delete(@PathVariable String dni) {
        if (!usuarioRepository.existsById(dni)) {
            return ResponseEntity.notFound().build();
        }
        usuarioRepository.deleteById(dni);
        return ResponseEntity.noContent().build();
    }
}
