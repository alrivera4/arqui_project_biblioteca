import { Component, OnInit } from '@angular/core';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  libros: any[] = [];

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.libroService.getLibros().subscribe((data) => {
      this.libros = data;
    });
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
}
