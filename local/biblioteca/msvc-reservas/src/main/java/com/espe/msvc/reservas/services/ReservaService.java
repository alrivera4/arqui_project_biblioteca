package com.espe.msvc.reservas.services;

import com.espe.msvc.reservas.models.Reserva;

import java.util.List;

public interface ReservaService {

    List<Reserva> listarReservas();
    List<Reserva> listarReservasPorUsuario(Long usuarioId);
    // Cambia la firma de este método para aceptar tres parámetros
    Reserva reservarLibro(Long libroId, Long usuarioId, Long bibliotecaId);
    Reserva buscarReserva(Long id);
    void cancelarReserva(Long id);
    void cambiarEstadoReserva(Long id, Reserva.EstadoReserva estado);
}
