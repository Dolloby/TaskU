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
    const goback = () => {
        navegar("/");
    }
    const validarDatos=async() =>{
        if(name.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === '' || phone.trim() === '' || address.trim() === ''){
            setErrores('Todos los campos son obligatorios.');
            return false;
        }
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
                alert("Registro exitoso. Redirigiendo al inicio para logueo.");
                navegar("/");
            }, 1000);
        }

        }
        catch (error) {
            setErrores('Error al registrar Usuario, intentar nuevamente');
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
                    <input
                        type="text"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Ingresa tu Nombre" />
                </div>
                <div className="form-group">
                    <label htmlFor="text">Apellido</label>
                    <input
                        type="text"
                        id="lastname"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        placeholder="Ingresa tu Nombre" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electr&oacute;nico</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Ingresa tu correo" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contrase&ntilde;a</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa tu contrase&ntilde;a" />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Telefono</label>
                    <input
                        type="phone"
                        id="phone"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        placeholder="Ingresa tu Telefono" />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Direccion</label>
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
                    
                    <button type="button" onClick={goback}>
                        Volver
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