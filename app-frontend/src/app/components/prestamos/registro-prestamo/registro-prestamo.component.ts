import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

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
  notification: { message: string; type: string } | null = null;

  bibliotecaId: number = 0;

  constructor(private http: HttpClient
    , private router: Router
    , public authService: AuthService
  ) {}

  ngOnInit() {
    this.bibliotecaId = this.authService.getBibliotecaId(); // Método para obtener el ID de la biblioteca del bibliotecario
    this.cargarLibros();
    this.cargarUsuarios();
  }

  cargarLibros() {
    this.http.get<any[]>(`http://localhost:8001/api/libros?bibliotecaId=${this.bibliotecaId}`)
      .subscribe(data => this.libros = data);
  }

  cargarUsuarios() {
    this.http.get<any[]>(`http://localhost:8002/api/usuarios?bibliotecaId=${this.bibliotecaId}`)
      .subscribe(data => {
        this.usuarios = data;
        //console.log("Usuarios cargados", data);
      }, error => {
        console.error('Error al cargar usuarios', error);
      });
  }

  // Método para mostrar notificación
  showNotification(message: string, type: string): void {
    this.notification = { message, type };

    // La notificación desaparece después de 3 segundos
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }
  // Método para verificar si la fecha de préstamo es válida
  esFechaPrestamoValida(): boolean {
    if (!this.prestamo.fechaPrestamo) {
      return true; // No validar si el campo está vacío (será manejado por "required").
    }

    const fechaPrestamo = new Date(this.prestamo.fechaPrestamo);
    const fechaDevolucion = this.prestamo.fechaDevolucion ? new Date(this.prestamo.fechaDevolucion) : null;
    const fechaActual = new Date();

    // Validar que la fecha de préstamo no sea mayor a la fecha actual
    if (fechaPrestamo > fechaActual) {
      return false;
    }

    // Validar que la fecha de préstamo no sea mayor a la fecha de devolución
    if (fechaDevolucion && fechaPrestamo > fechaDevolucion) {
      return false;
    }

    return true;
  }

  // Método para verificar si la fecha de devolución es válida
  esFechaDevolucionValida(): boolean {
    if (!this.prestamo.fechaDevolucion) {
      return true; // No validar si el campo está vacío (será manejado por "required").
    }

    const fechaDevolucion = new Date(this.prestamo.fechaDevolucion);
    const fechaPrestamo = this.prestamo.fechaPrestamo ? new Date(this.prestamo.fechaPrestamo) : null;

    // Validar que la fecha de devolución sea mayor a la fecha de préstamo
    if (fechaPrestamo && fechaDevolucion <= fechaPrestamo) {
      return false;
    }

    return true; // Puede ser mayor a la fecha actual, por lo que no es necesario validarlo contra la fecha actual
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
  
    this.http.post('http://bibliotecasoap.local:8000/soap', soapRequest, {
      headers: { 'Content-Type': 'text/xml' },
      responseType: 'text'
    }).subscribe(response => {
      console.log(response);
      this.showNotification('Préstamo registrado exitosamente', 'success');
      // Esperar 3 segundos para mostrar la notificación y luego redirigir
      setTimeout(() => {
        this.router.navigate(['/prestamos']);
      }, 3000);
    }, error => {
      console.error(error);
      this.showNotification ( 'Error al registrar el préstamo', 'error');
    });
  }

  
  cancelar(): void {
    // Redirige a la lista de usuarios
    this.router.navigate(['/prestamos']);
  }
  
}
