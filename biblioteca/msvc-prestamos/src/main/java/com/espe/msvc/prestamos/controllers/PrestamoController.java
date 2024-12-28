/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.espe.msvc.prestamos.controllers;


import com.espe.msvc.prestamos.models.PrestamoSimplificadoDTO;
import com.espe.msvc.prestamos.services.PrestamoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


/**
 *
 * @author USER
 */

@RestController
@RequestMapping("/api/usuario")
public class PrestamoController {

    @Autowired
    private PrestamoService prestamoService;

    @GetMapping("/{id}/prestamos")
    public ResponseEntity<?> obtenerHistorialPrestamos(@PathVariable Long id) {
        List<PrestamoSimplificadoDTO> prestamos = prestamoService.obtenerHistorialPrestamos(id);
        if (prestamos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(prestamos);
    }
    
    //endpoint para listar todos los préstamos
    @GetMapping("/prestamos")
    public ResponseEntity<List<PrestamoSimplificadoDTO>> obtenerTodosPrestamos() {
        List<PrestamoSimplificadoDTO> prestamos = prestamoService.obtenerTodosPrestamos();
        return new ResponseEntity<>(prestamos, HttpStatus.OK);
    }
}
