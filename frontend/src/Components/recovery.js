import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../css/recovery.css';
import apiRoutes from "./apiRoutes";
import axios from "axios";

const Recovery = () => {
  const navigate = useNavigate();
  const register = () => {
      navigate("/register");
  }
  const [mail, setMail] = useState("");
  const [errores, setErrores] = useState("");

  const validarDatos = async (e) => {
    e.preventDefault(); // Prevenir la acción por defecto del formulario
    setErrores("");
  
    // Validación: Si el correo está vacío, se muestra el error y no se hace la solicitud
    if (!mail) {
      setErrores("Por favor, ingresa tu correo.");
      return; // Salir de la función para evitar hacer la solicitud
    }
  
    try {
      const res = await axios.post(apiRoutes.forgotPassword, {
        mail: mail
      });
  
      // Si el correo no se encuentra en la base de datos
      if (res.status === 404) {
        setErrores('Email no se encuentra registrado en el sistema');
        alert('Hubo un error al procesar la solicitud');
      } else {
        // Si la solicitud es exitosa, muestra el mensaje y redirige
        alert("Correo enviado. Revisa tu bandeja de entrada para continuar.");
        setTimeout(() => {
          navigate("/"); // Redirigir a la página principal (login)
        }, 500); // 1.5 segundos de espera antes de redirigir
      }
    } catch (error) {
      setErrores('Error al procesar la solicitud. Intenta nuevamente.');
      console.error(error);
    }
  };

  return (
    <div className="recovery-container">
      <div className="logo-container">
        {errores && <p className="error-message">{errores}</p>}
        
      </div>

      <h2>Contrase&ntilde;a Olvidada</h2>
      <form className="recovery">
        <div className="recovery-group">
          <label>Correo</label>
          <input 
            type="text" 
            id="email" 
            name="email" 
            placeholder="Ingresa tu correo" 
            onChange={(e) => setMail(e.target.value)}
            value={mail}/>
          <div classname="underline"></div>
        </div>

        <button className="recovery-submit-btn" type="submit" onClick={validarDatos}>Enviar Correo</button>
      </form>

      <p className="signup-link">
        No tienes cuenta?
      </p>
        <a href="/register" className="signup-link link" onClick={register}>Registrarse Ahora</a>
    </div>
  );
};

export default Recovery;
