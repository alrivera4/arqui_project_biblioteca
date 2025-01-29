/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.espe.msvc.usuarios.services;

/**
 *
 * @author USER
 */

import com.espe.msvc.usuarios.models.Biblioteca;
import com.espe.msvc.usuarios.models.Usuario;
import com.espe.msvc.usuarios.repositories.BibliotecaRepository;
import com.espe.msvc.usuarios.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private BibliotecaRepository bibliotecaRepository;

    @Override
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }
    
     @Override
    public List<Usuario> listarUsuariosPorBiblioteca(Long bibliotecaId) {
        return usuarioRepository.findByBiblioteca_BibliotecaId(bibliotecaId);
    }

     @Override
     @Transactional
    public Usuario guardarUsuario(Usuario usuario, Long bibliotecaId) {
        if (usuario.getEstado() == null) {
            usuario.setEstado("activo");
        }
        // Validar biblioteca
        Biblioteca biblioteca = bibliotecaRepository.findById(bibliotecaId)
            .orElseThrow(() -> new IllegalArgumentException("Biblioteca no encontrada"));

        // Asociar usuario con biblioteca
        usuario.setBiblioteca(biblioteca);

        // Guardar usuario
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario buscarUsuario(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @Override
    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }
}

