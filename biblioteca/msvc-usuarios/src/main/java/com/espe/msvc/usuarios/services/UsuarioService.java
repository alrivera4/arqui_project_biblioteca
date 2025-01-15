/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.espe.msvc.usuarios.services;

import com.espe.msvc.usuarios.models.Usuario;
import java.util.List;
/**
 *
 * @author USER
 */

public interface UsuarioService {
    List<Usuario> listarUsuarios();
    Usuario guardarUsuario(Usuario usuario, Long bibliotecaId);
    Usuario buscarUsuario(Long id);
    void eliminarUsuario(Long id);
}
