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

  constructor(private libroService: LibroService, private router: Router) {}
  addLibro(): void {
    this.libroService.createLibro(this.libro).subscribe(() => {
      this.router.navigate(['/libros']); // Redirige a la lista de libros
    });
  }
}
