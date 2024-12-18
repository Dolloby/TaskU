import React from "react";
import CreateTask from "./createTask";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import '../css/sidebar.css';

const Sidebar = () => {
    const [showAddTask, setShowAddTask] = useState(false);

    return (
        <div className="sidebar-container">
            <Modal size="lg" show={showAddTask} onHide={() => setShowAddTask(false)} centered>
                <Modal.Body>
                    <div className="modal-centered">
                        <CreateTask onClose={() => setShowAddTask(false)} />
                    </div>
                </Modal.Body>
            </Modal>
            <div className="sidebar-column">
                <div className="sidebar-button">
                    <Button className="me-2" variant="success" onClick={() => setShowAddTask(true)}>
                        Crear Tarea
                    </Button>
                </div>

                <div className="sidebar-controls">
                    <h3>Estado</h3>
                    <Button variant="outline-dark" size="sm">Por Hacer</Button>
                    <Button variant="outline-dark" size="sm">En progreso</Button>
                    <Button variant="outline-dark" size="sm">Hecho</Button>
                </div>
                <div className="sidebar-controls">
                    <h3>Etiquetas</h3>
                    <Button variant="outline-dark" size="sm">Backend</Button>
                    <Button variant="outline-dark" size="sm">Frontend</Button>
                    <Button variant="outline-dark" size="sm">FullStack</Button>
                </div>
            </div>
            
        </div>
        
    );
}

export default Sidebar;