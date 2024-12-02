/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.espe.msvc.usuarios.controllers;

import com.espe.msvc.usuarios.models.Usuario;
import com.espe.msvc.usuarios.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author USER
 */



import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Listar todos los usuarios
    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioService.listarUsuarios();
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

    // Crear un nuevo usuario
    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioService.guardarUsuario(usuario);
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
    }
    
    // Endpoint para editar un usuario
    @PutMapping("/{id}")
    public ResponseEntity<String> editarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioActualizado) {
        // Buscar el usuario en la base de datos
        Usuario usuarioExistente = usuarioService.buscarUsuario(id);

        // Si el usuario no existe, devolver un mensaje de error
        if (usuarioExistente == null) {
            return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }

        // Actualizar los datos del usuario
        usuarioExistente.setNombre(usuarioActualizado.getNombre());
        usuarioExistente.setCorreo(usuarioActualizado.getCorreo());
        usuarioExistente.setTipoUsuario(usuarioActualizado.getTipoUsuario());
        usuarioExistente.setEstado(usuarioActualizado.getEstado());

        // Guardar los cambios
        usuarioService.guardarUsuario(usuarioExistente);

        // Devolver mensaje de éxito
        return new ResponseEntity<>("Usuario actualizado con éxito", HttpStatus.OK);
    }

    // Eliminar un usuario por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioService.buscarUsuario(id);
        if (usuario == null) {
            // Si el usuario no se encuentra, se devuelve un mensaje con un código de estado 404
            return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }
        
        // Si el usuario existe, se procede a eliminarlo
        usuarioService.eliminarUsuario(id);
        
        // Devolvemos un mensaje personalizado junto con el código de estado 200 OK
        return new ResponseEntity<>("Usuario eliminado con éxito", HttpStatus.OK);
    }
}
