import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  libro: any = {
    titulo: '',
    autor: '',
    isbn: '',
    categoria: '',
    cantidadDisponible: 0,
    fecha_publicacion: '',
  };

  libros: any[] = []; // Almacena todos los libros
  filteredLibros: any[] = []; // Almacena los libros filtrados
  searchQuery: string = ''; // Término de búsqueda

  constructor(private libroService: LibroService, private router: Router) {}

  ngOnInit(): void {
    // Cargar todos los libros al inicio
    this.libroService.getLibros().subscribe((libros) => {
      this.libros = libros;
      this.filteredLibros = libros;
    });
  }

  addLibro(): void {
    this.libroService.createLibro(this.libro).subscribe(() => {
      this.router.navigate(['/libros']); // Redirige a la lista de libros
    });
  }

  
}
