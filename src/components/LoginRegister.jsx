import React, { useState } from "react";
import "./LoginRegister.css";

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Todos los campos son obligatorios.");
      return;
    }

    if (isLogin) {
      // Inicio de sesión
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.username === username && storedUser.password === password) {
        localStorage.setItem("loggedIn", "true");
        setMessage(`Bienvenido ${username}`);
      } else {
        setMessage("Usuario o contraseña incorrectos.");
      }
    } else {
      // Registro
      const newUser = { username, password };
      localStorage.setItem("user", JSON.stringify(newUser));
      setMessage("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
      setIsLogin(true);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {isLogin ? "Entrar" : "Registrarse"}
        </button>
      </form>
      <p className="toggle" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
      </p>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
