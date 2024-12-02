const express = require('express');
const soap = require('soap');
const fs = require('fs');


const { Client } = require('pg'); // Importar el cliente de PostgreSQL

const db = new Client({
    host: 'localhost', // Dirección del servidor PostgreSQL
    user: 'postgres', // Usuario de la base de datos
    password: 'admin', // Contraseña del usuario
    database: 'biblioteca', // Nombre de la base de datos
    port: 5432, // Puerto (5432 es el predeterminado para PostgreSQL)
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión', err.stack);
        return;
    }
    console.log('Connected to the PostgreSQL database.');
});

module.exports = db; // Exportar la conexión para usarla en otros archivos


const app = express();
const port = 8000;

// Ruta al archivo WSDL
const wsdlFile = fs.readFileSync('librosusuarios-service.wsdl', 'utf8');

// Definición de las funciones del servicio
const loanService = {
  LoanService: {
    LoanServicePort: {
      RegistrarPrestamo: async (args) => {
        try {
            console.log(args);
    
            const { usuarioId, libroId, fechaPrestamo, fechaDevolucion } = args;
    
            // Verificar si el libro está disponible
            const libroDisponibleQuery = `
                SELECT cantidad_disponible 
                FROM libros 
                WHERE libro_id = $1
            `;
            const libroDisponibleResult = await db.query(libroDisponibleQuery, [libroId]);
    
            if (libroDisponibleResult.rows.length === 0 || libroDisponibleResult.rows[0].cantidad_disponible <= 0) {
                return { estado: 'Error', mensaje: 'Libro no disponible' };
            }
    
            // Registrar el préstamo
            const registrarPrestamoQuery = `
                INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING prestamo_id
            `;
            const registrarPrestamoResult = await db.query(registrarPrestamoQuery, [
                usuarioId, libroId, fechaPrestamo, fechaDevolucion, 'activo',
            ]);
    
            const prestamoId = registrarPrestamoResult.rows[0].prestamo_id;
    
            // Actualizar la cantidad disponible del libro
            const actualizarLibroQuery = `
                UPDATE libros 
                SET cantidad_disponible = cantidad_disponible - 1 
                WHERE libro_id = $1
            `;
            await db.query(actualizarLibroQuery, [libroId]);
    
            return {
                estado: 'Exitoso',
                transaccionId: prestamoId,
                fecha: fechaPrestamo,
            };
        } catch (err) {
            console.error('Error al Registrar Prestamo:', err);
            return { estado: 'Error', mensaje: 'Ocurrió un error al registrar el préstamo.' };
        }
    },
    
        
    RegistrarDevolucion: async (args) => {
      try {
          console.log(args);
  
          const { prestamoId, fechaDevolucion } = args;
  
          // Verificar si el préstamo existe y está activo
          const query = 'SELECT * FROM prestamos WHERE prestamo_id = $1 AND estado = $2';
          const results = await db.query(query, [prestamoId, 'activo']);
  
          if (results.rows.length === 0) {
              console.log('Préstamo no encontrado o ya devuelto');
              return { estado: 'Error', mensaje: 'Préstamo no encontrado o ya devuelto' };
          }
  
          // Calcular multa si la devolución es tardía
          const fechaLimite = new Date(results.rows[0].fecha_devolucion);
          let multa = 0;
  
          if (new Date(fechaDevolucion) > fechaLimite) {
              const diasRetraso = Math.ceil((new Date(fechaDevolucion) - fechaLimite) / (1000 * 60 * 60 * 24));
              multa = diasRetraso * 5.00; // Multa diaria de 5 unidades
          }
  
          // Actualizar el préstamo como devuelto y asignar multa
          const updateQuery = 'UPDATE prestamos SET estado = $1, fecha_devolucion = $2, multa = $3 WHERE prestamo_id = $4';
          await db.query(updateQuery, ['devuelto', fechaDevolucion, multa, prestamoId]);
  
          // Actualizar la cantidad disponible del libro
          const libroId = results.rows[0].libro_id;
          const updateLibroQuery = 'UPDATE libros SET cantidad_disponible = cantidad_disponible + 1 WHERE libro_id = $1';
          await db.query(updateLibroQuery, [libroId]);
  
          // Registrar en el historial de préstamos
          const insertQuery = 'INSERT INTO historial_prestamos (usuario_id, libro_id, fecha_prestamo, fecha_devolucion, multa) VALUES ($1, $2, $3, $4, $5)';
          await db.query(insertQuery, [results.rows[0].usuario_id, libroId, results.rows[0].fecha_prestamo, fechaDevolucion, multa]);
  
          // Enviar la respuesta SOAP de éxito
          console.log('Devolución registrada exitosamente');
          return { estado: 'Exitoso', multa };
  
      } catch (err) {
          console.error('Error en el proceso de devolución:', err);
          return { estado: 'Error', mensaje: 'Error en el servidor' };
      }
  },
  
          
          GenerarReportePrestamosActivos: (args) => {
            console.log(args);
          
            db.query('SELECT p.prestamo_id, u.nombre AS usuario, l.titulo AS libro, p.fecha_prestamo, p.fecha_devolucion, p.estado FROM prestamos p ' +
                    'JOIN usuarios u ON p.usuario_id = u.usuario_id ' +
                    'JOIN libros l ON p.libro_id = l.libro_id WHERE p.estado = "activo"', (err, results) => {
              if (err) {
                throw err;
              }
          
              let reportes = results.map((prestamo) => {
                return `ID Préstamo: ${prestamo.prestamo_id}, Usuario: ${prestamo.usuario}, Libro: ${prestamo.libro}, Fecha de Préstamo: ${prestamo.fecha_prestamo}, Fecha de Devolución: ${prestamo.fecha_devolucion}, Estado: ${prestamo.estado}`;
              });
          
              return { reportes: reportes.join('\n') };
            });
          },
          

          GenerarHistorialUsuario: (args) => {
            console.log(args);
          
            const { usuarioId } = args;
          
            db.query('SELECT p.prestamo_id, l.titulo AS libro, p.fecha_prestamo, p.fecha_devolucion, p.estado, p.multa ' +
                    'FROM prestamos p JOIN libros l ON p.libro_id = l.libro_id ' +
                    'WHERE p.usuario_id = ? ORDER BY p.fecha_prestamo DESC', [usuarioId], (err, results) => {
              if (err) {
                throw err;
              }
          
              let historial = results.map((prestamo) => {
                return `ID Préstamo: ${prestamo.prestamo_id}, Libro: ${prestamo.libro}, Fecha de Préstamo: ${prestamo.fecha_prestamo}, Fecha de Devolución: ${prestamo.fecha_devolucion}, Estado: ${prestamo.estado}, Multa: ${prestamo.multa}`;
              });
          
              return { historial: historial.join('\n') };
            });
          },
          


          RegistrarUsuario: (args) => {
            console.log(args);
          
            const { nombre, correo, contrasenia, tipoUsuario } = args;
          
            // Insertar el nuevo usuario
            db.query('INSERT INTO usuarios (nombre, correo, contrasenia, tipo_usuario) VALUES (?, ?, ?, ?)', 
            [nombre, correo, contrasenia, tipoUsuario], (err, results) => {
              if (err) {
                throw err;
              }
          
              return { usuarioId: results.insertId, estado: 'Registrado' };
            });
          },
          

          SuspenderUsuario: (args) => {
            console.log(args);
          
            const { usuarioId } = args;
          
            // Suspender al usuario
            db.query('UPDATE usuarios SET estado = "suspendido" WHERE usuario_id = ?', [usuarioId], (err) => {
              if (err) {
                throw err;
              }
          
              return { estado: 'Suspendido' };
            });
          }
          
    },
  },
};

// Crear el servidor SOAP
soap.listen(app, '/soap', loanService, wsdlFile, () => {
  console.log('Servicio SOAP corriendo en http://localhost:8000/soap');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});
