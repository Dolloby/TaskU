import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import apiRoutes from './apiRoutes';
import '../css/createTask.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const CreateTask = ({ onClose, onTaskCreated  }) => {

	const [userId, setUserId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('frontend');
    const [priority, setPriority] = useState('baja');
    const [statusTask, setStatusTask] = useState('todo');
    const [errores, setErrores] = useState('');
    const navegar = useNavigate();

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

        try {
            const res = await axios.get(apiRoutes.profile, config);
            setUserId(res.data.id);
        }
        catch(error){
                setErrores('Acceso denegado, intentar nuevamente');
                console.log('Error al obtener el perfil:', error);
            }
    };

    useEffect(() => {
        if (userId) {
            // console.log('userId actualizado:', userId);
        }
    }, [userId]);

	const validateTask = async () => {
        if(title.trim() === '' || description.trim() === ''){
            setErrores('Todos los campos son obligatorios.');
            return false;
        }
        setErrores('');
        try {
            if (!userId) {
                alert('El usuario no está logueado. Por favor, vuelve a iniciar sesión.');
                return;
            }

            if (onClose && typeof onClose === 'function') {
                onClose(); // Llamamos a la función onClose pasada como prop
            } else {
                console.error('onClose no es una función');
            }
        
            const res = await axios.post(apiRoutes.addTask, {
                user_id: userId,
                title,
                description,
                tag,
                priority,
                statusTask
            });

            if(res.status === 401){
                alert('No tienes autorización para acceder a este recurso.');
                setErrores('No tienes autorización para acceder a este recurso.');
            }else{
                alert('Tarea creada exitosamente.');
                onTaskCreated(); // Llamamos a la función onTaskCreated pasada como prop si existe
                onclose();
                navegar("/dashboard");
            }

            }
            catch (error) {
                console.error('Error al obtener el perfil:', error.response || error.message);
                if (error.response && error.response.status === 404) {
                    setErrores('Endpoint no encontrado. Verifica el backend.');
                } else if (error.response && error.response.status === 401) {
                    setErrores('No tienes autorización para acceder a este recurso.');
                } else {
                    setErrores('Error inesperado. Intenta nuevamente más tarde.' + error);
                }
            }
        } 

    return (
		
		<div className="create-task-page">
			<div className="create-task-container">
				<div className="create-task-form">
				{errores && <p className="error-message">{errores}</p>}
				<h2>Crear Tarea</h2>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>T&iacute;tulo</Form.Label>
                        <Form.Control 
                            type="text" 
                            id="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="Ingresa el t&iacute;tulo de la tarea" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripci&oacute;n</Form.Label>
                        <Form.Control 
                            type="text"
                            id="description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            placeholder="Ingresa una descripci&oacute;n para la tarea" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Etiqueta</Form.Label>
                        <Form.Select name="tag" value={'frontend'} onChange={(e) => setTag(e.target.value)}>
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="fullstack">Fullstack</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Prioridad</Form.Label>
                        <Form.Select name="priority" value={'baja'} onChange={(e) => setPriority(e.target.value)}>
                            <option value="baja">Baja</option>
                            <option value="media">Media</option>
                            <option value="alta">Alta</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select name="status" value={'todo'} onChange={(e) => setStatusTask(e.target.value)}>
                            <option value="todo">Por Hacer</option>
                            <option value="inprogress">En Progreso</option>
                            <option value="done">Hecho</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="success" type="button" onClick={validateTask}>
                            Crear Tarea
                        </Button>

                    </div>
                </Form>
				</div> 
            {/* <div className="register-right">
                <div className="image-right"></div>
            </div> */}
            
        </div>
    </div>
    );
};

export default CreateTask;