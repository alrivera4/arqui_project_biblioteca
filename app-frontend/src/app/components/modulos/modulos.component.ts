import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css']
})
export class ModulosComponent implements OnInit {

  usuarioDatos: any;
  notification: { message: string; type: string } | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarioDatos();
  }

  // Método para cargar los datos del usuario
  cargarUsuarioDatos(): void {
    this.usuarioDatos = this.authService.getUsuarioDatos();
  }

  // Método para mostrar notificaciones
  showNotification(message: string, type: string): void {
    this.notification = { message, type };

    // La notificación desaparece después de 3 segundos
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }

  // Método para guardar los cambios
  guardarCambios(): void {
    if (!this.usuarioDatos.usuarioId) {
      console.error('ID de usuario no disponible');
      this.showNotification(
        'No se pudo obtener el ID del usuario. Por favor, inicie sesión de nuevo.',
        'error'
      );
      this.router.navigate(['/login']);
      return;
    }

    // Llamada al servicio para actualizar los datos del usuario
    this.usuarioService.actualizarUsuario(this.usuarioDatos.usuarioId, this.usuarioDatos).subscribe(
      (response) => {
        this.showNotification('Usuario actualizado con éxito', 'success');

        // Recargar los datos del usuario desde el backend
        this.usuarioService.obtenerUsuario(this.usuarioDatos.usuarioId).subscribe(
          (data) => {
            this.usuarioDatos = data;
            console.log('Datos del usuario actualizados:', this.usuarioDatos);
          },
          (error) => {
            console.error('Error al recargar los datos del usuario:', error);
            this.showNotification(
              'Hubo un problema al recargar los datos del usuario',
              'error'
            );
          }
        );
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
        this.showNotification('Hubo un problema al actualizar el usuario', 'error');
      }
    );
  }

  cerrarSesion(): void {
    this.authService.clearAuthData();
    this.router.navigate(['/login']);
  }
}
