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

  // Inyecta AuthService en el constructor
  constructor(private router: Router, private authService: AuthService) {}

  cerrarSesion(): void {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    // Determina si el usuario es administrador
    const tipoUsuario = this.authService.getTipoUsuario(); // Asegúrate de que este método existe en AuthService
    this.esAdministrador = tipoUsuario === 'administrador';
    console.log('Tipo de usuario:', tipoUsuario, 'Es administrador:', this.esAdministrador);
  }
}
