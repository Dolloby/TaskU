import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../css/recovery.css';
import apiRoutes from "./apiRoutes";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const Recovery = () => {
  const navigate = useNavigate();
  const register = () => {
      navigate("/register");
  }
  const [mail, setMail] = useState("");
  const [errores, setErrores] = useState("");

  const validarDatos = async () => {
    setErrores("");
    try {
      const res = await axios.post(apiRoutes.forgotPassword, {
        "mail": mail
      });
      if (!mail) {
        setErrores("Por favor, ingresa tu email.");
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail)) {
        setErrores("Por favor, ingresa un email válido.");
      }
      if(res.status === 404){
        setErrores('Email no se encuentra registrado en el sistema');
        toast.error('Hubo un error al procesar la solicitud');
      } else{
        toast.success( 'Hotel actualizado con Ã©xito');
        setTimeout(() =>
        {
          navigate("/");
        }, 1500);
    }

    }
    catch (error) {
        setErrores('Error al registrar Usuario, intentar nuevamente' + error);
    }
  }

  return (
    <div className="recovery-container">
      <div className="logo-container">
        {errores && <p className="error-message">{errores}</p>}
        Contrase&ntilde;a Olvidada
      </div>
      <ToastContainer />

      <form className="recovery">
        <div className="recovery-group">
          <label for="email">Correo</label>
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
