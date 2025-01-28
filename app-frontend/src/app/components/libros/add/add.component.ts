import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LibroService } from 'src/app/services/libro.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  libro: any = {
    titulo: '',
    autor: '',
    isbn: '',
    categoria: '',
    cantidadDisponible: '',
    fechaPublicacion: '',
  };

  usuario = {
    nombre: '',
    usuario: '',
    correo: '',
    contrasenia: '',
    tipoUsuario: '',
    bibliotecaId: null
  };
  
  bibliotecas: any[] = [];


  
  notification: { message: string; type: string } | null = null;

   // Método para mostrar notificación
  showNotification(message: string, type: string): void {
    this.notification = { message, type };

    // La notificación desaparece después de 3 segundos
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }
  
  libros: any[] = []; // Almacena todos los libros
  filteredLibros: any[] = []; // Almacena los libros filtrados
  searchQuery: string = ''; // Término de búsqueda
  successMessage: string = ''; // Variable para el mensaje de éxito
  errorMessage: string = ''; // Variable para el mensaje de error

  constructor(
    private libroService: LibroService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private http: HttpClient
  ) {}

 


  ngOnInit(): void {
    // Cargar todos los libros al inicio
    this.libroService.getLibros().subscribe(
      (libros) => {
        this.libros = libros;
        this.filteredLibros = libros;
      },
      (error) => {
        console.error('Error al cargar los libros', error);      }
      
    );
    this.cargarBibliotecas();
  }
  

 // Método para cargar bibliotecas desde el backend
 cargarBibliotecas() {
  this.http.get<any[]>('https://msvc-bibliotecas-874053420933.us-central1.run.app/api/bibliotecas')
    .subscribe(data => {
      this.bibliotecas = data;
      //console.log("Usuarios cargados", data);
    }, error => {
      console.error('Error al cargar usuarios', error);
    });
}


  // Método para verificar si la fecha ingresada es válida
  esFechaValida(): boolean {
    if (!this.libro.fechaPublicacion) {
      return true; // No validar si el campo está vacío (será manejado por "required").
    }

    const fechaIngresada = new Date(this.libro.fechaPublicacion);
    const fechaActual = new Date();

    // Compara la fecha ingresada con la fecha actual
    return fechaIngresada <= fechaActual;
  }


  addLibro(): void {
    // Verificación simple de validación de campos antes de enviar
    if (
      !this.libro.titulo ||
      !this.libro.autor ||
      !this.libro.isbn ||
      !this.libro.categoria ||
      !this.libro.cantidadDisponible ||
      !this.libro.fechaPublicacion||
      !this.usuario.bibliotecaId 
    ) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    this.libro.bibliotecaId = this.usuario.bibliotecaId;
  
    
   // Llamada al servicio con bibliotecaId como parámetro
   this.http
   .post(
     `https://msvc-libros-874053420933.us-central1.run.app/api/libros?bibliotecaId=${this.usuario.bibliotecaId}`,
     this.libro
   )
   .subscribe(
     (response) => {
       console.log('Libro agregado correctamente: ', response);
       this.showNotification('Libro agregado con éxito.', 'success');
       this.errorMessage = '';
       setTimeout(() => {
         this.router.navigate(['/libros']);
       }, 700);
     },
     (error) => {
       console.error('Error al guardar el libro', error);
       this.showNotification('Hubo un error al agregar el libro.', 'danger');
     }
   );
}


  

  cancelarAgregar(): void {
    this.router.navigate(['/libros']); // Redirige al listado de libros
  }

}
