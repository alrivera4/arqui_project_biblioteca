import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:8005/api/reservas'; // URL de tu microservicio de reservas

  constructor(private http: HttpClient) {}

  crearReserva(libroId: number, usuarioId: number, bibliotecaId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}?libroId=${libroId}&usuarioId=${usuarioId}&bibliotecaId=${bibliotecaId}`, {});
  }
  cancelarReserva(reservaId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${reservaId}`, { responseType: 'json' });
  }

}