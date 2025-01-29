import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  esAdministrador: boolean = false; // Propiedad para verificar si el usuario es administrador
  esBibliotecario: boolean = false; // Propiedad para verificar si el usuario es bibliotecario
  esEstudiante: boolean = false; // Propiedad para verificar si el usuario es estudiante
  esProfesor: boolean = false; // Propiedad para verificar si el usuario es profesor

  // Inyecta AuthService en el constructor
  constructor(private router: Router, private authService: AuthService) {}

  cerrarSesion(): void {
    this.authService.clearAuthData(); // Limpia los datos de autenticación
    this.router.navigate(['/login']); // Navega a la pantalla de login
  }

  ngOnInit(): void {
    // Determina el tipo de usuario
    const tipoUsuario = this.authService.getTipoUsuario(); // Método para obtener el rol desde AuthService

    this.esAdministrador = tipoUsuario === 'administrador';
    this.esBibliotecario = tipoUsuario === 'bibliotecario';
    this.esEstudiante = tipoUsuario === 'estudiante';
    this.esProfesor = tipoUsuario === 'profesor';

    console.log(
      'Tipo de usuario:', tipoUsuario,
      'Es administrador:', this.esAdministrador,
      'Es bibliotecario:', this.esBibliotecario,
      'Es estudiante:', this.esEstudiante,
      'Es profesor:', this.esProfesor
    );
  }
}
