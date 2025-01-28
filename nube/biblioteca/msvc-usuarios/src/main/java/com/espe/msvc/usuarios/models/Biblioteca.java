/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.espe.msvc.usuarios.models;

import jakarta.persistence.*;
import java.util.Date;



/**
 *
 * @author USER
 */

@Entity
@Table(name = "bibliotecas")
public class Biblioteca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bibliotecaId;

    private String nombre;
    private Date fechaRegistro; 
    private String plan; // basico
    private Date fechaVencimiento;  // Calculado en el backend
    private String estado;  // activo, suspendido, cancelado

    
    // Getters y Setters

    public Date getFechaVencimiento() {
        return fechaVencimiento;
    }

    public void setFechaVencimiento(Date fechaVencimiento) {
        this.fechaVencimiento = fechaVencimiento;
    }

    public String getPlan() {
        return plan;
    }
     
    public void setPlan(String plan) {    
        this.plan = plan;
    }

    public Long getBibliotecaId() {
        return bibliotecaId;
    }

    public void setBibliotecaId(Long bibliotecaId) {
        this.bibliotecaId = bibliotecaId;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
     public Date getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(Date fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }


    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

   
}