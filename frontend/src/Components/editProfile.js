import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiRoutes from "./apiRoutes";
import "../css/editProfile.css";
import { Button } from "react-bootstrap";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [lastname, setlastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errores, setErrores] = useState("");
  const navegar = useNavigate();

  const validarDatos = async () => {
    const token = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      setErrores('');
      const res = await axios.put(apiRoutes.updateProfile, {
        "name": name,
        "lastname": lastname,
        "phone": phone,
        "address": address
    }, config);
    console.log(res);
    if(res.status === 500){
      alert('Error al actualizar información');
      setErrores('Error al editar el perfil del usuario');
    } else if(res.status === 404){
      alert('Endpoint no encontrado. Verifica el backend.');
      setErrores('Error al editar el perfil del usuario');
    } else{
      alert('Información actualizada exitosamente.');
      setTimeout(() =>
      {
          navegar("/profile");
      }, 500);
    }

    }
    catch (error) {
      setErrores("Error al actualizar el perfil.");
    }
  };

  return (
    <div className="edit-profile-container">
      <div>
        {errores && <p className="error-message">{errores}</p>}
        <form className="edit-profile-form">
          <p className="title">Actualizar Usuario</p>
              <div className="form-group">
                <label>Nombre</label>
                  <input
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}/>
              </div>  
              <div className="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  id="lastname"
                  onChange={(e) => setlastName(e.target.value)}
                  value={lastname}/>
              </div>
              <div className="form-group">
                <label>Tel&eacute;fono</label>
                <input
                  type="number"
                  id="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}/>
              </div>
              <div className="form-group">
                <label>Direcci&oacute;n</label>
                <input
                  type="text"
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}/>
              </div>
          <Button className="submit" variant="success" onClick={validarDatos}>Guardar</Button>
        </form>
      </div>
    </div>
    
  );
};

export default EditProfile;