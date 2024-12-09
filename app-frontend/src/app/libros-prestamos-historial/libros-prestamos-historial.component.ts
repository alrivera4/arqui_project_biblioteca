import { Component, OnInit } from '@angular/core';
import { LibroService } from '../services/libro.service';
import { PrestamoService } from '../services/prestamo.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-libros-prestamos-historial',
  templateUrl: './libros-prestamos-historial.component.html',
  styleUrls: ['./libros-prestamos-historial.component.css']
})
export class LibrosPrestamosHistorialComponent implements OnInit {
  libros: any[] = [];
  prestamos: any[] = [];
  usuarios: any[] = [];

  constructor(
    private libroService: LibroService,
    private prestamoService: PrestamoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.cargarLibros();
    this.cargarPrestamos();
    this.cargarUsuarios();
  }

  cargarLibros() {
    this.libroService.getLibros().subscribe(data => {
      this.libros = data;
    });
  }

  cargarPrestamos() {
    this.prestamoService.getPrestamos().subscribe(data => {
      this.prestamos = data;
    });
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }
}
