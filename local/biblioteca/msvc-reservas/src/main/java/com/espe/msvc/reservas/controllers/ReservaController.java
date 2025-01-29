package com.espe.msvc.reservas.controllers;

import com.espe.msvc.reservas.models.Reserva;
import com.espe.msvc.reservas.services.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    // Crear una nueva reserva
    @PostMapping
    public ResponseEntity<Reserva> crearReserva(@RequestParam Long libroId, @RequestParam Long usuarioId, @RequestParam Long bibliotecaId) {
        try {
            Reserva reserva = reservaService.reservarLibro(libroId, usuarioId, bibliotecaId);
            return new ResponseEntity<>(reserva, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Cancelar una reserva
    @DeleteMapping("/{reservaId}")
    public ResponseEntity<String> cancelarReserva(@PathVariable Long reservaId) {
        try {
            reservaService.cancelarReserva(reservaId);
            return new ResponseEntity<>("Reserva cancelada con éxito", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al cancelar la reserva", HttpStatus.BAD_REQUEST);
        }
    }
}
