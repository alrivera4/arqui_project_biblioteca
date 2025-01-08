/*import { Injectable } from '@angular/core';

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
}*/
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tipoUsuarioKey = 'tipo_usuario'; // Clave para almacenar el tipo de usuario
  private usuarioKey = 'usuario'; // Clave para almacenar el nombre de usuario
  private usuarioDatosKey = 'usuario_datos'; // Clave para almacenar otros datos del usuario

  constructor() {}

  // Obtener datos almacenados
  getTipoUsuario(): string {
    return localStorage.getItem(this.tipoUsuarioKey) || ''; // Retorna una cadena vacía si no hay valor
  }

  getUsuario(): string {
    return localStorage.getItem(this.usuarioKey) || ''; // Retorna una cadena vacía si no hay valor
  }

  getUsuarioDatos(): any {
    const datos = localStorage.getItem(this.usuarioDatosKey);
    return datos ? JSON.parse(datos) : null;
  }

  // Guardar datos en localStorage
  setTipoUsuario(tipoUsuario: string): void {
    localStorage.setItem(this.tipoUsuarioKey, tipoUsuario);
  }

  setUsuario(usuario: string): void {
    localStorage.setItem(this.usuarioKey, usuario);
  }

  setUsuarioDatos(datos: any): void {
    localStorage.setItem(this.usuarioDatosKey, JSON.stringify(datos));
  }

  // Limpiar datos al cerrar sesión
  clearAuthData(): void {
    localStorage.removeItem(this.tipoUsuarioKey);
    localStorage.removeItem(this.usuarioKey);
    localStorage.removeItem(this.usuarioDatosKey);
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

  // Comprobar si el usuario está autenticado
  estaAutenticado(): boolean {
    return this.getUsuario() !== '' && this.getTipoUsuario() !== '';
  }

  // Procesar respuesta SOAP
  parseSoapResponse(soapResponse: string): { usuario: string; tipoUsuario: string, usuarioId: string, nombre: string, correo: string } {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(soapResponse, 'text/xml');

    // Extraer datos del XML, proporcionando un valor por defecto de cadena vacía si es null o undefined
    const usuario = xmlDoc.getElementsByTagName('web:usuario')[0]?.textContent || '';
    const tipoUsuario = xmlDoc.getElementsByTagName('web:tipoUsuario')[0]?.textContent || '';
    const usuarioId = xmlDoc.getElementsByTagName('web:usuarioId')[0]?.textContent || '';
    const correo = xmlDoc.getElementsByTagName('web:correo')[0]?.textContent || '';
    const nombre = xmlDoc.getElementsByTagName('web:nombre')[0]?.textContent || '';

    // Guardar datos en localStorage
    this.setUsuario(usuario);
    this.setTipoUsuario(tipoUsuario);

    // Guardar los datos completos del usuario
    const datosCompletos = { usuarioId, nombre, usuario, correo, tipoUsuario };
    this.setUsuarioDatos(datosCompletos);

    return { usuario, tipoUsuario, usuarioId, nombre, correo };
  }
}




