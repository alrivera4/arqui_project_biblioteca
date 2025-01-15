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
    estado: 'activo'
  };

  constructor(private bibliotecaService: BibliotecaService, private router: Router) {}

  registrarBiblioteca(): void {
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

  cancelar(): void {
    // Redirige a la página de login
    this.router.navigate(['/bibliotecas']);
  }
}
