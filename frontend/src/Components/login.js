import React, { useState } from 'react';
import axios from 'axios';
import apiRoutes from './apiRoutes';
import '../css/login.css';
import {useNavigate} from "react-router-dom";

// Componente para iniciar sesión en la app
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errores, setErrores] = useState('');
    const navegar = useNavigate();

    const validarDatos=async() =>{
        setErrores('');
        try {
        
        const res=await axios.post(apiRoutes.login, {
            "mail": email,
            "pass": password
        });

        console.log(res);
        if(res.status === 401){
            setErrores('Acceso denegado, intentar nuevamente');
        }else{
            localStorage.setItem('access_token', res.data.token)
            // setErrores('Acceso exitoso. Redirigiendo al Dashboard');
            navegar("/dashboard");
        }

        }
        catch (error) {
            setErrores('Acceso denegado, intentar nuevamente');
        }
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-form">
                {errores && <p className="error-message">{errores}</p>}
                <h2>Bienvenido</h2>
                <p>Ingresa tus datos para acceder.</p>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electr&oacute;nico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    
                    <div className="form-actions">
                        <button type="button" onClick={validarDatos}>
                            Iniciar Sesi&oacute;n
                        </button>
                        <div className="links">
                            <a href="/register">Registrarse</a>
                            <a href="/recovery">Contrase&ntilde;a Olvidada</a>
                        </div>
                    </div>
                </form>
                </div>
                <div className="login-right">
                    <div className="image-right"></div>
                </div>
            </div>
        </div>
    );
};

export default Login;