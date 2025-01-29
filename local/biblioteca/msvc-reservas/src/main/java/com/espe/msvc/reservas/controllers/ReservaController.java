package com.espe.msvc.reservas.controllers;

import com.espe.msvc.reservas.models.Reserva;
import com.espe.msvc.reservas.services.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

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
    /*@DeleteMapping("/{reservaId}")
    public ResponseEntity<String> cancelarReserva(@PathVariable Long reservaId) {
        try {
            reservaService.cancelarReserva(reservaId);
            return new ResponseEntity<>("Reserva cancelada con éxito", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al cancelar la reserva", HttpStatus.BAD_REQUEST);
        }
    }*/
    @DeleteMapping("/{reservaId}")
    public ResponseEntity<Map<String, String>> cancelarReserva(@PathVariable Long reservaId) {
        Map<String, String> response = new HashMap<>();
        try {
            reservaService.cancelarReserva(reservaId);
            response.put("message", "Reserva cancelada con éxito");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            response.put("error", "Error al cancelar la reserva");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }


}
