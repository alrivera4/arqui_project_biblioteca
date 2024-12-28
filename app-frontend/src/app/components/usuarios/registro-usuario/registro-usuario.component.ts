import { Component, OnInit } from '@angular/core';
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


  
}
