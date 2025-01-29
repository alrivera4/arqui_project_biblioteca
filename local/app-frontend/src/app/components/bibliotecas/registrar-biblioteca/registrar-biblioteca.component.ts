import { Component } from '@angular/core';
import { BibliotecaService } from 'src/app/services/biblioteca.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-biblioteca',
  templateUrl: './registrar-biblioteca.component.html',
  styleUrls: ['./registrar-biblioteca.component.css']
})
export class RegistrarBibliotecaComponent {
  biblioteca = {
    nombre: '',
    plan: 'basico',
    estado: 'activo',
    pago: false // Estado inicial del pago
  };

  constructor(private bibliotecaService: BibliotecaService, private router: Router) {}

  registrarBiblioteca(): void {
    if (!this.biblioteca.pago) {
      alert('Debes simular el pago antes de registrar la biblioteca.');
      return;
    }

    this.bibliotecaService.crearBiblioteca(this.biblioteca).subscribe(
      (response) => {
        console.log('Biblioteca registrada:', response);
        alert('Biblioteca registrada con éxito');
        this.router.navigate(['/bibliotecas']); // Redirigir al listado de bibliotecas después de registrar
      },
      (error) => {
        console.error('Error al registrar la biblioteca:', error);
        alert('Ocurrió un error al registrar la biblioteca');
      }
    );
  }

  // Simula el pago
  simularPago(): void {
    if (!this.biblioteca.nombre) {
      alert('Por favor, ingresa el nombre de la biblioteca antes de simular el pago.');
      return;
    }
    else if (!this.biblioteca.plan) {
      alert('Por favor, selecciona un plan antes de simular el pago.');
      return;
    }

    // Simula un tiempo de procesamiento
    setTimeout(() => {
      this.biblioteca.pago = true; // Actualiza el estado del campo pago
      alert(`Pago simulado para el plan ${this.biblioteca.plan} realizado con éxito.`);
    }, 1000); // Simula 1 segundo de espera
  }

  cancelar(): void {
    // Redirige a la página de bibliotecas
    this.router.navigate(['/bibliotecas']);
  }
}
