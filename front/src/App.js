import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Navbar from "./components/Navbar";
import BookList from "./pages/Books/BookList";

const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem("auth") === "true";
  return isAuth ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rutas Privadas */}
        <Route
          path="/books"
          element={
            <PrivateRoute>
              <Navbar />
              <BookList />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
