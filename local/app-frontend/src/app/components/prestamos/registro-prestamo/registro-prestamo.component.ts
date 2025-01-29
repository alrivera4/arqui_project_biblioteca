/*import { Component, OnInit } from '@angular/core';
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
                <bibliotecaId>${this.bibliotecaId}</bibliotecaId>
            </web:RegistrarPrestamo>
        </soapenv:Body>
    </soapenv:Envelope>
`;

  
    this.http.post('http://localhost:8000/soap', soapRequest, {
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
  
}*/

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
    nombreUsuario: '',
    libroId: -1,
    fechaPrestamo: '',
    fechaDevolucion: '',
    bibliotecaId: 0, // Se agrega el campo bibliotecaId al modelo
    nombreBiblioteca: ''
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
    this.cargarUsuarioAutenticado();
  }

  cargarLibros() {
    this.http.get<any[]>(`http://localhost:8001/api/libros?bibliotecaId=${this.bibliotecaId}`)
      .subscribe(data => {
        this.libros = data;
        if (this.libros.length > 0) {
          this.prestamo.bibliotecaId = this.libros[0].biblioteca.bibliotecaId; // Asegúrate de que 'biblioteca' exista en el primer libro
          this.prestamo.nombreBiblioteca = this.libros[0].biblioteca.nombre; // Asignar el nombre de la biblioteca del primer libro
        }
      });
  }

  cargarUsuarioAutenticado() {
    const usuarioActual = this.authService.getUsuarioDatos();
    if (usuarioActual && usuarioActual.usuarioId) {
      // Establece los datos del usuario autenticado
      this.prestamo.usuarioId = usuarioActual.usuarioId;
      this.prestamo.nombreUsuario = usuarioActual.nombre; // Mostrar el nombre en el campo de usuario
    } else {
      console.error('No se encontró el usuario autenticado o los datos son inválidos');
    }
  }
  

  /*cargarUsuarios() {
    const usuarioActual = this.authService.getUsuarioDatos();
    if (usuarioActual && usuarioActual.usuarioId) {
      // Solo mostrar al usuario autenticado en la lista
      this.usuarios = [usuarioActual]; // La lista contiene solo al usuario autenticado
      this.prestamo.usuarioId = usuarioActual.usuarioId; // Preselecciona al usuario autenticado
    } else {
      console.error('No se encontró el usuario autenticado o los datos son inválidos');
    }
  }*/
  
  
  // Método para mostrar notificación
  showNotification(message: string, type: string): void {
    this.notification = { message, type };

    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }

  esFechaPrestamoValida(): boolean {
    if (!this.prestamo.fechaPrestamo) {
      return true;
    }

    const fechaPrestamo = new Date(this.prestamo.fechaPrestamo);
    const fechaDevolucion = this.prestamo.fechaDevolucion ? new Date(this.prestamo.fechaDevolucion) : null;
    const fechaActual = new Date();

    if (fechaPrestamo > fechaActual) {
      return false;
    }

    if (fechaDevolucion && fechaPrestamo > fechaDevolucion) {
      return false;
    }

    return true;
  }

  esFechaDevolucionValida(): boolean {
    if (!this.prestamo.fechaDevolucion) {
      return true;
    }

    const fechaDevolucion = new Date(this.prestamo.fechaDevolucion);
    const fechaPrestamo = this.prestamo.fechaPrestamo ? new Date(this.prestamo.fechaPrestamo) : null;

    if (fechaPrestamo && fechaDevolucion <= fechaPrestamo) {
      return false;
    }

    return true;
  }

  // Función que se ejecuta cuando se selecciona un libro
  onLibroChange(libroId: number) {
    const libroSeleccionado = this.libros.find(libro => libro.libroId === libroId);
    if (libroSeleccionado) {
      this.prestamo.bibliotecaId = libroSeleccionado.biblioteca.bibliotecaId; // Aquí accedes al campo 'bibliotecaId' del objeto biblioteca
      this.prestamo.nombreBiblioteca = libroSeleccionado.biblioteca.nombre; // Aquí accedes al nombre de la biblioteca
      console.log('Biblioteca seleccionada:', this.prestamo.nombreBiblioteca); // Verificación
    }
  }
  


  registrarPrestamo() {
    if (!this.prestamo.usuarioId || !this.prestamo.libroId || !this.prestamo.fechaPrestamo || !this.prestamo.fechaDevolucion) {
      this.mensaje = 'Por favor, complete todos los campos';
      return;
    }

    const soapRequest = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.example.com/">
          <soapenv:Header/>
          <soapenv:Body>
              <web:RegistrarPrestamo>
                  <usuarioId>${this.prestamo.usuarioId}</usuarioId>
                  <libroId>${this.prestamo.libroId}</libroId>
                  <fechaPrestamo>${this.prestamo.fechaPrestamo}</fechaPrestamo>
                  <fechaDevolucion>${this.prestamo.fechaDevolucion}</fechaDevolucion>
                  <bibliotecaId>${this.prestamo.bibliotecaId}</bibliotecaId>
              </web:RegistrarPrestamo>
          </soapenv:Body>
      </soapenv:Envelope>
    `;

    this.http.post('http://localhost:8000/soap', soapRequest, {
      headers: { 'Content-Type': 'text/xml' },
      responseType: 'text'
    }).subscribe(response => {
      this.showNotification('Préstamo registrado exitosamente', 'success');
      setTimeout(() => {
        this.router.navigate(['/prestamos']);
      }, 3000);
    }, error => {
      console.error(error);
      this.showNotification('Error al registrar el préstamo', 'error');
    });
  }

  cancelar(): void {
    this.router.navigate(['/prestamos']);
  }
}

