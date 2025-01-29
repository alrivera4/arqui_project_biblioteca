/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.espe.msvc.reservas.repositories;

import com.espe.msvc.reservas.models.Reserva;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author USER
 */

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    // Buscar todas las reservas de un usuario
    List<Reserva> findByUsuario_UsuarioId(Long usuarioId);

    // Buscar reservas por libro (si es necesario)
    List<Reserva> findByLibro_LibroId(Long libroId);
}