import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  username = '';
  password = '';

  notification: { message: string; type: string } | null = null;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private router: Router, 
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
    });
  }

  // Método para mostrar notificaciones
  showNotification(message: string, type: string): void {
    this.notification = { message, type };

    // La notificación desaparece después de 3 segundos
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }

  onLogin() {
    if (this.loginForm.valid) {
      const usuario = this.loginForm.get('usuario')?.value;
      const contrasenia = this.loginForm.get('contrasenia')?.value;

      const soapBody = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.example.com/">
          <soapenv:Header/>
          <soapenv:Body>
            <web:ValidarUsuario>
              <web:usuario>${usuario}</web:usuario>
              <web:contrasenia>${contrasenia}</web:contrasenia>
            </web:ValidarUsuario>
          </soapenv:Body>
        </soapenv:Envelope>
      `;
      
      const headers = new HttpHeaders({
        'Content-Type': 'text/xml',
      });

      this.http.post('http://localhost:8000/soap', soapBody, { headers, responseType: 'text' })
        .subscribe({
          next: (response: any) => {
            // Procesar la respuesta y guardar los datos
            const usuarioDatos = this.authService.parseSoapResponse(response);

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response, 'text/xml');
  
            const estado = xmlDoc.querySelector('estado')?.textContent || xmlDoc.querySelector('web\\:estado')?.textContent;
            const mensaje = xmlDoc.querySelector('mensaje')?.textContent || xmlDoc.querySelector('web\\:mensaje')?.textContent;
            const usuarioValidado = xmlDoc.querySelector('usuario')?.textContent || xmlDoc.querySelector('web\\:usuario')?.textContent;
            const tipoUsuario = xmlDoc.querySelector('tipoUsuario')?.textContent || xmlDoc.querySelector('web\\:tipoUsuario')?.textContent;

            if (estado === 'Exitoso' && usuarioValidado === usuario) {
              this.showNotification(`Login exitoso. Tipo de usuario: ${tipoUsuario}`, 'success');
              
              // Acceder a los datos completos del usuario
              const usuarioId = usuarioDatos.usuarioId;
              const nombre = usuarioDatos.nombre;
              const correo = usuarioDatos.correo;
              console.log('Usuario ID:', usuarioId);
              console.log('Nombre del usuario:', nombre);
              console.log('Correo del usuario:', correo);

              // Guardar el tipo de usuario en el almacenamiento local
              this.authService.setUsuario(usuario);
              this.authService.setUsuarioDatos(usuarioDatos); // Guardar datos adicionales

              // Redirigir según el tipo de usuario
              if (tipoUsuario) {
                setTimeout(() => {
                  this.router.navigate(['/modulos']);
                }, 3000);
              }
            } else if (estado === 'ContraseniaIncorrecta') {
              this.showNotification(`Credenciales inválidas: ${mensaje || 'Error desconocido'}`, 'error');
            } else if (estado === 'UsuarioNoExiste') {
              this.showNotification(`El usuario ${usuario} no está registrado`, 'error');
            }
          },
          error: (err) => {
            console.error('Error en el login: ', err);
            this.showNotification('Error en el login: ' + err.message || 'Error desconocido', 'error');
          }
        });
    }
  }

  registrarUsuario() {
    this.router.navigate(['/usuarios/registro']);
  }
}
