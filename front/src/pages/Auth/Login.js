import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí va la lógica para autenticar con el backend.
    // Por ahora simulamos que el usuario se logea correctamente.
    if (username && password) {
      localStorage.setItem("auth", "true"); // Simular sesión guardada
      navigate("/books"); // Redirige al listado de libros después del login
    } else {
      alert("Por favor, ingrese usuario y contraseña.");
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
        Iniciar Sesión
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
        >
          Ingresar
        </Button>
        <Typography align="center">
          ¿No tienes cuenta?{" "}
          <Button variant="text" onClick={() => navigate("/register")}>
            Regístrate
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
