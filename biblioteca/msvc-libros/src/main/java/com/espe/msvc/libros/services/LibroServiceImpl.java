/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.espe.msvc.libros.services;

import com.espe.msvc.libros.models.Libro;
import com.espe.msvc.libros.repositories.LibroRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author USER
 */

@Service
public class LibroServiceImpl implements LibroService {
    @Autowired
    private LibroRepository libroRepository;

    @Override
    public List<Libro> listarLibros() {
        return libroRepository.findAll();
    }
    
    @Override
    public List<Libro> filtrarLibrosPorCategoria(String categoria) {
         return libroRepository.findByCategoriaContainingIgnoreCase(categoria);
    }

    @Override
    public Libro guardarLibro(Libro libro) {
        return libroRepository.save(libro);
    }

    @Override
    public Libro buscarLibro(Long id) {
        return libroRepository.findById(id).orElse(null);
    }
    
    @Override
    public List<Libro> buscarLibroPorTitulo(String titulo) {
        return libroRepository.findByTituloContainingIgnoreCase(titulo);  
    }

    @Override
    public void eliminarLibro(Long id) {
        libroRepository.deleteById(id);
    }
}

