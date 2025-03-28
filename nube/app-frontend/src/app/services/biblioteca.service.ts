import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  private apiUrl = 'https://msvc-bibliotecas-874053420933.us-central1.run.app/api/bibliotecas'; //prestamos http://localhost:8003/api/bibliotecas
  private bibliotecaActualizadaSource = new Subject<any>(); // Evento para emitir la biblioteca actualizada
  bibliotecaActualizada$ = this.bibliotecaActualizadaSource.asObservable(); // Exponemos el observable

  constructor(private http: HttpClient) {}

  // Modificamos la función para aceptar un parámetro bibliotecarioId
  listarBibliotecas(bibliotecarioId: number | null = null): Observable<any[]> {
    let url = this.apiUrl;
    
    // Si el bibliotecarioId está presente, lo añadimos como parámetro de consulta
    if (bibliotecarioId) {
      url = `${this.apiUrl}?bibliotecarioId=${bibliotecarioId}`;
    }

    return this.http.get<any[]>(url);
  }

  obtenerBiblioteca(bibliotecaId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${bibliotecaId}`);
  }

  crearBiblioteca(biblioteca: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, biblioteca);
  }

  editarBiblioteca(bibliotecaId: number, biblioteca: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${bibliotecaId}`, biblioteca, { responseType: 'text' })
      .pipe(
        tap(() => this.bibliotecaActualizadaSource.next(biblioteca))
      );
  }

  eliminarBiblioteca(bibliotecaId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${bibliotecaId}`, { responseType: 'text' });
  }
}
