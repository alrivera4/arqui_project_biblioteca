import React from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const BookList = () => {
  // Datos de ejemplo (se conectará con la API después)
  const books = [
    { id: 1, title: "El Quijote", author: "Cervantes", category: "Novela", available: true, location: "A1" },
    { id: 2, title: "1984", author: "Orwell", category: "Distopía", available: false, location: "B2" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Listado de Libros</h1>
      <Button variant="contained" color="primary" style={{ marginBottom: "20px" }}>
        Registrar Nuevo Libro
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Título</TableCell>
            <TableCell>Autor</TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell>Disponibilidad</TableCell>
            <TableCell>Ubicación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.category}</TableCell>
              <TableCell>{book.available ? "Disponible" : "Prestado"}</TableCell>
              <TableCell>{book.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookList;
