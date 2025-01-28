/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.espe.msvc.bibliotecas.controllers;


import com.espe.msvc.bibliotecas.models.Biblioteca;
import com.espe.msvc.bibliotecas.services.BibliotecaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 *
 * @author USER
 */

@RestController
@RequestMapping("/api/bibliotecas")
public class BibliotecaController {

    @Autowired
    private BibliotecaService bibliotecaService;

    // Listar todas las bibliotecas
    @GetMapping
    public ResponseEntity<List<Biblioteca>> listarBibliotecas(@RequestParam(required = false) Long bibliotecaId) {
        List<Biblioteca> bibliotecas;
        if (bibliotecaId != null) {
            bibliotecas = bibliotecaService.listarBibliotecasPorBibliotecario(bibliotecaId);
        } else {
            bibliotecas = bibliotecaService.listarBibliotecas();
        }
        return new ResponseEntity<>(bibliotecas, HttpStatus.OK);
    }

    /*@GetMapping
    public ResponseEntity<List<Biblioteca>> listarBibliotecas() {
        List<Biblioteca> bibliotecas = bibliotecaService.listarBibliotecas();
        return new ResponseEntity<>(bibliotecas, HttpStatus.OK);
    }*/

    // Obtener una biblioteca por ID
    @GetMapping("/{id}")
    public ResponseEntity<Biblioteca> obtenerBiblioteca(@PathVariable Long id) {
        Biblioteca biblioteca = bibliotecaService.buscarBiblioteca(id);
        if (biblioteca != null) {
            return new ResponseEntity<>(biblioteca, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Crear una nueva biblioteca
    @PostMapping
    public ResponseEntity<Biblioteca> crearBiblioteca(@RequestBody Biblioteca biblioteca) {
        Biblioteca nuevaBiblioteca = bibliotecaService.guardarBiblioteca(biblioteca);
        return new ResponseEntity<>(nuevaBiblioteca, HttpStatus.CREATED);
    }

    // Editar una biblioteca existente
    @PutMapping("/{id}")
    public ResponseEntity<String> editarBiblioteca(@PathVariable Long id, @RequestBody Biblioteca bibliotecaActualizada) {
        Biblioteca bibliotecaExistente = bibliotecaService.buscarBiblioteca(id);
        if (bibliotecaExistente == null) {
            return new ResponseEntity<>("Biblioteca no encontrada", HttpStatus.NOT_FOUND);
        }
        bibliotecaExistente.setNombre(bibliotecaActualizada.getNombre());
        bibliotecaExistente.setPlan(bibliotecaActualizada.getPlan());
        bibliotecaExistente.setEstado(bibliotecaActualizada.getEstado());
        bibliotecaService.guardarBiblioteca(bibliotecaExistente);
        return new ResponseEntity<>("Biblioteca actualizada con éxito", HttpStatus.OK);
    }

    // Eliminar una biblioteca por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarBiblioteca(@PathVariable Long id) {
        Biblioteca biblioteca = bibliotecaService.buscarBiblioteca(id);
        if (biblioteca == null) {
            return new ResponseEntity<>("Biblioteca no encontrada", HttpStatus.NOT_FOUND);
        }
        bibliotecaService.eliminarBiblioteca(id);
        return new ResponseEntity<>("Biblioteca eliminada con éxito", HttpStatus.OK);
    }
}