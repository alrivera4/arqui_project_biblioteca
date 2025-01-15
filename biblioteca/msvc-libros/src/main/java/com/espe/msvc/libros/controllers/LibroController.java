/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.espe.msvc.libros.controllers;

import com.espe.msvc.libros.models.Libro;
import com.espe.msvc.libros.services.LibroService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;

import java.util.List;

/**
 *
 * @author USER
 */


@RestController
@RequestMapping("/api/libros")
public class LibroController {

    @Autowired
    private LibroService libroService;

    // Listar todos los libros
    @GetMapping
    public ResponseEntity<List<Libro>> listarLibros() {
        List<Libro> libros = libroService.listarLibros();
        return new ResponseEntity<>(libros, HttpStatus.OK);
    }
    
    // Buscar libros por categoria
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<Libro>> filtrarLibrosPorCategoria(@PathVariable String categoria) {
        List<Libro> librosFiltrados;
        if (categoria != null && !categoria.isEmpty()) {
            librosFiltrados = libroService.filtrarLibrosPorCategoria(categoria);
        } else {
            librosFiltrados = libroService.listarLibros();
        }
        return new ResponseEntity<>(librosFiltrados, HttpStatus.OK);
    }

  // Obtener un libro por ID
    @GetMapping("/{id}")
    public ResponseEntity<Libro> obtenerLibro(@PathVariable Long id) {
        Libro libro = libroService.buscarLibro(id);
        if (libro != null) {
            return new ResponseEntity<>(libro, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
   /* Buscar libro por título
    @GetMapping
    public ResponseEntity<?> obtenerLibroPorTitulo(@RequestParam(required = false) String titulo) {
        if (titulo != null && !titulo.isEmpty()) {
            List<Libro> libros = libroService.buscarLibroPorTitulo(titulo);
            if (!libros.isEmpty()) {
                return new ResponseEntity<>(libros, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            // Si no hay título, devuelve todos los libros
            List<Libro> libros = libroService.listarLibros();
            return new ResponseEntity<>(libros, HttpStatus.OK);
        }
    }*/
    
    // Buscar libro por título
    @GetMapping("/titulo/{titulo}")
    public ResponseEntity<?> obtenerLibroPorTitulo(@PathVariable String titulo) {
        List<Libro> libros = libroService.buscarLibroPorTitulo(titulo);
        if (!libros.isEmpty()) {
            return new ResponseEntity<>(libros, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    // Crear un nuevo libro
    // Crear un nuevo libro asociado a una biblioteca
    @PostMapping
    public ResponseEntity<Libro> crearLibro(@RequestBody Libro libro, @RequestParam Long bibliotecaId) {
        try {
            Libro nuevoLibro = libroService.guardarLibro(libro, bibliotecaId);
            return new ResponseEntity<>(nuevoLibro, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    /*@PostMapping
    public ResponseEntity<Libro> crearLibro(@RequestBody Libro libro) {
        Libro nuevoLibro = libroService.guardarLibro(libro);
        return new ResponseEntity<>(nuevoLibro, HttpStatus.CREATED);
    }*/
    
   
    // Endpoint para editar un libro
    @PutMapping("/{id}")
    public ResponseEntity<String> editarLibro(
            @PathVariable Long id,
            @RequestBody Libro libroActualizado,
            @RequestParam(required = false) Long bibliotecaId) {

        Libro libroExistente = libroService.buscarLibro(id);

        if (libroExistente == null) {
            return new ResponseEntity<>("Libro no encontrado", HttpStatus.NOT_FOUND);
        }

        // Actualizar los campos del libro
        libroExistente.setTitulo(libroActualizado.getTitulo());
        libroExistente.setAutor(libroActualizado.getAutor());
        libroExistente.setIsbn(libroActualizado.getIsbn());
        libroExistente.setCategoria(libroActualizado.getCategoria());
        libroExistente.setCantidadDisponible(libroActualizado.getCantidadDisponible());
        libroExistente.setFechaPublicacion(libroActualizado.getFechaPublicacion());

        // Usar el bibliotecaId proporcionado o mantener el actual
        Long bibliotecaIdFinal = bibliotecaId != null ? bibliotecaId : libroExistente.getBiblioteca().getBibliotecaId();

        libroService.guardarLibro(libroExistente, bibliotecaIdFinal);

        return new ResponseEntity<>("Libro actualizado con éxito", HttpStatus.OK);
    }

    /*@PutMapping("/{id}")
    public ResponseEntity<String> editarLibro(@PathVariable Long id, @RequestBody Libro libroActualizado) {
        // Buscar el usuario en la base de datos
        Libro libroExistente = libroService.buscarLibro(id);

        // Si el libro no existe, devolver un mensaje de error
        if (libroExistente == null) {
            return new ResponseEntity<>("Libro no encontrado", HttpStatus.NOT_FOUND);
        }

        // Actualizar los datos del libro
        libroExistente.setTitulo(libroActualizado.getTitulo());
        libroExistente.setAutor(libroActualizado.getAutor());
        libroExistente.setIsbn(libroActualizado.getIsbn());
        libroExistente.setCategoria(libroActualizado.getCategoria());
        libroExistente.setCantidadDisponible(libroActualizado.getCantidadDisponible());
        libroExistente.setFechaPublicacion(libroActualizado.getFechaPublicacion());

        // Guardar los cambios
        libroService.guardarLibro(libroExistente);

        // Devolver mensaje de éxito
        return new ResponseEntity<>("Libro actualizado con éxito", HttpStatus.OK);
    }*/

    // Eliminar un libro por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarLibro(@PathVariable Long id) {
        Libro libro = libroService.buscarLibro(id);
        if (libro == null) {
            // Si el usuario no se encuentra, se devuelve un mensaje con un código de estado 404
            return new ResponseEntity<>("Libro no encontrado", HttpStatus.NOT_FOUND);
        }
        
        // Si el usuario existe, se procede a eliminarlo
        libroService.eliminarLibro(id);
        
        // Devolvemos un mensaje personalizado junto con el código de estado 200 OK
        return new ResponseEntity<>("Usuario eliminado con éxito", HttpStatus.OK);
    }
}
