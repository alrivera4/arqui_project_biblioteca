import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-prestamo',
  templateUrl: './registro-prestamo.component.html',
  styleUrls: ['./registro-prestamo.component.css']
})
export class RegistroPrestamoComponent implements OnInit {
  libros: any[] = [];
  usuarios: any[] = [];
  prestamo = {
    usuarioId: null,
    libroId: null,
    fechaPrestamo: '',
    fechaDevolucion: ''
  };
  mensaje: string = '';

  constructor(private http: HttpClient
    , private router: Router
  ) {}

  ngOnInit() {
    this.cargarLibros();
    this.cargarUsuarios();
  }

  cargarLibros() {
    this.http.get<any[]>('http://localhost:8080/api/libros')
      .subscribe(data => this.libros = data);
  }

  cargarUsuarios() {
    this.http.get<any[]>('http://localhost:8080/api/usuarios')
      .subscribe(data => {
        this.usuarios = data;
        //console.log("Usuarios cargados", data);
      }, error => {
        console.error('Error al cargar usuarios', error);
      });
  }

  registrarPrestamo() {
    if (!this.prestamo.usuarioId || !this.prestamo.libroId || !this.prestamo.fechaPrestamo || !this.prestamo.fechaDevolucion) {
      this.mensaje = 'Por favor, complete todos los campos';
      return;
    }
  
    console.log("Datos del préstamo:", {
      usuarioId: this.prestamo.usuarioId,
      libroId: this.prestamo.libroId,
      fechaPrestamo: this.prestamo.fechaPrestamo,
      fechaDevolucion: this.prestamo.fechaDevolucion
    });
  
    const soapRequest = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.example.com/">
        <soapenv:Header/>
        <soapenv:Body>
          <web:RegistrarPrestamo>
            <usuarioId>${this.prestamo.usuarioId}</usuarioId>
            <libroId>${this.prestamo.libroId}</libroId>
            <fechaPrestamo>${this.prestamo.fechaPrestamo}</fechaPrestamo>
            <fechaDevolucion>${this.prestamo.fechaDevolucion}</fechaDevolucion>
          </web:RegistrarPrestamo>
        </soapenv:Body>
      </soapenv:Envelope>
    `;
  
    this.http.post('http://localhost:8000/soap', soapRequest, {
      headers: { 'Content-Type': 'text/xml' },
      responseType: 'text'
    }).subscribe(response => {
      console.log(response);
      this.mensaje = 'Préstamo registrado exitosamente';
    }, error => {
      console.error(error);
      this.mensaje = 'Error al registrar el préstamo';
    });
  }

  
  cancelar(): void {
    // Redirige a la lista de usuarios
    this.router.navigate(['/prestamos']);
  }
  
}
