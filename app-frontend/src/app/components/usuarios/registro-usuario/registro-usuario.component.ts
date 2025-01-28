/*import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  usuario = {
    nombre: '',
    usuario: '',
    correo: '',
    contrasenia: '',
    tipoUsuario: ''
  };

  mensaje: string = '';
  notification: { message: string; type: string } | null = null;
  
  // Validación personalizada para el correo
  validarCorreo() {
    const correoRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!correoRegex.test(this.usuario.correo)) {
      this.notification = {
        message: 'El correo electrónico no es válido. Asegúrate de que contenga el "@" y un dominio.',
        type: 'error'
      };
      return false;
    }
    return true;
  }

  // Método para mostrar notificación
  showNotification(message: string, type: string): void {
    this.notification = { message, type };

    // La notificación desaparece después de 3 segundos
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }


  constructor(private http: HttpClient
    , private router: Router
  ) {}

  ngOnInit(): void {}

  registrarUsuario() {
    const { nombre, usuario, correo, contrasenia, tipoUsuario } = this.usuario;

    // Validar que todos los campos están llenos
    if (!nombre || !usuario || !correo || !contrasenia || !tipoUsuario) {
      this.mensaje = 'Por favor, complete todos los campos';
      return;
    }


    console.log('Datos del usuario:', this.usuario);

    // Crear la solicitud SOAP
    const soapRequest = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.example.com/">
        <soapenv:Header/>
        <soapenv:Body>
          <web:RegistrarUsuario>
            <nombre>${nombre}</nombre>
            <usuario>${usuario}</usuario>
            <correo>${correo}</correo>
            <contrasenia>${contrasenia}</contrasenia>
            <tipoUsuario>${tipoUsuario}</tipoUsuario>
          </web:RegistrarUsuario>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    // Enviar la solicitud SOAP
    this.http.post('http://localhost:8000/soap', soapRequest, {
      headers: { 'Content-Type': 'text/xml' },
      responseType: 'text'
    }).subscribe(response => {
      console.log('Respuesta del servidor:', response);
      this.showNotification('Usuario registrado con éxito.', 'success');
      // Esperar 3 segundos para mostrar la notificación y luego redirigir
      setTimeout(() => {
        this.router.navigate(['/usuarios']);
      }, 3000);
    }, error => {
      console.error('Error al registrar el usuario:', error);
      this.showNotification ('Error al registrar el usuario intentelo de nuevo', 'danger');
    });
  }

  cancelar(): void {
    // Redirige a la lista de usuarios
    this.router.navigate(['/login']);
  }


  
}*/

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  bibliotecas: any[] = [];
  usuario = {
    nombre: '',
    usuario: '',
    correo: '',
    contrasenia: '',
    tipoUsuario: '',
    bibliotecaId: null
  };

  mensaje: string = '';
  notification: { message: string; type: string } | null = null;
  bibliotecaNombre: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Cargar la lista de bibliotecas al inicializar el componente
    this.cargarBibliotecas();
  }

  // Método para cargar bibliotecas desde el backend
  cargarBibliotecas() {
    this.http.get<any[]>('https://msvc-bibliotecas-874053420933.us-central1.run.app/api/bibliotecas') //aqui puse url bibliotec antes estaba:http://localhost:8080/api/bibliotecas 
      .subscribe(data => {
        this.bibliotecas = data;
        //console.log("Usuarios cargados", data);
      }, error => {
        console.error('Error al cargar usuarios', error);
      });
  }

  // Validación personalizada para el correo
  validarCorreo() {
    const correoRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!correoRegex.test(this.usuario.correo)) {
      this.notification = {
        message: 'El correo electrónico no es válido. Asegúrate de que contenga el "@" y un dominio.',
        type: 'error'
      };
      return false;
    }
    return true;
  }

  // Método para mostrar notificación
  showNotification(message: string, type: string): void {
    this.notification = { message, type };

    // La notificación desaparece después de 3 segundos
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }

  registrarUsuario() {

   

    const { nombre, usuario, correo, contrasenia, tipoUsuario, bibliotecaId } = this.usuario;

    // Validar que todos los campos están llenos
    if (!nombre || !usuario || !correo || !contrasenia || !tipoUsuario || !bibliotecaId) {
      this.mensaje = 'Por favor, complete todos los campos';
      return;
    }

    // Validar el correo electrónico
    if (!this.validarCorreo()) {
      return;
    }

    console.log('Datos del usuario:', this.usuario);

    // Crear la solicitud SOAP
    const soapRequest = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.example.com/">
        <soapenv:Header/>
        <soapenv:Body>
          <web:RegistrarUsuario>
            <nombre>${nombre}</nombre>
            <usuario>${usuario}</usuario>
            <correo>${correo}</correo>
            <contrasenia>${contrasenia}</contrasenia>
            <tipoUsuario>${tipoUsuario}</tipoUsuario>
            <bibliotecaId>${bibliotecaId}</bibliotecaId>
          </web:RegistrarUsuario>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    // Enviar la solicitud SOAP
    this.http.post('https://bibliotecasoap-874053420933.us-central1.run.app/soap', soapRequest, {
      headers: { 'Content-Type': 'text/xml' },
      responseType: 'text'
    }).subscribe({
      next: (response: any) => {
        console.log('Respuesta del servidor:', response);

        this.showNotification('Usuario registrado con éxito.', 'success');

        // Esperar 3 segundos para mostrar la notificación y luego redirigir
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        console.error('Error al registrar el usuario:', err);
        this.showNotification('Error al registrar el usuario, inténtelo de nuevo.', 'danger');
      }
    });
  }

  cancelar(): void {
    // Redirige a la página de login
    this.router.navigate(['/login']);
  }
}

