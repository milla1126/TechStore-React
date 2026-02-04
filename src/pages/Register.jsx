import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const { confirmPassword, ...data } = formData;

    const result = await register(data);

    if (result.success) {
      alert("Usuario registrado correctamente");
      navigate("/");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="container" style={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        padding: "2rem",
        backgroundColor: "var(--color-bg-card)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-lg)"
      }}>
        <h1 style={{ textAlign: "center" }}>Únete a TechStore</h1>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input id="nombre" label="Nombre Completo" value={formData.nombre} onChange={handleChange} />
          <Input id="email" label="Correo" value={formData.email} onChange={handleChange} />
          <Input id="password" type="password" label="Contraseña" value={formData.password} onChange={handleChange} />
          <Input id="confirmPassword" type="password" label="Confirmar Contraseña" value={formData.confirmPassword} onChange={handleChange} />

          <Button type="submit">Crear Cuenta</Button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
