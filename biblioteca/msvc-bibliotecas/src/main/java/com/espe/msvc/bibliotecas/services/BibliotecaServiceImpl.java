package com.espe.msvc.bibliotecas.services;

import com.espe.msvc.bibliotecas.models.Biblioteca;
import com.espe.msvc.bibliotecas.repositories.BibliotecaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Calendar;
import java.util.List;

/*@Service
public class BibliotecaServiceImpl implements BibliotecaService {

    @Autowired
    private BibliotecaRepository bibliotecaRepository;

    // Método para calcular la fecha de vencimiento basado en el plan
    private Date calcularFechaVencimiento(String plan, Date fechaRegistro) {
        Calendar calendar = Calendar.getInstance();  // Usamos Calendar para manejar la fecha
        calendar.setTime(fechaRegistro != null ? fechaRegistro : new Date());  // Usamos fecha de registro o la fecha actual si no está asignada

        switch (plan.toLowerCase()) {
            case "basico":
                calendar.add(Calendar.DAY_OF_MONTH, 30);  // 30 días para plan básico
                break;
            case "premium":
                calendar.add(Calendar.DAY_OF_MONTH, 60);  // 60 días para plan premium
                break;
            case "vip":
                calendar.add(Calendar.DAY_OF_MONTH, 90);  // 90 días para plan VIP
                break;
            default:
                throw new IllegalArgumentException("Plan no reconocido");
        }

        return calendar.getTime();  // Retorna la fecha de vencimiento calculada
    }

    // Método para validar que la fecha de vencimiento no sea anterior a la fecha de registro
    private void validarFechaVencimiento(Date fechaRegistro, Date fechaVencimiento) {
        if (fechaVencimiento.before(fechaRegistro)) {
            throw new IllegalArgumentException("La fecha de vencimiento no puede ser anterior a la fecha de registro");
        }
    }

    @Override
    public List<Biblioteca> listarBibliotecas() {
        return bibliotecaRepository.findAll();
    }

    @Override
    public Biblioteca guardarBiblioteca(Biblioteca biblioteca) {
        // Asignar fecha de registro si no está asignada
        if (biblioteca.getFechaRegistro() == null) {
            biblioteca.setFechaRegistro(new Date());
        }

        // Calcular la fecha de vencimiento en función del plan y la fecha de registro
        Date fechaVencimiento = calcularFechaVencimiento(biblioteca.getPlan(), biblioteca.getFechaRegistro());

        // Validar que la fecha de vencimiento no sea anterior a la fecha de registro
        validarFechaVencimiento(biblioteca.getFechaRegistro(), fechaVencimiento);

        // Establecer la fecha de vencimiento calculada
        biblioteca.setFechaVencimiento(fechaVencimiento);

        // Verificar si la fecha de vencimiento ha pasado y cambiar el estado a "suspendido"
        if (biblioteca.getFechaVencimiento().before(new Date())) {
            biblioteca.setEstado("suspendido");  // Cambiar el estado si la fecha ha pasado
        }

        // Guardar la biblioteca en el repositorio (base de datos)
        return bibliotecaRepository.save(biblioteca);
    }

    @Override
    public Biblioteca buscarBiblioteca(Long id) {
        return bibliotecaRepository.findById(id).orElse(null);
    }

    @Override
    public void eliminarBiblioteca(Long id) {
        bibliotecaRepository.deleteById(id);
    }
}*/

@Service
public class BibliotecaServiceImpl implements BibliotecaService {

    @Autowired
    private BibliotecaRepository bibliotecaRepository;

    // Método para calcular la fecha de vencimiento basado en el plan
    private Date calcularFechaVencimiento(String plan, Date fechaRegistro) {
        Calendar calendar = Calendar.getInstance();  // Usamos Calendar para manejar la fecha
        calendar.setTime(fechaRegistro != null ? fechaRegistro : new Date());  // Usamos fecha de registro o la fecha actual si no está asignada

        switch (plan.toLowerCase()) {
            case "basico":
                calendar.add(Calendar.DAY_OF_MONTH, 30);  // 30 días para plan básico
                break;
            case "premium":
                calendar.add(Calendar.DAY_OF_MONTH, 60);  // 60 días para plan premium
                break;
            case "vip":
                calendar.add(Calendar.DAY_OF_MONTH, 90);  // 90 días para plan VIP
                break;
            default:
                throw new IllegalArgumentException("Plan no reconocido");
        }

        return calendar.getTime();  // Retorna la fecha de vencimiento calculada
    }

    // Método para validar que la fecha de vencimiento no sea anterior a la fecha de registro
    private void validarFechaVencimiento(Date fechaRegistro, Date fechaVencimiento) {
        if (fechaVencimiento.before(fechaRegistro)) {
            throw new IllegalArgumentException("La fecha de vencimiento no puede ser anterior a la fecha de registro");
        }
    }

    @Override
    public List<Biblioteca> listarBibliotecas() {
        return bibliotecaRepository.findAll();
    }

    @Override
    public Biblioteca guardarBiblioteca(Biblioteca biblioteca) {
        // Asignar fecha de registro si no está asignada
        if (biblioteca.getFechaRegistro() == null) {
            biblioteca.setFechaRegistro(new Date());
        }

        // Calcular la fecha de vencimiento en función del plan y la fecha de registro
        Date fechaVencimiento = calcularFechaVencimiento(biblioteca.getPlan(), biblioteca.getFechaRegistro());

        // Validar que la fecha de vencimiento no sea anterior a la fecha de registro
        validarFechaVencimiento(biblioteca.getFechaRegistro(), fechaVencimiento);

        // Establecer la fecha de vencimiento calculada
        biblioteca.setFechaVencimiento(fechaVencimiento);
        
        
        // Cambiar el estado en función del pago o la fecha
        if (biblioteca.getPago() != null && biblioteca.getPago()) {
            biblioteca.setEstado("activo"); // Estado activo si el pago fue realizado
        } else if (biblioteca.getFechaVencimiento().before(new Date()) || true) {   // **Lógica para cambiar el estado a "suspendido" aunque la fecha no haya pasado**
                                                                                    /*Después de que hayas verificado el funcionamiento en Postman, elimina el || true en la condición de suspensión para que el estado se actualice solo cuando la fecha de vencimiento haya pasado realmente.*/// FORZAMOS SUSPENSION
            biblioteca.setEstado("suspendido");  // Cambiar el estado a "suspendido"
        }

        // Guardar la biblioteca en el repositorio (base de datos)
        return bibliotecaRepository.save(biblioteca);
    }

    @Override
    public Biblioteca buscarBiblioteca(Long id) {
        return bibliotecaRepository.findById(id).orElse(null);
    }

    @Override
    public void eliminarBiblioteca(Long id) {
        bibliotecaRepository.deleteById(id);
    }
}
