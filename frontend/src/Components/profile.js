import React, { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import '../css/profile.css';
import apiRoutes from "./apiRoutes";
import { Button, Modal } from "react-bootstrap";
import ChangePassword from "./changePassword";
import UpdateProfile from "./editProfile";
// import Sidebar from "./sidebar";

const Profile = () => {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const [errores, setErrores] = useState('');
    const [user, setUser] = useState(null);
    const navegar = useNavigate();
    const dashboard = () => {
        localStorage.clear();
        navegar("/dashboard"); 
    }
    const logout = () => {
        localStorage.clear();
        navegar("/"); 
    }

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
        <div className="profile-container">
            <header className="profile-header">
                <div className="profile-logo">TaskU!</div>
                {/* <div className="search-bar">
                    <input type="text" autocomplete="off" name="text" className="input" placeholder="Buscar Tareas"></input>
                </div> */}
                <div className="profile-group">
                    <svg viewBox="0 0 24 24" aria-hidden="true" classname="icon">
                        <g>
                        <path
                            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                        ></path>
                        </g>
                    </svg>
                    <input className="profile-input" type="search" placeholder="Search" />
                </div>
                <nav className="nav">
                    <a href="/dashbord"className='link' onClick={dashboard}>Tablero</a>
                    <a href="/profile" className='link'>Mi Perfil</a>
                    <a href="/" className='link' onClick={logout}>Salir</a>
                </nav>
            </header>
            <div className="profile-modals">
                {/* Modal para cambiar contraseña */}
                <Modal size="sm" show={showChangePassword} onHide={() => setShowChangePassword(false)} centered>
                    <Modal.Body>
                        <div className="modal-centered">
                            <ChangePassword onClose={() => setShowChangePassword(false)} />
                        </div>
                    </Modal.Body>
                </Modal>
                {/* Modal para actualizar perfil */}
                <Modal size="sm" show={showUpdateProfile} onHide={() => setShowUpdateProfile(false)} centered>
                    <Modal.Body>
                        <div className="modal-centered">
                            <UpdateProfile onClose={() => setShowUpdateProfile(false)} />
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
            <div className="profile-content">
                {errores && <p className="error-message">{errores}</p>}
                {user && (
                    <div className="profile-info">
                        <div className="profile-main">
                            <div className="profile-section">
                                <h2>Informaci&oacute;n de Usuario</h2>
                                <div className="profile-info-row">
                                    <span>Nombre</span>
                                    <p>{user.name}</p>
                                </div>
                                <div className="profile-info-row">
                                    <span>Apellido</span>
                                    <p>{user.lastname}</p>
                                </div>
                                <div className="profile-info-row">
                                    <span>Correo</span>
                                    <p>{user.mail}</p>
                                </div>
                                <div className="profile-info-row">
                                    <span>Tel&eacute;fono</span>
                                    <p>{user.phone}</p>
                                </div>
                                <div className="profile-info-row">
                                    <span>Direcci&oacute;n</span>
                                    <p>{user.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="profile-image">
                        </div>
                    </div>
                )}
                <div className="profile-buttons">
                    <div className="profile-actions">
                        <Button className="me-2" onClick={() => setShowChangePassword(true)}>
                            Cambiar Contrase&ntilde;a
                        </Button>
                        <Button className="me-2" onClick={() => setShowUpdateProfile(true)}>
                            Actualizar Perfil
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
    

}

export default Profile;