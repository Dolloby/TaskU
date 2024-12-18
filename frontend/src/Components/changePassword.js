import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRoutes from "./apiRoutes";
import '../css/changePassword.css';
import axios from "axios";
import Button from 'react-bootstrap/Button';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [errores, setErrores] = useState("");
  const token = localStorage.getItem("access_token");
  const config = {
      headers: {
          'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
      }
    }

  const validarDatos = async (e) => {
    e.preventDefault()
    setErrores("");
    try {
      const res = await axios.post(apiRoutes.changePassword, {
          "actualPass": pass,
          "newPass": newPass
      }, config);
      console.log(res);
      if(res.status === 500){
        alert('Error al cambiar contraseña');
        setErrores('Error al cambiar contrase&ntilde;a');
      } else{
        alert('Contraseña cambiada exitosamente.');
        setTimeout(() =>
        {
          localStorage.clear();
          navigate("/");
        }, 1500);
    }

    }
    catch (error) {
        alert('Error al cambiar contraseña, intentar nuevamente');
        setErrores('Error al cambiar contrase&ntilde;a, intentar nuevamente');
    }
  }

  return (
    <div className="chgpass-container">
      <div className="logo-container">
        {errores && <p className="error-message">{errores}</p>}
        Cambio de contrase&ntilde;a
      </div>
      <form className="chgpass">
        <div className="chgpass-group">
          <label>Clave Actual</label>
          <input type="password" placeholder="Ingrese clave actual" required="" 
            onChange={(e) => setPass(e.target.value)}
            value={pass}/>
          <div classname="underline"></div>
        </div>
        <div className="chgpass-group">
          <label>Nueva Clave</label>
          <input type="password" placeholder="Ingrese clave nueva" required="" 
            onChange={(e) => setnewPass(e.target.value)}
            value={newPass}/>
          <div classname="underline"></div>
        </div>

        <Button className="chgpass-submit-btn" variant="success" type="submit" onClick={validarDatos}>Enviar</Button>
      </form>
    </div>
  );
};

export default ChangePassword;