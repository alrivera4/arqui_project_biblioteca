import { Component, OnInit } from '@angular/core';
import { LibroService } from 'src/app/services/libro.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service'; // Asegúrate de usar la ruta correcta

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  libros: any[] = []; // Todos los libros
  searchQuery: string = ''; // Término de búsqueda
  notification: { message: string, type: string } | null = null; // Notificación de éxito o error
  esAdministrador: boolean = false; // Propiedad para determinar si el usuario es administrador

  // Inyecta AuthService como público para acceder en la plantilla
  constructor(
    private libroService: LibroService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Inicialmente cargamos los libros
    this.getLibros();
    console.log('Tipo de usuario:', this.authService.getTipoUsuario());

    // Determina si el usuario es administrador
    const tipoUsuario = this.authService.getTipoUsuario(); // Asegúrate de que este método existe en AuthService
    this.esAdministrador = tipoUsuario === 'administrador';
    console.log('Tipo de usuario:', tipoUsuario, 'Es administrador:', this.esAdministrador);

  }

  // Método para obtener los libros desde el servicio
  getLibros(): void {
    this.libroService.getLibros().subscribe({
      next: (data) => {
        // Ordenar los libros por 'libroId' antes de asignarlos
        this.libros = data.sort((a, b) => a.libroId - b.libroId); // Ordena de menor a mayor
      },
      error: (error) => {
        console.error('Error al obtener los libros:', error);
      },
    });
  }

  // Método para filtrar los libros según el término de búsqueda
  get filteredLibros() {
    let librosFiltrados = this.libros.filter((libro) => {
      return (
        libro.titulo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        libro.autor.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        libro.isbn.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        libro.categoria.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });

    // Ordenar los libros filtrados por 'libroId' de menor a mayor
    return librosFiltrados.sort((a, b) => a.libroId - b.libroId);
  }

  // Método para eliminar un libro
  deleteLibro(libroId: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      this.libroService.deleteLibro(libroId).subscribe({
        next: () => {
          // Eliminar el libro de la lista localmente para evitar una nueva llamada al servidor
          this.libros = this.libros.filter(libro => libro.libroId !== libroId);
          this.showNotification('El libro ha sido eliminado correctamente.', 'success');
        },
        error: (error) => {
          console.error('Error al eliminar el libro:', error);
          this.showNotification('Hubo un error al eliminar el libro. Inténtalo nuevamente.', 'danger');
        },
      });
    }
  }

  // Método para mostrar notificación
  showNotification(message: string, type: string): void {
    this.notification = { message, type };

    // La notificación desaparece después de 2 segundos
    setTimeout(() => {
      this.notification = null;
    }, 2000);
  }
}
