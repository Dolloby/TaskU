import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/kanban.css';


const Kanban = () => {
    const [tasks, setTasks] = useState([
    { id: 1, title: 'Tarea 1', description: 'Lorem Ipsum', progress: 20, tag: 'Interfaz', status: 'Para Hacer' },
    { id: 2, title: 'Tarea 2', description: 'Lorem Ipsum', progress: 40, tag: 'Backend', status: 'En Progreso' },
    { id: 3, title: 'Tarea 2', description: 'Lorem Ipsum', progress: 40, tag: 'Backend', status: 'En Progreso' },
    { id: 4, title: 'Tarea 3', description: 'Lorem Ipsum', progress: 60, tag: 'Frontend', status: 'Hecho' }
    ]);

    const statuses = ['Para Hacer', 'En Progreso', 'Hecho'];

    const navigate = useNavigate();
    const createTask = () => {
        navigate("/create-task");
    }

    const addCard = () => {
        const newCard = {
            id: tasks.length + 1,
            title: 'Nueva tarea',
            description: 'Descripcion de la tarea',
            progress: 0,
            tag: 'Etiqueta',
            status: 'Para Hacer',
        };
        setTasks([...tasks, newCard]);
    };

    return (
        <div className="kanban-board">
            {statuses.map(status => (
            <div
                key={status}
                className="kanban-column"
            >
            <h3>{status}</h3>
                {tasks.filter(task => task.status === status).map(task => (
                <div key={task.id} className="kanban-card">
                    <div className="kanban-info">
                        <p className="kanban-tag">{task.tag}</p>
                        <p className="kanban-title">{task.title}</p>
                        <p>{task.description}</p>
                    </div>
                    <div className="kanban-footer">
                        <div className="kanban-progress-loader">
                            <div className="kanban-progress"></div>
                        </div>
                    </div>
                </div>
                ))}
            {status === 'Para Hacer' && (
                <button className="add-card-button" onClick={createTask}>+ Agregar Tarea</button>
            )}
            <button className="add-card-button" onClick={addCard}>+ Agregar Tarea</button>
            </div>
        ))}
        </div>
    );
};

export default Kanban;