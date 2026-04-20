package com.timely.ProyectoTimely.controller;

import com.timely.ProyectoTimely.model.Usuario;
import com.timely.ProyectoTimely.repository.DepartamentoRepository;
import com.timely.ProyectoTimely.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private DepartamentoRepository departamentoRepository;

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
        if(usuario.getDepartamento() != null){
            departamentoRepository.findById(usuario.getDepartamento().getId())
                    .ifPresent(usuario::setDepartamento);
        }

        Usuario guardado = usuarioRepository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
    }

    // PUT /api/usuarios/52413669H → Actualizar usuario
    @PutMapping("/{dni}")
    public ResponseEntity<Usuario> update(@PathVariable String dni, @RequestBody Usuario usuarioNuevo) {
        // Esto busca si el usuario original  exite en BD
        return  usuarioRepository.findById(dni).map(usuarioExitente -> {
            //Actualizar los campos que modificar
            usuarioExitente.setFirstName(usuarioNuevo.getFirstName());
            usuarioExitente.setLastName(usuarioNuevo.getLastName());
            usuarioExitente.setEmail(usuarioNuevo.getEmail());
            if (usuarioNuevo.getPassword() != null && usuarioNuevo.getPassword().isEmpty()) {
                usuarioExitente.setPassword(usuarioNuevo.getPassword());
            }
            usuarioExitente.setBirthday(usuarioNuevo.getBirthday());
            usuarioExitente.setContractDate(usuarioNuevo.getContractDate());
            usuarioExitente.setSocialSecurity(usuarioExitente.getSocialSecurity());
            usuarioExitente.setDepartamento(usuarioNuevo.getDepartamento());

            //Aqí guardo lo modificado
            Usuario actualizado = usuarioRepository.save(usuarioExitente);
            return ResponseEntity.ok(actualizado);// genera un mensaje de Accion correcta
        }).orElse(ResponseEntity.notFound().build());//genera un mensaje de no exixte el usuario
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
