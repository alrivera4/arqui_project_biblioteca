/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8002/api/usuarios'; // Cambia el puerto si es necesario

  constructor(private http: HttpClient) {}

  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';  // Importa tap si vas a usarlo

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';
   private usuariosSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]); // BehaviorSubject para manejar el estado
  usuarios$: Observable<any[]> = this.usuariosSubject.asObservable(); // Observable para exponer la lista

  constructor(private http: HttpClient) {}

  listarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerUsuario(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usuario, { responseType: 'text' });
  }
  
  // Obtener libros filtrados por bibliotecaId
  listarUsuariosPorBiblioteca(bibliotecaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?bibliotecaId=${bibliotecaId}`).pipe(
      tap((data) => {
        //this.usuariosSubject.next(data); // Actualiza el estado con los libros filtrados
      })
    );
  }


}

