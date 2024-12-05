import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import apiRoutes from './apiRoutes';
import '../css/register.css';


const Register = () => {

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [errores, setErrores] = useState('');
    const navegar = useNavigate();
    const validarDatos=async() =>{
        setErrores('');
        try {
        
        const res = await axios.post(apiRoutes.register, {
            "name": name,
            "lastname": lastName,
            "mail": email,
            "pass": password,
            "phone": phone,
            "address": address
        });
        if(res.status === 401){
            setErrores('Error al registrar Usuario, intentar nuevamente');
        }else{
            setTimeout(() =>
            {
                navegar("/");
            }, 3000);
        }

        }
        catch (error) {
            setErrores('Error al registrar Usuario, intentar nuevamente' + error);
        }
    }

    return (

    <div className="register-page">
        <div className="register-container">
            <div className="register-form">
            {errores && <p className="error-message">{errores}</p>}
            <h2>Crear Cuenta</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="text">Nombre</label>
                    <i class="ri-mail-line"></i>
                    <input
                        type="text"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Ingresa tu Nombre" />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Apellido</label>
                    <i class="ri-mail-line"></i>
                    <input
                        type="text"
                        id="lastname"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        placeholder="Ingresa tu Nombre" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electr&oacute;nico</label>
                    <i class="ri-mail-line"></i>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Ingresa tu correo" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contrase&ntilde;a</label>
                    <i class="ri-lock-line"></i>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contrase&ntilde;a" />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Telefono</label>
                    <i class="ri-mail-line"></i>
                    <input
                        type="phone"
                        id="phone"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        placeholder="Ingresa tu Telefono" />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Direccion</label>
                    <i class="ri-mail-line"></i>
                    <input
                        type="address"
                        id="address"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        placeholder="Ingresa tu direccion" />
                </div>
                <div className="form-actions">
                    <button type="button" onClick={validarDatos}>
                        Registrarse
                    </button>
                </div>
            </form>
            </div>
            <div className="register-right">
                <div className="image-right"></div>
            </div>
        </div>
    </div>
  );
};

export default Register;