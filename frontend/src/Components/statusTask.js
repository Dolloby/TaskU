// StatusTask.js
import React from 'react';
import { Button } from 'react-bootstrap';
import '../css/statusTask.css';

const StatusTask = ({ status, tasks, onTaskClick, onDelete }) => {
    const statusLabels = {
        todo: 'Pendientes',
        inprogress: 'En Progreso',
        done: 'Completadas',
    };

    const colorTag = (tag) => {
        switch (tag) {
            case 'frontend':
                return '#FF9933';
            case 'backend':
                return '#0099DD';
            case 'fullstack':
                return '#127369';
            default:
                return 'gray'; // Color por defecto
        }
    };

    const formatTimeLeft = (expirationDate) => {
        const now = new Date();
        const expiration = new Date(expirationDate);
    
        const diff = expiration - now;
    
        if (diff <= 0) return 'Expirado';
    
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return `${days} d ${hours} h restantes`;
    };

    return (
        <div className="status-task">
            <h3>{statusLabels[status] || status}</h3>
            <div className="task-cards">
                {tasks.map(task => (
                    <div key={task.id} className="task-card" onClick={() => onTaskClick(task)}>
                        <span 
                            className="tag"
                            style={{ backgroundColor: colorTag(task.tag), color: 'white' }}>
                            {task.tag}</span>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <div className="card-footer">
                            <small className={formatTimeLeft(task.expirationDate) === 'Expirado' ? 'expired' : ''}>
                                {formatTimeLeft(task.expirationDate)}
                            </small>
                            <Button 
                                variant="danger"
                                size="sm"
                                onClick={() => onDelete(task.id)}
                            >
                                Eliminar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatusTask;