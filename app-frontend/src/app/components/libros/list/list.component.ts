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
  modalTitle: string = '';
  actionButtonText: string = '';

  constructor(private libroService: LibroService, private router: Router) {}

  ngOnInit(): void {
    this.libroService.getLibros().subscribe((data) => {
      this.libros = data; // Cargar los libros desde el servidor
    });
  }

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

  deleteLibro(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      this.libroService.deleteLibro(id).subscribe({
        next: () => {
          // Vuelve a obtener los libros después de eliminar
          this.getLibros();
        },
        error: (error) => {
          console.error('Error al eliminar el libro:', error);
        },
      });
    }
  }
  

  obtenerLibros(): void {
    this.libroService.getLibros().subscribe((data) => {
      this.libros = data;
      console.log('Libros obtenidos:', this.libros);
      console.log('Cantidad disponible de cada libro:', this.libros.map(libro => libro.cantidad_disponible));
    });
  }
}
