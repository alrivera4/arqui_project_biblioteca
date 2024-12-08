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
  username= '';
  password= '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
    });
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
            console.log('Respuesta SOAP completa:', response);
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response, 'text/xml');
  
            const estado = xmlDoc.querySelector('estado')?.textContent || xmlDoc.querySelector('web\\:estado')?.textContent;
            const mensaje = xmlDoc.querySelector('mensaje')?.textContent || xmlDoc.querySelector('web\\:mensaje')?.textContent;
            const usuarioValidado = xmlDoc.querySelector('usuario')?.textContent || xmlDoc.querySelector('web\\:usuario')?.textContent;
            const tipoUsuario = xmlDoc.getElementsByTagName('web:tipoUsuario')[0].textContent;// Capturamos tipoUsuario

            if (estado === 'Exitoso' && usuarioValidado === usuario) {
              alert(`Login exitoso. Tipo de usuario: ${tipoUsuario}`);

              if (tipoUsuario) {
                // Guardar el tipo de usuario en el almacenamiento local
                this.authService.setTipoUsuario(tipoUsuario);
                this.router.navigate(['/modulos']);
              } else {
                alert('Error al procesar la respuesta del servidor.');
              }
            } else {
              alert(`Credenciales inválidas: ${mensaje || 'Error desconocido'}`);
            }
          },
          error: (err) => {
            console.error('Error en el login: ', err);
            alert('Error en el login: ' + err.message);
          }
        });
    }
  }

  registrarUsuario() {
    this.router.navigate(['/registro']);
  }
}