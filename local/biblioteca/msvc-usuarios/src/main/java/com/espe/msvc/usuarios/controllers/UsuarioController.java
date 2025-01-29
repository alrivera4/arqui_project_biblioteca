package com.espe.msvc.usuarios.controllers;

import com.espe.msvc.usuarios.models.Usuario;
import com.espe.msvc.usuarios.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Listar todos los usuarios
    /*@GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioService.listarUsuarios();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }*/
    
    // Listar usuarios por biblioteca
    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuariosPorBiblioteca(@RequestParam Long bibliotecaId) {
        List<Usuario> usuarios = usuarioService.listarUsuariosPorBiblioteca(bibliotecaId);
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioService.buscarUsuario(id);
        if (usuario != null) {
            return new ResponseEntity<>(usuario, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Crear un nuevo usuario asociado a una biblioteca
    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario, @RequestParam Long bibliotecaId) {
        try {
            Usuario nuevoUsuario = usuarioService.guardarUsuario(usuario, bibliotecaId);
            return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Endpoint para editar un usuario
    @PutMapping("/{id}")
    public ResponseEntity<String> editarUsuario(
            @PathVariable Long id,
            @RequestBody Usuario usuarioActualizado,
            @RequestParam(required = false) Long bibliotecaId) {

        Usuario usuarioExistente = usuarioService.buscarUsuario(id);

        if (usuarioExistente == null) {
            return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }
        usuarioExistente.setNombre(usuarioActualizado.getNombre());
        usuarioExistente.setCorreo(usuarioActualizado.getCorreo());
        usuarioExistente.setTipoUsuario(usuarioActualizado.getTipoUsuario());

        // Usar el bibliotecaId proporcionado o mantener el actual
        Long bibliotecaIdFinal = bibliotecaId != null ? bibliotecaId : usuarioExistente.getBiblioteca().getBibliotecaId();

        usuarioService.guardarUsuario(usuarioExistente, bibliotecaIdFinal);

        return new ResponseEntity<>("Usuario actualizado con éxito", HttpStatus.OK);
    }

    /*@PutMapping("/{id}")
    public ResponseEntity<String> editarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioActualizado) {
        Usuario usuarioExistente = usuarioService.buscarUsuario(id);

        if (usuarioExistente == null) {
            return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }

        usuarioExistente.setNombre(usuarioActualizado.getNombre());
        usuarioExistente.setCorreo(usuarioActualizado.getCorreo());
        usuarioExistente.setTipoUsuario(usuarioActualizado.getTipoUsuario());
        
        usuarioService.guardarUsuario(usuarioExistente);

        return new ResponseEntity<>("Usuario actualizado con éxito", HttpStatus.OK);
    }*/

    // Eliminar un usuario por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioService.buscarUsuario(id);
        if (usuario == null) {
            return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }
        usuarioService.eliminarUsuario(id);
        return new ResponseEntity<>("Usuario eliminado con éxito", HttpStatus.OK);
    }
}
