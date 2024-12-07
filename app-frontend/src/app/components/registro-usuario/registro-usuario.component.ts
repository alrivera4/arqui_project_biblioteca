import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';  // Importa el Router

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {  // Agrega el Router al constructor
    // Inicialización del formulario con las validaciones
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      usuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      tipoUsuario: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      // Construcción del mensaje SOAP con los valores del formulario
      const soapMessage = `<?xml version="1.0" encoding="UTF-8"?>
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                        xmlns:web="http://www.example.com/">
         <soapenv:Header/>
         <soapenv:Body>
            <web:RegistrarUsuario>
               <web:nombre>${this.registroForm.value.nombre}</web:nombre>
               <web:usuario>${this.registroForm.value.usuario}</web:usuario>
               <web:correo>${this.registroForm.value.correo}</web:correo>
               <web:contrasenia>${this.registroForm.value.contrasenia}</web:contrasenia>
               <web:tipoUsuario>${this.registroForm.value.tipoUsuario}</web:tipoUsuario>
            </web:RegistrarUsuario>
         </soapenv:Body>
      </soapenv:Envelope>`;

      // Envío del mensaje SOAP al servidor
      this.http.post('http://localhost:8000/soap', soapMessage, {
        headers: { 'Content-Type': 'text/xml' },
        responseType: 'text'  // Cambiar esto para tratar la respuesta como texto
      })
      .subscribe({
        next: (response: any) => {
          // Limpiar los campos del formulario
          this.registroForm.reset();

          // Redirigir a la página de login
          this.router.navigate(['/login']);  // Asegúrate de que la ruta /login esté configurada en tu enrutador
          
          alert('Usuario registrado correctamente.');
        },
        error: (err) => {
          console.error(err);
          alert('Error al registrar usuario. ' + err.message);
        }
      });
    }
  }
}
