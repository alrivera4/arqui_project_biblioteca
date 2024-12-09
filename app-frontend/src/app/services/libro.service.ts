// Archivo: libro.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private apiUrl = 'http://localhost:8001/api/libros'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) {}

  // Obtener todos los libros
  getLibros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener un libro por ID
  getLibroById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo libro
  createLibro(libro: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, libro);
  }

  // Actualizar un libro existente
  // Método corregido en libro.service.ts
  updateLibro(id: number, libro: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, libro, { responseType: 'text' });
}


  // Eliminar un libro
  deleteLibro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
