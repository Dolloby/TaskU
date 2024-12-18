import React, { useEffect, useState } from "react";
import axios from "axios";
import '../css/profile.css';
import apiRoutes from "./apiRoutes";
import { Button, Modal } from "react-bootstrap";
import HeaderApp from './headerApp';
import ChangePassword from "./changePassword";
import UpdateProfile from "./editProfile";

const Profile = () => {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showUpdateProfile, setShowUpdateProfile] = useState(false);
    const [errores, setErrores] = useState('');
    const [user, setUser] = useState(null);

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
            <div className="">
                <HeaderApp />
            </div>
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
                <Modal size="lg" show={showUpdateProfile} onHide={() => setShowUpdateProfile(false)} centered>
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
                        <Button className="me-2" variant="success" onClick={() => setShowChangePassword(true)}>
                            Cambiar Contrase&ntilde;a
                        </Button>
                        <Button className="me-2" variant="success" onClick={() => setShowUpdateProfile(true)}>
                            Actualizar Perfil
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
    

}

export default Profile;