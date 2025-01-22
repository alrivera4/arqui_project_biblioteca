import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/auth.service'; // Asegúrate de usar la ruta correcta

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  usuarios: any[] = []; // Almacena los usuarios obtenidos
  mensaje: string = '';
  bibliotecaId: number = 0;

  constructor(private usuarioService: UsuarioService,  public authService: AuthService  ) {}

  ngOnInit(): void {
    
    this.bibliotecaId = this.authService.getBibliotecaId(); // Método para obtener el ID de la biblioteca del bibliotecario
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioService.listarUsuariosPorBiblioteca(this.bibliotecaId).subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
        this.mensaje = 'Error al cargar usuarios.';
      }
    });
  }
}
