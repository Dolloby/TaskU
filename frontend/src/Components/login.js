import React, { useState } from 'react';
import axios from 'axios';
import apiRoutes from './apiRoutes';
import '../css/login.css';
import {useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
// import Alert from 'react-bootstrap/Alert';

// Componente para iniciar sesi&oacute;n en la app
function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    // const onSubmit = event => console.log(event);
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [errores, setErrores] = useState('');
    const navegar = useNavigate();

    const validarDatos=async(data) =>{
        setErrores('');
        try {
        
        const res=await axios.post(apiRoutes.login, {
            "mail": data.email,
            "pass": data.password
        });
        console.log(res);
        if(res.status === 401){
            setErrores('Acceso denegado, intentar nuevamente' + errores);
        }else{
            localStorage.setItem('access_token', res.data.token)
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
                <form onSubmit={handleSubmit(validarDatos)}>
                    <div className="form-group">
                        <label >Correo Electr&oacute;nico</label>
                        <input
                            type="text"
                            name="email"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            placeholder="Ingresa tu correo" 
                            { ... register("email", {
                                required: {
                                    value: true,
                                    message: "El campo correo es obligatorio"
                                },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "El formato no es correcto"
                                }
                            })}/>
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div className="form-group">
                        <label>Contrase&ntilde;a</label>
                        <input
                            type="password"
                            name="password"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa tu contrase&ntilde;a" 
                            {...register("password", {
                                required: {
                                        value: true,
                                        message: "El campo contrase&ntilde;a es requerido"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "La contraseña debe tener al menos 6 caracteres"
                                    }
                                })}/>
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>
                    <div className="form-actions">
                        <button type="submit" value="submit" onClick={validarDatos}>
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