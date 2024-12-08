import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tipoUsuarioKey = 'tipo_usuario'; // Clave para almacenar el tipo de usuario
  private usuarioKey = 'usuario'; // Clave para almacenar el nombre de usuario

  constructor() {}

  // Obtener datos almacenados
  getTipoUsuario(): string | null {
    return localStorage.getItem(this.tipoUsuarioKey);
  }

  getUsuario(): string | null {
    return localStorage.getItem(this.usuarioKey);
  }

  // Guardar datos en localStorage
  setTipoUsuario(tipoUsuario: string): void {
    localStorage.setItem(this.tipoUsuarioKey, tipoUsuario);
  }

  setUsuario(usuario: string): void {
    localStorage.setItem(this.usuarioKey, usuario);
  }

  // Limpiar datos al cerrar sesión
  clearAuthData(): void {
    localStorage.removeItem(this.tipoUsuarioKey);
    localStorage.removeItem(this.usuarioKey);
  }

  // Métodos para verificar roles
  esAdministrador(): boolean {
    return this.getTipoUsuario() === 'administrador';
  }

  esEstudiante(): boolean {
    return this.getTipoUsuario() === 'estudiante';
  }

  esProfesor(): boolean {
    return this.getTipoUsuario() === 'profesor';
  }

  // Procesar respuesta SOAP
  parseSoapResponse(soapResponse: string): { usuario: string; tipoUsuario: string } {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(soapResponse, 'text/xml');

    const usuario = xmlDoc.getElementsByTagName('web:usuario')[0]?.textContent || '';
    const tipoUsuario = xmlDoc.getElementsByTagName('web:tipoUsuario')[0]?.textContent || '';

    // Guardar datos en localStorage
    this.setUsuario(usuario);
    this.setTipoUsuario(tipoUsuario);

    return { usuario, tipoUsuario };
  }
}
