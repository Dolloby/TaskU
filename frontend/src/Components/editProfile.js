import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import apiRoutes from "./apiRoutes";
import "../css/editProfile.css";

const EditProfile = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [errores, setErrores] = useState("");
  const navegar = useNavigate();

  const handleSave = async () => {
    const token = localStorage.getItem("access_token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.put(apiRoutes.profile, { nombre, correo }, config);
      navegar("/profile");
    } catch (error) {
      setErrores("Error al actualizar el perfil.");
    }
  };

  return (
    <div className="edit-profile">
      <h1>Edit Profile</h1>

      {errores && <p className="error-message">{errores}</p>}

      <div className="edit-form">
        <label>
          Name
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Enter your name"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Enter your email"
          />
        </label>
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default EditProfile;