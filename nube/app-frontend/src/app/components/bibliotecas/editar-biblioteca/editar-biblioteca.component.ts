import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BibliotecaService } from 'src/app/services/biblioteca.service';

@Component({
  selector: 'app-editar-biblioteca',
  templateUrl: './editar-biblioteca.component.html',
  styleUrls: ['./editar-biblioteca.component.css']
})
export class EditarBibliotecaComponent implements OnInit {

  biblioteca = {
    id: null,
    nombre: '',
    fechaRegistro: '',
    plan: '',
    fechaVencimiento: '',
    estado: ''
  };
  id!: number; // Variable para almacenar el ID de la biblioteca

  constructor(
    private route: ActivatedRoute,
    private bibliotecaService: BibliotecaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!; // Obtener el ID de la ruta
    this.obtenerBiblioteca();
  }

  obtenerBiblioteca(): void {
    this.bibliotecaService.obtenerBiblioteca(this.id).subscribe({
      next: (data) => {
        this.biblioteca = data; // Asignar los datos de la biblioteca
      },
      error: (err) => {
        console.error('Error al cargar la biblioteca:', err);
        alert('Error al cargar la biblioteca');
      }
    });
  }

  guardarCambios(): void {
    this.bibliotecaService.editarBiblioteca(this.id, this.biblioteca).subscribe({
      next: () => {
        alert('Biblioteca actualizada correctamente');
        this.router.navigate(['/bibliotecas']); // Redirigir al listado
      },
      error: (err) => {
        console.error('Error al actualizar la biblioteca:', err);
        alert('Error al actualizar la biblioteca');
      }
    });
  }
    

  cancelar(): void {
    this.router.navigate(['/bibliotecas']); // Redirigir al listado de bibliotecas
  }


}