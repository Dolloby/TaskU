import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../css/profile.css';
import apiRoutes from "./apiRoutes";
// import Sidebar from "./sidebar";

const Profile = () => {
    const [errores, setErrores] = useState('');
    const [user, setUser] = useState(null);
    const navegar = useNavigate();
    const logout = () => {
        localStorage.clear();
        navegar("/"); 
    }
    const changePassword = () => {
        navegar("/change-password"); // Ruta para el componente de edici&oacute;n
    };

    const editProfile = () => {
        navegar("/edit-profile"); // Ruta para el componente de edici&oacute;n
    };
    useEffect(
        () => {
            getProfile();
        }, []
    );
    const getProfile = async() => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: {
                'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
            }
        };
        setErrores('');
        try {
            const res = await axios.get(apiRoutes.profile, config);
            setUser(res.data);
        }
        catch(error){
                setErrores('Acceso denegado, intentar nuevamente');
                console.log(error);
            }
    };
    
    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-sidebar">
                    <h3>AppPedidos</h3>
                    <ul>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/profile">Perfil</a></li>
                        <li><a href="/orders">Pedidos</a></li>
                        <li><a href="/board">Tablero</a></li>
                        <li><a href="/dashboard" onClick={logout}>Salir</a></li>
                    </ul>
                </div>
                {/* <Sidebar/> */}
                <div className="profile-content">
                    {errores && <p className="error-message">{errores}</p>}
                    {user && (
                    <div className="profile-info">
                        <div className="section">
                            <h2>Informaci&oacute;n de Usuario</h2>
                            <div className="info-row">
                                <span>Nombre</span>
                                <p>{user.nombre}</p>
                            </div>
                            <div className="info-row">
                                <span>Correo</span>
                                <p>{user.correo}</p>
                            </div>
                            <div className="info-row">
                                <span>Telefono</span>
                                <p>{user.telefono}</p>
                            </div>
                            <div className="info-row">
                                <span>Direccion</span>
                                <p>{user.direccion}</p>
                            </div>
                            <button variant="outline-dark" size="sm" onClick={editProfile}>Actualizar Datos</button>
                        </div>

                        <div className="section">
                        <h2>Informaci&oacute;n de cuenta</h2>
                        <div className="info-row">
                            <span>Usuario</span>
                            <p>{user.email}</p>
                        </div>
                        <div className="info-row">
                            <span>Contrase&ntilde;a</span>
                            <p>********</p>
                        </div>
                        <button variant="outline-dark" size="sm" onClick={changePassword}>Cambiar Contrase&ntilde;a</button>
                        </div>
                    </div>
                    )}
                </div>

            </div>
        </div>
    );
    

}

export default Profile;