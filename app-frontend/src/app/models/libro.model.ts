// src/app/models/libro.model.ts
export interface Libro {
    id: number;
    titulo: string;
    autor: string;
    isbn: string;
    categoria: string;
    cantidadDisponible: number;
    fecha_publicacion: string; // Puedes ajustarlo al tipo de fecha que usas
  }
  