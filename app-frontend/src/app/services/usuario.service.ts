import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8002/api/usuarios'; // Cambia esta URL según tu backend

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener un usuario por ID
  getUsuarioById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo usuario
  createUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  // Actualizar un usuario existente
  updateUsuario(id: number, usuario: any): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}`, usuario, {
      responseType: 'text' as 'json',
    });
  }

  // Eliminar un usuario por ID
  deleteUsuario(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`, {
      responseType: 'text' as 'json',
    });
  }
}
