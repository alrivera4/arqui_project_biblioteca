/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.espe.msvc.libros.services;

import com.espe.msvc.libros.models.Libro;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 *
 * @author USER
 */

@Service
public interface LibroService {
    
    List<Libro> listarLibros();
    List<Libro> filtrarLibrosPorCategoria(String categoria);
    List<Libro> buscarLibroPorTitulo(String titulo);
    Libro guardarLibro(Libro libro);
    Libro buscarLibro(Long id);
    void eliminarLibro(Long id);

}


