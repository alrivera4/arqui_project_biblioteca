import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private apiUrl = 'http://localhost:8003/api/prestamos'; // Cambia esta URL si es necesario

  constructor(private http: HttpClient) {}

  // Obtener todos los préstamos
  getPrestamos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear un préstamo
  createPrestamo(prestamo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, prestamo);
  }

  // Obtener préstamo por ID
  getPrestamoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un préstamo
  updatePrestamo(id: number, prestamo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, prestamo);
  }

  // Eliminar un préstamo
  deletePrestamo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
