const express = require('express');
const soap = require('soap');
const fs = require('fs');
const cors = require('cors');  // Importar el paquete cors


const { Client } = require('pg'); // Importar el cliente de PostgreSQL

const db = new Client({
    host: 'localhost', // Dirección del servidor PostgreSQL
    user: 'postgres', // Usuario de la base de datos
    password: 'admin', // Contraseña del usuario
    database: 'biblioteca2', // Nombre de la base de datos
    port: 5432, // Puerto (5432 es el predeterminado para PostgreSQL)
    statement_timeout: 5000, // Tiempo límite para las consultas (5 segundos)
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

// Habilitar CORS en todas las rutas
app.use(cors());  

// Ruta al archivo WSDL
const wsdlFile = fs.readFileSync('librosusuarios-service.wsdl', 'utf8');

// Definición de las funciones del servicio
const loanService = {
  LoanService: {
    LoanServicePort: {

        /*ValidarUsuario: async (args) => {
            try {
              console.log("Datos recibidos para validación de usuario:", args);
          
              const { usuario, contrasenia } = args; // Aquí se reciben ambos valores: usuario y contrasenia
          
              // Verificar si el usuario existe en la base de datos
              const query = 'SELECT usuario, tipo_usuario FROM usuarios WHERE usuario = $1 AND contrasenia = $2'; // Usar usuario y contrasenia
              const result = await db.query(query, [usuario, contrasenia]);
          
              if (result.rows.length === 0) {
                // Si no se encuentra al usuario, retornar un mensaje de error
                return {
                  estado: 'Error',
                  mensaje: 'Usuario o contraseña incorrectos',
                  usuario: '', // No se incluye el usuario si no fue encontrado
                };
              }
          
              // Si el usuario existe, retornar un mensaje de éxito junto con el nombre de usuario
              return {
                estado: 'Exitoso',
                mensaje: 'Usuario validado con éxito',
                usuario: result.rows[0].usuario, // Aquí se incluye el nombre de usuario encontrado
                tipoUsuario: result.rows[0].tipo_usuario, // Aquí se incluye el tipo de usuario encontrado
              };
            } catch (err) {
              console.error('Error al validar el usuario:', err);
              return {
                estado: 'Error',
                mensaje: 'Error al validar el usuario',
                usuario: '', // No se incluye el usuario en caso de error
              };
            }
          },*/
          /*ValidarUsuario: async (args) => {
            try {
              console.log("Datos recibidos para validación de usuario:", args);
          
              const { usuario, contrasenia } = args; // Aquí se reciben ambos valores: usuario y contrasenia
          
              // Verificar si el usuario existe en la base de datos y traer más campos
              const query = `
                SELECT usuario_id, nombre, usuario, correo, contrasenia, tipo_usuario
                FROM usuarios
                WHERE usuario = $1 AND contrasenia = $2
              `; // Asegúrate de que estos campos existen en tu tabla
              const result = await db.query(query, [usuario, contrasenia]);
          
              if (result.rows.length === 0) {
                return {
                  estado: 'Error',
                  mensaje: 'Usuario o contraseña incorrectos',
                  usuario: '',
                };
              }
          
              // Si el usuario existe, devolver todos los datos necesarios
              return {
                estado: 'Exitoso',
                mensaje: 'Usuario validado con éxito',
                usuarioId: result.rows[0].usuario_id,
                usuario: result.rows[0].usuario,
                nombre: result.rows[0].nombre,
                correo: result.rows[0].correo,
                contrasenia: result.rows[0].contrasenia,
                tipoUsuario: result.rows[0].tipo_usuario,
              };
            } catch (err) {
              console.error('Error al validar el usuario:', err);
              return {
                estado: 'Error',
                mensaje: 'Error al validar el usuario',
                usuario: '',
              };
            }
          },*/
      
          ValidarUsuario: async (args) => {
            try {
              console.log("Datos recibidos para validación de usuario:", args);
          
              const { usuario, contrasenia } = args;
          
              // Verificar si el usuario existe en la base de datos
              const usuarioQuery = `
                SELECT usuario_id, nombre, usuario, correo, contrasenia, tipo_usuario
                FROM usuarios
                WHERE usuario = $1
              `;
              const usuarioResult = await db.query(usuarioQuery, [usuario]);
          
              if (usuarioResult.rows.length === 0) {
                // Usuario no existe
                return {
                  estado: 'UsuarioNoExiste',
                  mensaje: 'El usuario no está registrado.',
                  usuario: '',
                };
              }
          
              // Verificar si la contraseña es correcta
              const contraseniaCorrectaQuery = `
                SELECT usuario_id, nombre, usuario, correo, contrasenia, tipo_usuario
                FROM usuarios
                WHERE usuario = $1 AND contrasenia = $2
              `;
              const contraseniaResult = await db.query(contraseniaCorrectaQuery, [usuario, contrasenia]);
          
              if (contraseniaResult.rows.length === 0) {
                // Contraseña incorrecta
                return {
                  estado: 'ContraseniaIncorrecta',
                  mensaje: 'La contraseña es incorrecta.',
                  usuario: '',
                };
              }
          
              // Usuario y contraseña correctos
              const user = contraseniaResult.rows[0];
              return {
                estado: 'Exitoso',
                mensaje: 'Usuario validado con éxito.',
                usuarioId: user.usuario_id,
                usuario: user.usuario,
                nombre: user.nombre,
                correo: user.correo,
                tipoUsuario: user.tipo_usuario,
              };
            } catch (err) {
              console.error('Error al validar el usuario:', err.message || 'Error desconocido');
              return {
                estado: 'Error',
                mensaje: 'Error al validar el usuario.',
                usuario: '',
              };
            }
          },
          
          
          
    
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
  
  GenerarReportePrestamosActivos: async (args = {}) => {
    try {
        args = args || {}; // Asegurarse de que args no sea null
        console.log('Parámetros recibidos:', args);

        // Desestructurar los filtros con valores predeterminados
        const { usuarioId = null, libroTitulo = null, fechaInicio = null, fechaFin = null, estado = null } = args;

        // Consulta base para obtener los préstamos activos
        let query = `
            SELECT p.prestamo_id, u.nombre AS usuario, l.titulo AS libro, 
                   p.fecha_prestamo, p.fecha_devolucion, p.estado 
            FROM prestamos p
            JOIN usuarios u ON p.usuario_id = u.usuario_id
            JOIN libros l ON p.libro_id = l.libro_id
            WHERE p.estado = $1
        `;
        let params = ['activo']; // Parámetro inicial para filtrar por préstamos activos

        // Agregar filtros adicionales si se proporcionan
        if (usuarioId) {
            query += ' AND u.usuario_id = $' + (params.length + 1);
            params.push(usuarioId);
        }
        if (libroTitulo) {
            query += ' AND l.titulo ILIKE $' + (params.length + 1);
            params.push('%' + libroTitulo + '%');
        }
        if (fechaInicio) {
            query += ' AND p.fecha_prestamo >= $' + (params.length + 1);
            params.push(fechaInicio);
        }
        if (fechaFin) {
            query += ' AND p.fecha_devolucion <= $' + (params.length + 1);
            params.push(fechaFin);
        }
        if (estado) {
            query += ' AND p.estado = $' + (params.length + 1);
            params.push(estado);
        }

        // Ejecutar la consulta con los parámetros dinámicos
        const results = await db.query(query, params);
        console.log('Resultados de la consulta:', results.rows);

        // Mapear los resultados y generar el reporte
        const reportes = results.rows.map((prestamo) => {
            return ` ID Préstamo: ${prestamo.prestamo_id}, Usuario: ${prestamo.usuario}, Libro: ${prestamo.libro}, Fecha de Préstamo: ${prestamo.fecha_prestamo}, Fecha de Devolución: ${prestamo.fecha_devolucion}, Estado: ${prestamo.estado}`;
           
        });

        // Retornar el reporte
        return { estado: 'Exitoso', reportes: reportes.join('\n') };

    } catch (err) {
        console.error('Error al generar el reporte de préstamos activos:', err);
        return { estado: 'Error', mensaje: 'No se pudo generar el reporte' };
    }
},


  GenerarHistorialUsuario: async (args) => {
    try {
      console.log(args);
  
      const { usuarioId } = args;
  
      // Consulta para obtener el historial de préstamos del usuario
      const query = `
        SELECT p.prestamo_id, l.titulo AS libro, p.fecha_prestamo, 
               p.fecha_devolucion, p.estado, p.multa
        FROM prestamos p
        JOIN libros l ON p.libro_id = l.libro_id
        WHERE p.usuario_id = $1
        ORDER BY p.fecha_prestamo DESC
      `;

      const results = await db.query(query, [usuarioId]); // Parámetro seguro
  
      // Mapear los resultados y generar el historial
      const historial = results.rows.map((prestamo) => {
        return `ID Préstamo: ${prestamo.prestamo_id}, Libro: ${prestamo.libro}, Fecha de Préstamo: ${prestamo.fecha_prestamo}, Fecha de Devolución: ${prestamo.fecha_devolucion}, Estado: ${prestamo.estado}, Multa: ${prestamo.multa}`;
      });
  
      // Retornar el historial 
      return { estado: 'Exitoso', historial: historial.join('\n') };
  
    } catch (err) {
      console.error('Error al generar el historial del usuario:', err);
      return { estado: 'Error', mensaje: 'No se pudo generar el historial' };
    }
  },
  

  /*RegistrarUsuario: (args, callback) => {
    console.log("Datos recibidos:", args);
    
    const { nombre, usuario, correo, contrasenia, tipoUsuario } = args;

    db.query(
        'INSERT INTO usuarios (nombre, usuario, correo, contrasenia, tipo_usuario) VALUES ($1, $2, $3, $4, $5) RETURNING usuario_id', 
        [nombre, usuario, correo, contrasenia, tipoUsuario], 
        (err, results) => {
            if (err) {
                console.error("Error al registrar usuario:", err);

                // Llamar al callback con un error
                return callback({
                    success: false,
                    message: "Error al registrar usuario",
                    error: err.message
                });
            }

            console.log("Usuario registrado con ID:", results.rows[0].usuario_id);

            // Llamar al callback con la respuesta de éxito
            callback(null, {
                //success: true,
                //usuarioId: results.rows[0].usuario_id,
                estado: 'Registrado',
                mensaje: 'Usuario registrado correctamente'
            });
        }
    );
},*/

RegistrarUsuario: (args, callback) => {
  console.log("Datos recibidos:", args);
  
  const { nombre, usuario, correo, contrasenia, tipoUsuario, bibliotecaId } = args;

  // Consulta SQL para registrar el usuario
  db.query(
      'INSERT INTO usuarios (nombre, usuario, correo, contrasenia, tipo_usuario, biblioteca_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING usuario_id, biblioteca_id', 
      [nombre, usuario, correo, contrasenia, tipoUsuario, bibliotecaId], 
      (err, results) => {
          if (err) {
              console.error("Error al registrar usuario:", err);

              // Llamar al callback con un error
              return callback({
                  success: false,
                  message: "Error al registrar usuario",
                  error: err.message
              });
          }

          const usuarioId = results.rows[0].usuario_id;
          const bibliotecaId = results.rows[0].biblioteca_id;

          // Recuperar el nombre de la biblioteca usando su ID
          db.query(
              'SELECT nombre FROM bibliotecas WHERE biblioteca_id = $1',
              [bibliotecaId],
              (err, bibliotecaResults) => {
                  if (err) {
                      console.error("Error al recuperar el nombre de la biblioteca:", err);
                      return callback({
                          success: false,
                          message: "Error al recuperar el nombre de la biblioteca",
                          error: err.message
                      });
                  }

                  const bibliotecaNombre = bibliotecaResults.rows[0]?.nombre || 'Desconocida';

                  console.log("Usuario registrado con ID:", usuarioId);

                  // Llamar al callback con la respuesta de éxito
                  callback(null, {
                      estado: 'Registrado',
                      mensaje: 'Usuario registrado correctamente',
                      usuarioId,
                      bibliotecaNombre
                  });
              }
          );
      }
  );
},



SuspenderUsuario :async (args) => {
  try {
      console.log("Datos recibidos para suspensión:", args);

      const { usuarioId } = args;

      // Iniciar transacción para garantizar consistencia
      await db.query('BEGIN');  // Esperar la transacción
      console.log("Transacción iniciada.");

      // Suspender los préstamos del usuario
      await db.query(
          'UPDATE prestamos SET estado = $1 WHERE usuario_id = $2 AND estado = $3',
          ['suspendido', usuarioId, 'activo']
      );
      console.log("Préstamos actualizados.");

      // Suspender al usuario
      await db.query(
          'UPDATE usuarios SET estado = $1 WHERE usuario_id = $2',
          ['suspendido', usuarioId]
      );
      console.log("Usuario suspendido.");

      // Confirmar transacción
      await db.query('COMMIT');
      console.log("Transacción confirmada.");

      // Retornar un objeto de éxito
      return {
          usuarioId: usuarioId,
          estado: 'Suspendido',
          mensaje: 'Usuario suspendido exitosamente y préstamos finalizados.'
      };

  } catch (err) {
      // Si hay un error en alguna parte del proceso, revertir la transacción
      console.error("Error en el proceso de suspensión:", err);
      await db.query('ROLLBACK');
      return { error: "Error al suspender usuario y actualizar préstamos." };  // Error
  }
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
