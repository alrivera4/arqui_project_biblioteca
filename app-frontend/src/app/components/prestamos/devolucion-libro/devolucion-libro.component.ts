import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-devolucion-libro',
  templateUrl: './devolucion-libro.component.html',
  styleUrls: ['./devolucion-libro.component.css']
})
export class DevolucionLibroComponent implements OnInit {
  prestamos: any[] = []; // Lista completa de préstamos
  prestamosFiltrados: any[] = []; // Lista filtrada de préstamos
  devolucion = {
    prestamoId: 0,
    fechaDevolucion: ''
  };
  mensaje: string = '';
  mostrarFormulario: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    this.http.get<any[]>('http://localhost:8080/api/usuario/prestamos')
      .subscribe(data => {
        this.prestamos = data;
        this.prestamosFiltrados = [...this.prestamos]; // Inicialmente, mostrar todos los préstamos
      }, error => {
        console.error('Error al cargar préstamos', error);
      });
  }

  filtrarActivos() {
    this.prestamosFiltrados = this.prestamos.filter(prestamo => prestamo.estado === 'activo');
  }

  mostrarTodos() {
    this.prestamosFiltrados = [...this.prestamos];
  }

  abrirFormulario(prestamoId: number) {
    this.devolucion.prestamoId = prestamoId;
    this.mostrarFormulario = true;
  }

  registrarDevolucion() {
    if (!this.devolucion.fechaDevolucion) {
      this.mensaje = 'Por favor, seleccione una fecha de devolución';
      return;
    }

    const soapRequest = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.example.com/">
        <soapenv:Header/>
        <soapenv:Body>
          <web:RegistrarDevolucion>
            <prestamoId>${this.devolucion.prestamoId}</prestamoId>
            <fechaDevolucion>${this.devolucion.fechaDevolucion}</fechaDevolucion>
          </web:RegistrarDevolucion>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    this.http.post('http://localhost:8000/soap', soapRequest, {
      headers: { 'Content-Type': 'text/xml' },
      responseType: 'text'
    }).subscribe(response => {
      console.log(response);
      this.mensaje = 'Devolución registrada exitosamente';
      this.mostrarFormulario = false; // Ocultar formulario después del registro
      this.cargarPrestamos(); // Recargar la lista de préstamos
    }, error => {
      console.error(error);
      this.mensaje = 'Error al registrar la devolución';
    });
  }

  cancelar() {
    this.mostrarFormulario = false;
    this.devolucion = { prestamoId: 0, fechaDevolucion: '' };
  }
}