-- Tabla de Bibliotecas
CREATE TABLE bibliotecas (
    biblioteca_id SERIAL PRIMARY KEY, -- Identificador único de la biblioteca.
    nombre VARCHAR(255) NOT NULL, -- Nombre de la biblioteca.
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de registro en el sistema.
    plan VARCHAR(50) NOT NULL DEFAULT 'basico', -- Plan de suscripción
    pago BOOLEAN DEFAULT FALSE,
    fecha_vencimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de vencimiento calculada en el backend.
    estado VARCHAR(50) NOT NULL DEFAULT 'activo', -- Estado inicial por defecto.
    CONSTRAINT chk_estado CHECK (estado IN ('activo', 'suspendido', 'cancelado')) -- Restricción de valores permitidos.
);


-- Tabla de Libros
CREATE TABLE libros (
    libro_id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    cantidad_disponible INT NOT NULL,
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    biblioteca_id INT NOT NULL REFERENCES bibliotecas(biblioteca_id) ON DELETE CASCADE
);

-- Tabla de Usuarios
CREATE TABLE usuarios (
    usuario_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) NOT NULL, -- Aumentado a 50 caracteres
    correo VARCHAR(150) UNIQUE NOT NULL,
    contrasenia VARCHAR(100) NOT NULL, -- Aumentado a 100 caracteres
    tipo_usuario VARCHAR(50) NOT NULL CHECK (tipo_usuario IN ('estudiante', 'profesor', 'administrador', 'bibliotecario')),
    estado VARCHAR(50) NOT NULL DEFAULT 'activo',
    biblioteca_id INT NOT NULL REFERENCES bibliotecas(biblioteca_id) ON DELETE CASCADE
);

-- Tabla de Préstamos
CREATE TABLE prestamos (
    prestamo_id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    libro_id INT NOT NULL REFERENCES libros(libro_id) ON DELETE CASCADE,
    fecha_prestamo TIMESTAMP NOT NULL,
    fecha_devolucion TIMESTAMP NOT NULL,
    estado VARCHAR(50) NOT NULL CHECK (estado IN ('activo', 'devuelto', 'retrasado', 'suspendido')),
    multa DECIMAL(10, 2) DEFAULT 0,
    biblioteca_id INT NOT NULL REFERENCES bibliotecas(biblioteca_id) ON DELETE CASCADE
);

-- Tabla de Historial de Préstamos
CREATE TABLE historial_prestamos (
    historial_id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(usuario_id),
    libro_id INT NOT NULL REFERENCES libros(libro_id),
    fecha_prestamo TIMESTAMP NOT NULL,
    fecha_devolucion TIMESTAMP,
    multa DECIMAL(10, 2),
    biblioteca_id INT NOT NULL REFERENCES bibliotecas(biblioteca_id) ON DELETE CASCADE
);

-- Tabla de Reportes
CREATE TABLE reportes (
    reporte_id SERIAL PRIMARY KEY,
    tipo_reporte VARCHAR(100) NOT NULL,
    fecha_generacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    datos JSONB NOT NULL
);

-- Tabla de Reservas 
CREATE TABLE reservas (
    reserva_id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(usuario_id),
    libro_id INT NOT NULL REFERENCES libros(libro_id),
    fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) DEFAULT 'disponible' CHECK (estado IN ('disponible', 'reservado')),
    biblioteca_id INT NOT NULL REFERENCES bibliotecas(biblioteca_id) ON DELETE CASCADE
);

-- Insertar datos de prueba
INSERT INTO bibliotecas (nombre, plan, estado)
VALUES ('Biblioteca Central', 'premium', 'activo');

-- Insertar el usuario admin con la contraseña encriptada
INSERT INTO usuarios (nombre, usuario, correo, contrasenia, tipo_usuario, biblioteca_id)
VALUES 
('Administrador', 'admin5', 'admin5@gmail.com', '$2a$10$wqbUeJIG6pHLZur37vRhoOpTJyyQDcI2sbapmakbuMjJv9Bzype4q', 'administrador', 1);

