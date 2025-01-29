import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from 'src/app/services/biblioteca.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-listar-bibliotecas',
  templateUrl: './listar-bibliotecas.component.html',
  styleUrls: ['./listar-bibliotecas.component.css']
})
export class ListarBibliotecasComponent implements OnInit {
  bibliotecas: any[] = []; // Lista de bibliotecas
  mensaje: string = '';
  esAdministrador: boolean = false; // Determina si el usuario es administrador
  esBibliotecario: boolean = false; // Determina si el usuario es bibliotecario
  bibliotecarioId: number | null = null; // ID del bibliotecario

  constructor(
    private bibliotecaService: BibliotecaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obtenerBiblioteca();

    // Determina si el usuario es administrador o bibliotecario
    const tipoUsuario = this.authService.getTipoUsuario();
    this.esAdministrador = tipoUsuario === 'administrador';
    this.esBibliotecario = tipoUsuario === 'bibliotecario';

    // Si es bibliotecario, obtenemos su ID
    if (this.esBibliotecario) {
      this.bibliotecarioId = this.authService.getUsuarioDatos().usuarioId;
    }

    console.log('Tipo de usuario:', tipoUsuario, 'Es administrador:', this.esAdministrador, 'Es bibliotecario:', this.esBibliotecario);
  }

  obtenerBiblioteca(): void {
    // Si es bibliotecario, pasamos el ID del bibliotecario al servicio para filtrar las bibliotecas
    this.bibliotecaService.listarBibliotecas(this.bibliotecarioId).subscribe({
      next: (data) => {
        // Ordenamos las bibliotecas por nombre
        this.bibliotecas = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      },
      error: (err) => {
        console.error('Error al obtener bibliotecas:', err);
        this.mensaje = 'Error al cargar bibliotecas.';
      }
    });
  }

  deleteBiblioteca(bibliotecaId: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta biblioteca?')) {
      this.bibliotecaService.eliminarBiblioteca(bibliotecaId).subscribe({
        next: () => {
          alert('Biblioteca eliminada correctamente');
          this.bibliotecas = this.bibliotecas.filter((b) => b.bibliotecaId !== bibliotecaId);
        },
        error: (err) => {
          console.error('Error al eliminar la biblioteca:', err);
          alert('Error al eliminar la biblioteca');
        }
      });
    }
  }
}
