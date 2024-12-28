import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  libro: any = {
    id: null,
    titulo: '',
    autor: '',
    isbn: '',
    categoria: ''
  };

 

  constructor(
    private libroService: LibroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!; // Obtener el ID de la URL
    this.getLibro(id);
  }

  getLibro(id: number): void {
    this.libroService.getLibroById(id).subscribe((data) => {
      this.libro = data;
    });
  }

  updateLibro(): void {
    this.libroService.createLibro(this.libro).subscribe(() => {
      this.router.navigate(['/libros']); // Redirige a la lista de libros
    });
  }

  cancelEdit(): void {
    this.router.navigate(['/libros']); // Redirige al listado de libros
  }
}
