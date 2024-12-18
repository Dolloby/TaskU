import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apiRoutes from "./apiRoutes";
import '../css/resetPassword.css';

const ResetPassword = () => {
    const { token } = useParams(); 
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const cancelar = () => {
        navigate("/");
    }

    const validarDatos = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(apiRoutes.resetPassword, { newPassword, token });
            setMessage(res.data.message);
            setTimeout(() => navigate("/"), 1000); // Redirige al login después de 1 segundos
        } catch (error) {
            setMessage(error.response?.data?.message || "Error al restablecer la contrase&ntilde;a");
        }
    };

    return (
        <div className="reset-container">
            <div className="error-container">
                {message && <p className="error-message">{message}</p>}
            </div>
            <h3>Restablecer Contrase&ntilde;a</h3>
            <form className="reset">
            <div className="reset-group">
                <label>Nueva Contrase&ntilde;a</label>
                <input 
                type="email" 
                name="newPassword" 
                placeholder="Ingresa nueva Contrase&ntilde;a" 
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}/>
                <div classname="underline"></div>
            </div>
    
            <button className="reset-submit-btn" type="submit" onClick={validarDatos}>Restablecer Contrase&ntilde;a</button>
            <button className="reset-submit-btn" type="submit" onClick={cancelar}>Cancelar Solicitud</button>
            </form>
        </div>
    );
};

export default ResetPassword;
