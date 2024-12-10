import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apiRoutes from "./apiRoutes";

const ResetPassword = () => {
    const { token } = useParams(); 
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(apiRoutes.resetPassword, { newPassword, token });
            setMessage(res.data.message);
            setTimeout(() => navigate("/"), 3000); // Redirige al login después de 3 segundos
        } catch (error) {
            setMessage(error.response?.data?.message || "Error al restablecer la contrase&ntilde;a");
        }
    };

    return (
        <div className="reset-password-page">
            <h2>Restablecer Contrase&ntilde;a</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nueva Contraseña</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Restablecer Contrase&ntilde;a</button>
            </form>
        </div>
    );
};

export default ResetPassword;
