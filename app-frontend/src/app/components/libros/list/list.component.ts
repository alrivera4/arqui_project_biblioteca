import { Component, OnInit } from '@angular/core';
import { LibroService } from 'src/app/services/libro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  libros: any[] = []; // Todos los libros
  searchQuery: string = ''; // Término de búsqueda
  notification: { message: string, type: string } | null = null; // Notificación de éxito o error
  constructor(private libroService: LibroService, private router: Router) {}

  ngOnInit(): void {
    // Suscribirse al observable para obtener los libros actualizados
    this.libroService.libros$.subscribe((data) => {
      this.libros = data;
    });
    
    // Inicialmente cargamos los libros
    this.getLibros();
  }

  // Método para obtener los libros desde el servicio
  getLibros(): void {
    this.libroService.getLibros().subscribe({
      next: (data) => {
        this.libros = data;
      },
      error: (error) => {
        console.error('Error al obtener los libros:', error);
      },
    });
  }

  // Método para filtrar los libros según el término de búsqueda
  get filteredLibros() {
    if (this.searchQuery.trim() === '') {
      return this.libros;
    } else {
      return this.libros.filter((libro) => {
        return (
          libro.titulo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          libro.autor.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          libro.isbn.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          libro.categoria.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    }
  }

  // Método para eliminar un libro
  deleteLibro(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      this.libroService.deleteLibro(id).subscribe({
        next: () => {
          // Eliminar el libro de la lista localmente para evitar una nueva llamada al servidor
          this.libros = this.libros.filter(libro => libro.id !== id);
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
