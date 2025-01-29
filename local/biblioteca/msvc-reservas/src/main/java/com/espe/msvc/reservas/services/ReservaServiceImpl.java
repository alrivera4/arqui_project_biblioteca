package com.espe.msvc.reservas.services;

import com.espe.msvc.reservas.models.Biblioteca;
import com.espe.msvc.reservas.models.Libro;
import com.espe.msvc.reservas.models.Reserva;
import com.espe.msvc.reservas.models.Usuario;
import com.espe.msvc.reservas.repositories.BibliotecaRepository;
import com.espe.msvc.reservas.repositories.LibroRepository;
import com.espe.msvc.reservas.repositories.ReservaRepository;
import com.espe.msvc.reservas.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservaServiceImpl implements ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private LibroRepository libroRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BibliotecaRepository bibliotecaRepository;

    @Override
    public List<Reserva> listarReservas() {
        return reservaRepository.findAll();
    }

    @Override
    public List<Reserva> listarReservasPorUsuario(Long usuarioId) {
        return reservaRepository.findByUsuario_UsuarioId(usuarioId);
    }

    @Override
    @Transactional
    public Reserva reservarLibro(Long libroId, Long usuarioId, Long bibliotecaId) {
        // Validar si el libro existe
        Libro libro = libroRepository.findById(libroId)
                .orElseThrow(() -> new IllegalArgumentException("Libro no encontrado"));

        // Validar si el usuario existe
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        // Validar si la biblioteca existe
        Biblioteca biblioteca = bibliotecaRepository.findById(bibliotecaId)
                .orElseThrow(() -> new IllegalArgumentException("Biblioteca no encontrada"));

        // Crear una nueva reserva
        Reserva reserva = new Reserva();
        reserva.setLibro(libro);
        reserva.setUsuario(usuario);
        reserva.setBiblioteca(biblioteca);
        reserva.setFechaReserva(LocalDateTime.now()); // Fecha de reserva actual
        reserva.setEstado(Reserva.EstadoReserva.reservado); // Estado de la reserva

        // Guardar la reserva
        return reservaRepository.save(reserva);
    }

    @Override
    public Reserva buscarReserva(Long id) {
        return reservaRepository.findById(id).orElse(null);
    }

    @Override
    public void cancelarReserva(Long id) {
        // Buscar la reserva en la base de datos
        Reserva reserva = reservaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reserva no encontrada"));

        // Cambiar el estado de la reserva a DISPONIBLE
        reserva.setEstado(Reserva.EstadoReserva.disponible);

        // Guardar la reserva actualizada en la base de datos
        reservaRepository.save(reserva);
    }

    // Método adicional para cambiar el estado de la reserva a DISPONIBLE
    @Override
    public void cambiarEstadoReserva(Long id, Reserva.EstadoReserva estado) {
        Reserva reserva = reservaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Reserva no encontrada"));

        reserva.setEstado(estado); // Establecer el nuevo estado
        reservaRepository.save(reserva); // Guardar el cambio de estado
    }
}
