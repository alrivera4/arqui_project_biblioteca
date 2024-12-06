import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "", email: "" });
  const navigate = useNavigate();

  const handleRegister = () => {
    // Aquí va la lógica para enviar datos al backend.
    if (form.username && form.password && form.email) {
      alert("Usuario registrado correctamente.");
      navigate("/"); // Redirige al login después del registro
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Registro de Usuario
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={2}
        width="300px"
      >
        <TextField
          label="Usuario"
          variant="outlined"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <TextField
          label="Correo Electrónico"
          type="email"
          variant="outlined"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
        >
          Registrarse
        </Button>
        <Typography align="center">
          ¿Ya tienes cuenta?{" "}
          <Button variant="text" onClick={() => navigate("/")}>
            Inicia sesión
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
