package com.timely.ProyectoTimely.controller;

import com.timely.ProyectoTimely.model.Usuario;
import com.timely.ProyectoTimely.repository.DepartamentoRepository;
import com.timely.ProyectoTimely.repository.UsuarioRepository;
import com.timely.ProyectoTimely.util.CheckDni;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static com.timely.ProyectoTimely.util.CheckDni.validDni;

@RestController
@RequestMapping("/api/v1/usuarios")
@CrossOrigin("*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private DepartamentoRepository departamentoRepository;

    
    @GetMapping
    public List<Usuario> getAll() {
        return usuarioRepository.findAll();
    }

    
    @GetMapping("/{dni}")
    public ResponseEntity<Usuario> getByDni(@PathVariable String dni) {
        Optional<Usuario> usuario = usuarioRepository.findById(dni);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        }
        return ResponseEntity.notFound().build();
    }

   
    @PostMapping
    public ResponseEntity<Usuario> create(@RequestBody Usuario usuario) {
        if(usuario.getDepartamento() != null){
            departamentoRepository.findById(usuario.getDepartamento().getId())
                    .ifPresent(usuario::setDepartamento);
        }

        Usuario guardado = usuarioRepository.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
    }

    
    @PutMapping("/{dni}")
    public ResponseEntity<Usuario> update(@PathVariable String dni, @RequestBody Usuario usuarioNuevo) {
        
        return  usuarioRepository.findById(dni).map(usuarioExitente -> {
            
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

           
            Usuario actualizado = usuarioRepository.save(usuarioExitente);
            return ResponseEntity.ok(actualizado);
        }).orElse(ResponseEntity.notFound().build());
    }

    
    @DeleteMapping("/{dni}")
    public ResponseEntity<Void> delete(@PathVariable String dni) {
        if (!usuarioRepository.existsById(dni)) {
            return ResponseEntity.notFound().build();
        }
        usuarioRepository.deleteById(dni);
        return ResponseEntity.noContent().build();
    }
}
