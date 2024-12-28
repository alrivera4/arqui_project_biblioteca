// libro.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private apiUrl = 'http://localhost:8001/api/libros'; // Cambia la URL si es necesario

  private librosSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]); // BehaviorSubject para manejar el estado
  libros$: Observable<any[]> = this.librosSubject.asObservable(); // Observable para exponer la lista

  constructor(private http: HttpClient) {}

  // Obtener todos los libros (retornando un observable)
  getLibros(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap((data) => {
        this.librosSubject.next(data); // Actualizar el estado con los libros obtenidos
      })
    );
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
  updateLibro(id: number, libro: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, libro, { responseType: 'text' });
  }

  deleteLibro(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { responseType: 'text' as 'json' }).pipe(
      tap(() => {
        // Filtramos el libro eliminado y actualizamos el BehaviorSubject
        const librosActualizados = this.librosSubject.value.filter(libro => libro.id !== id);
        this.librosSubject.next(librosActualizados); // Emitimos la lista actualizada
        console.log('Libros actualizados:', librosActualizados); // Verifica que el cambio se emita
      })
    );
  }
  
  
  

}
