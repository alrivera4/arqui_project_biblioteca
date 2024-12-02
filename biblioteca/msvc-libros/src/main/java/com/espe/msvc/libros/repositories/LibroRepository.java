/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.espe.msvc.libros.repositories;

import com.espe.msvc.libros.models.Libro;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
/**
 *
 * @author USER
 */

@Repository
public interface LibroRepository extends JpaRepository<Libro, Long> {
    List<Libro> findByCategoriaContainingIgnoreCase(String categoria);
    List<Libro> findByTituloContainingIgnoreCase(String titulo);
}
