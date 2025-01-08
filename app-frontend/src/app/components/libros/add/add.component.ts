import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LibroService } from 'src/app/services/libro.service';

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
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Cargar todos los libros al inicio
    this.libroService.getLibros().subscribe(
      (libros) => {
        this.libros = libros;
        this.filteredLibros = libros;
      },
      (error) => {
        console.error('Error al cargar los libros', error);
        this.errorMessage = 'Hubo un error al cargar los libros.';
      }
    );
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
      !this.libro.fechaPublicacion
    ) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }
  
    
  
    // Llamada al servicio para agregar el libro
    console.log('Intentando agregar libro: ', this.libro);
    this.libroService.createLibro(this.libro).subscribe(
      (response) => {
        console.log('Libro agregado correctamente: ', response);
        
        // Mostrar mensaje de éxito
        this.showNotification('Libro agregado con éxito.', 'success');
        this.errorMessage = ''; // Limpiar mensaje de error en caso de éxito
       
        // Forzar la detección de cambios
        setTimeout(() => {
          this.cdRef.detectChanges(); // Forzar la detección de cambios para actualizar la vista
        }, 400);
  
        // Redirigir a la lista de libros después de un pequeño retraso
        setTimeout(() => {
          this.router.navigate(['/libros']);
        }, 700); // Asegura que el mensaje se muestre antes de redirigir
      },
      (error) => {
        console.error('Error al guardar el libro', error);
        this.showNotification('Hubo un error al agregar el libro.', 'danger');
        this.successMessage = ''; // Limpiar mensaje de éxito en caso de error
      }
    );
  }

  cancelarAgregar(): void {
    this.router.navigate(['/libros']); // Redirige al listado de libros
  }

 
}