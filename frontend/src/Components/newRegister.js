import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import apiRoutes from './apiRoutes';
import { useForm } from "react-hook-form";
import '../css/register.css';


const Newregister = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");

    // const [name, setName] = useState('');
    // const [lastname, setLastName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [phone, setPhone] = useState('');
    // const [address, setAddress] = useState('');
    const [errores, setErrores] = useState('');
    const navegar = useNavigate();
    const validarDatos=async(data) =>{
        setErrores('');
        try {
        
        const res = await axios.post(apiRoutes.register, {
            "name": data.name,
            "lastname": data.lastname,
            "mail": data.email,
            "pass": data.password,
            "phone": data.phone,
            "address": data.address
        });
        console.log(res);
        if(res.status === 401){
            setErrores('Error al registrar Usuario, intentar nuevamente');
        }else{
            setTimeout(() =>
            {
                navegar("/");
            }, 3014);
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
                <form className="form-register" onSubmit={handleSubmit(validarDatos)}>
                    <div className="register-flex">
                        <div className="form-group">
                            <label>
                                <input
                                    type="text"
                                    id="name"
                                    className="input"
                                    placeholder="" 
                                    { ... register("name", {
                                        required: {
                                            value: true,
                                            message: "El campo nombre es obligatorio"
                                        },
                                })}/>
                                <span>Nombre</span>							
                            </label>
                            {errors.name && <span>{errors.name.message}</span>}
                        </div>
                        <div className="form-group">
                            <label>
                            <input
                                type="text"
                                id="lastname"
                                className="input"		
                                placeholder="Ingresa tus Apellidos"
                                { ... register("lastname", {
                                    required: {
                                        value: true,
                                        message: "El campo nombre es obligatorio"
                                    },
                                })}/>
                                <span>Apellidos</span>
                            </label>
                            {errors.name && <span>{errors.name.message}</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electr&oacute;nico</label>
                        <input
                            type="email"
                            id="email"

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
                            id="password"
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
                    <div className="form-group">
                        <label>Confirmar Contraseña</label>
                        <input
                            type="password"
                            placeholder="Confirma tu contraseña"
                            {...register("confirmPassword", {
                                required: {
                                        value: true,
                                        message: "El campo confirmar contrase&ntilde;a es obligatorio",
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "La contraseña debe tener al menos 6 caracteres"
                                    },
                                    validate: (value) =>
                                    value === password || "Las contraseñas no coinciden",
                            })}
                            />
                        {errors.confirmPassword && (<span className="error">{errors.confirmPassword.message}</span>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Telefono</label>
                        <input
                            type="phone"
                            id="phone"
                            placeholder="Ingresa tu Telefono" required
                            {...register("phone", {
                                required: {
                                        value: true,
                                        message: "El campo telefono es requerido"
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "El telefono debe tener al menos 10 caracteres"
                                    }
                                })}/>
                        {errors.phone && <span>{errors.phone.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Direccion</label>
                        <input
                            type="address"
                            id="address"

                            placeholder="Ingresa tu direccion" required
                            {...register("address", {
                                required: {
                                        value: true,
                                        message: "El campo direccion es requerido"
                                    }
                                })}/>
                        {errors.address && <span>{errors.address.message}</span>}
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

export default Newregister;