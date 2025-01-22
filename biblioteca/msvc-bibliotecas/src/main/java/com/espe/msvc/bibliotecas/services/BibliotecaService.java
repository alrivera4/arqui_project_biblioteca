/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.espe.msvc.bibliotecas.services;

import com.espe.msvc.bibliotecas.models.Biblioteca;
import java.util.List;

/**
 *
 * @author USER
 */
public interface BibliotecaService {
    
    List<Biblioteca> listarBibliotecas();
    List<Biblioteca> listarBibliotecasPorBibliotecario(Long bibliotecaId);
    Biblioteca guardarBiblioteca(Biblioteca biblioteca);
    Biblioteca buscarBiblioteca(Long id);
    void eliminarBiblioteca(Long id);
    
}
