/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.espe.msvc.bibliotecas.repositories;

import com.espe.msvc.bibliotecas.models.Biblioteca;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 *
 * @author USER
 */
@Repository
public interface BibliotecaRepository extends JpaRepository<Biblioteca, Long> {
    List<Biblioteca> findAllByBibliotecaId(Long bibliotecaId);
}
