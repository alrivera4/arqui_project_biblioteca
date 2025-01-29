import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prestamos-activos',
  templateUrl: './prestamos-activos.component.html',
  styleUrls: ['./prestamos-activos.component.css']
})
export class PrestamosActivosComponent implements OnInit {
  prestamos: any[] = []; // Datos originales de la tabla
  prestamosFiltrados: any[] = []; // Datos filtrados dinámicamente
  filtros = {
    usuarioId: '',
    libroTitulo: '',
    fechaInicio: '',
    fechaFin: '',
    estado: 'activo'
  };
  mensaje: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarPrestamosActivos();
  }

  cargarPrestamosActivos() {
    console.log('Filtros:', this.filtros);
    
    const soapRequest = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.example.com/">
        <soapenv:Header/>
        <soapenv:Body>
          <web:GenerarReportePrestamosActivos>
            <usuarioId>${this.filtros.usuarioId || ''}</usuarioId>
            <libroTitulo>${this.filtros.libroTitulo}</libroTitulo>
            <fechaInicio>${this.filtros.fechaInicio}</fechaInicio>
            <fechaFin>${this.filtros.fechaFin}</fechaFin>
            <estado>${this.filtros.estado}</estado>
          </web:GenerarReportePrestamosActivos>
        </soapenv:Body>
      </soapenv:Envelope>
    `;
  
    this.http.post('http://localhost:8000/soap', soapRequest, {
      headers: { 'Content-Type': 'text/xml' },
      responseType: 'text'
    }).subscribe(response => {
      console.log('Respuesta del servidor:', response);
  
      try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response, 'text/xml');
        const estado = xmlDoc.getElementsByTagName('web:estado')[0]?.textContent;
  
        if (estado === 'Exitoso') {
          const reportesTexto = xmlDoc.getElementsByTagName('web:reportes')[0]?.textContent;
  
          if (reportesTexto) {
            // Dividir los reportes por salto de línea
            const lineas = reportesTexto.split('\n');
            this.prestamos = lineas.map(linea => {
              const match = linea.match(/ID Préstamo: (\d+), Usuario: (.*?), Libro: (.*?), Fecha de Préstamo: (.*?), Fecha de Devolución: (.*?), Estado: (.*?)$/);
              return match ? {
                id: match[1],
                usuario: match[2],
                libro: match[3],
                fechaPrestamo: match[4],
                fechaDevolucion: match[5],
                estado: match[6]
              } : null;
            }).filter(item => item !== null);
  
            this.aplicarFiltros();
          }
        } else {
          console.error('El estado de la respuesta no es exitoso.');
        }
      } catch (err) {
        console.error('Error al procesar el XML:', err);
      }
    }, error => {
      console.error('Error al cargar los préstamos activos:', error);
      this.mensaje = 'Error al cargar los préstamos activos.';
    });
  }
  

  aplicarFiltros() {
    this.prestamosFiltrados = this.prestamos.filter(prestamo => {
      return (
        (!this.filtros.usuarioId || prestamo.usuario.toLowerCase().includes(this.filtros.usuarioId.toLowerCase())) &&
        (!this.filtros.libroTitulo || prestamo.libro.toLowerCase().includes(this.filtros.libroTitulo.toLowerCase())) &&
        (!this.filtros.fechaInicio || new Date(prestamo.fechaPrestamo) >= new Date(this.filtros.fechaInicio)) &&
        (!this.filtros.fechaFin || new Date(prestamo.fechaDevolucion) <= new Date(this.filtros.fechaFin)) &&
        (!this.filtros.estado || prestamo.estado.toLowerCase() === this.filtros.estado.toLowerCase())
      );
    });
  }
}
