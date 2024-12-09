import { Component, OnInit } from '@angular/core';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  libros: any[] = [];
  searchQuery: string = ''; // Término de búsqueda
  modalTitle: string = '';
  actionButtonText: string = '';

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.libroService.getLibros().subscribe((data) => {
      this.libros = data;
    });
  }

  // Método para filtrar los libros según el término de búsqueda
  get filteredLibros() {
    if (this.searchQuery.trim() === '') {
      // Si no hay término de búsqueda, mostramos todos los libros
      return this.libros;
    } else {
      // Filtramos los libros por título, autor, ISBN o categoría
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

  getLibros(): void {
    this.libroService.getLibros().subscribe((data) => {
      this.libros = data;
    });
  }
  
  deleteLibro(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      this.libroService.deleteLibro(id).subscribe(() => {
        this.libros = this.libros.filter((libro) => libro.id !== id);
      });
    }
  }

  obtenerLibros(): void {
    this.libroService.getLibros().subscribe((data) => {
      this.libros = data;
      
      // Añadimos console.log() para ver los datos que llegan
      console.log('Libros obtenidos:', this.libros);
      
      // También puedes hacer un console.log para ver solo las cantidades disponibles
      console.log('Cantidad disponible de cada libro:', this.libros.map(libro => libro.cantidad_disponible));
    });
  }
}

