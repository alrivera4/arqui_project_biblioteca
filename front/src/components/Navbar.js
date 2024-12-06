import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Gestión Biblioteca
        </Typography>
        <Button color="inherit" component={Link} to="/books">Libros</Button>
        <Button color="inherit" component={Link} to="/users">Usuarios</Button>
        <Button color="inherit" component={Link} to="/loans">Préstamos</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
