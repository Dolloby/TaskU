import React from 'react';
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import apiRoutes from './apiRoutes';

const TaskModal = ({ show, task, statuses, onClose}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");
    const [priority, setPriority] = useState("");
    const [state, setState] = useState("");
    const [errores, setErrores] = useState("");


    const saveTask = async () => {
        const token = localStorage.getItem("access_token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    
        try {
            setErrores('');
            const res = await axios.put(`${apiRoutes.updateTask}/${task.id}`, {
                "title": title,
                "description": description,
                "tag": tag,
                "priority": priority,
                "statusTask": state
                }, config);
                    alert('Información actualizada exitosamente.');
                    console.log(res);
                    onClose();        
            }
            catch (error) {
                console.error('Error al obtener la tarea:', error.response || error.message);
                if (error.response && error.response.status === 404) {
                    setErrores('Endpoint no encontrado. Verifica el backend.');
                } else if (error.response && error.response.status === 401) {
                    setErrores('No tienes autorización para acceder a este recurso.');
                } else {
                    setErrores('Error inesperado. Intenta nuevamente más tarde.' + error);
                }
            }
        }

    if (!task) {
        return null; // No renderiza nada si no hay tarea seleccionada
    }
    
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{task ? "Editar Tarea" : "Nueva Tarea"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {errores && <p className="error-message">{errores}</p>}
                {task && (
                    <Form>
                        <Form.Group controlId="formTaskTitle">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTaskDescription">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTaskTag">
                            <Form.Label>Etiqueta</Form.Label>
                            <Form.Select 
                                name="tag" 
                                value={tag} 
                                onChange={(e) => setTag(e.target.value)}>
                                    <option value="frontEnd">Frontend</option>
                                    <option value="backend">Backend</option>
                                    <option value="fullstack">Fullstack</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formTaskPriority">
                            <Form.Label>Prioridad</Form.Label>
                            <Form.Select 
                                name="priority" 
                                value={priority} 
                                onChange={(e) => setPriority(e.target.value)}>
                                    <option value="baja">Baja</option>
                                    <option value="media">Media</option>
                                    <option value="alta">Alta</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formTaskStatus">
                            <Form.Label>Estado</Form.Label>
                            <Form.Select 
                                name="state" 
                                value={state} 
                                onChange={(e) => setState(e.target.value)}>
                                    <option value="todo">Por Hacer</option>
                                    <option value="inprogress">En Progreso</option>
                                    <option value="done">Hecho</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={saveTask}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskModal;