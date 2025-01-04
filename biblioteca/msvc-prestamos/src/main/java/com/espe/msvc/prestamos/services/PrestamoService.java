/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.espe.msvc.prestamos.services;

import com.espe.msvc.prestamos.models.Prestamo;
import com.espe.msvc.prestamos.models.PrestamoSimplificadoDTO;
import com.espe.msvc.prestamos.repositories.PrestamoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author USER
 */

@Service
public class PrestamoService {

    @Autowired
    private PrestamoRepository prestamoRepository;

    public List<PrestamoSimplificadoDTO> obtenerHistorialPrestamos(Long usuarioId) {
        // Obtener lista de entidades Prestamo desde el repositorio
        List<Prestamo> prestamos = prestamoRepository.findByUsuario_usuarioId(usuarioId);

        // Mapear cada entidad Prestamo al DTO PrestamoSimplificadoDTO
        return prestamos.stream().map(prestamo -> 
            new PrestamoSimplificadoDTO(
                prestamo.getPrestamoId(),
                prestamo.getLibro().getTitulo(),
                prestamo.getFechaPrestamo(),
                prestamo.getEstado()
            )
        ).toList();
    }
    
    public List<PrestamoSimplificadoDTO> obtenerTodosPrestamos() {
        // Obtener lista de todos los prestamos desde el repositorio
        List<Prestamo> prestamos = prestamoRepository.findAll();

        // Mapear cada entidad Prestamo al DTO PrestamoSimplificadoDTO
        return prestamos.stream().map(prestamo -> 
            new PrestamoSimplificadoDTO(
                prestamo.getPrestamoId(),
                prestamo.getLibro().getTitulo(),
                prestamo.getFechaPrestamo(),
                prestamo.getEstado()
            )
        ).toList();
    }
}
