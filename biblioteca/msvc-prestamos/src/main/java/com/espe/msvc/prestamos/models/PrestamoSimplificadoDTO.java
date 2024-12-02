/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.espe.msvc.prestamos.models;

/**
 *
 * @author USER
 */
public class PrestamoSimplificadoDTO {

    private String libro; // Título del libro
    private String fechaPrestamo; // Fecha del préstamo
    private String estado; // Estado del préstamo (ejemplo: "Devuelto", "Activo")

    public PrestamoSimplificadoDTO(String libro, String fechaPrestamo, String estado) {
        this.libro = libro;
        this.fechaPrestamo = fechaPrestamo;
        this.estado = estado;
    }

    // Getters y setters
    public String getLibro() {
        return libro;
    }

    public void setLibro(String libro) {
        this.libro = libro;
    }

    public String getFechaPrestamo() {
        return fechaPrestamo;
    }

    public void setFechaPrestamo(String fechaPrestamo) {
        this.fechaPrestamo = fechaPrestamo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
