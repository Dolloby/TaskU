import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/recovery.css';

const Recovery = () => {
  const navigate = useNavigate();
  const register = () => {
      navigate("/register");
  }

  return (
    <div className="recovery-container">
      <div className="logo-container">
        Contrase&ntilde;a Olvidada
      </div>

      <form className="recovery">
        <div className="recovery-group">
          <label for="email">Email</label>
          <input type="text" id="email" name="email" placeholder="Ingresa tu email" required="" />
          <div class="underline"></div>
        </div>
        {/* <div class="input-container">
    <label for="name" class="name">Name:</label>
    <input placeholder="Enter your name" type="text" class="input">
    <div class="underline"></div>
  </div> */}

        <button className="recovery-submit-btn" type="submit">Enviar Email</button>
      </form>

      <p className="signup-link">
        No tienes cuenta?
      </p>
        <a href="/register" className="signup-link link" onClick={register}>Registrarse Ahora</a>
    </div>
  );
};

export default Recovery;
