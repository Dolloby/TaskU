import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import apiRoutes from './apiRoutes';
import StatusTask from '../Components/statusTask';
import Sidebar from '../Components/sidebar';
import TaskModal from '../Components/taskModal';
import CreateTask from './createTask';
import '../css/newKanban.css';

const NewKanban = () => {
    const [tasksByStatus, setTasksByStatus] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const statuses = useMemo(() => ['todo', 'inprogress', 'done'], []);

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("access_token");
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const responses = await Promise.all(
                statuses.map(status =>
                    axios.get(`${apiRoutes.getStatus}/${status}`, config)
                )
            );

            const tasksByStatus = responses.reduce((acc, response, index) => {
                acc[statuses[index]] = response.data;
                return acc;
            }, {});

            setTasksByStatus(tasksByStatus);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                return [];
            }else {
            setError("Error al cargar las tareas.");
            }
        } finally {
            setLoading(false);
        }
    }, [statuses]);


    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const deleteTask = async (taskId) => {
        try {
            const token = localStorage.getItem("access_token");
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const url = `${apiRoutes.deleteTask}/${taskId}`; 
            const res = await axios.delete(url, config);
            console.log("Respuesta del servidor:", res.data);
            fetchTasks();
        } catch (err) {
            console.error("Error al eliminar la tarea:", err);
        }
    };

    const openTaskModal = (task) => {
        setSelectedTask(task);
        setShowModal(true);
        setShowCreateTaskModal(true); //
    };

    const closeModal = () => {
        setSelectedTask(null);
        setShowModal(false);
        setShowCreateTaskModal(false); //
    };

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="kanban-block">
            <div className="kanban-container">
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    statuses.map(status => (
                        <StatusTask
                            key={status}
                            status={status}
                            tasks={tasksByStatus[status] || []}
                            onDelete={deleteTask}
                            onTaskClick={openTaskModal}
                        />
                        
                    ))
                )}
            </div>
            <Sidebar />
            <TaskModal
                show={showModal}
                task={selectedTask}
                statuses={statuses}
                onClose={closeModal}
            />
            {showCreateTaskModal && (
            <CreateTask
                show={() => {
                    setShowCreateTaskModal(false); // Cierra el modal después de crear la tarea
                }}
                onTaskCreated={() => {
                    fetchTasks();  // Refresca las tareas después de crear
                }}
                onClose={() => setShowCreateTaskModal(false)}  // Cierra el modal manualmente
            />
        )}
        </div>
    );
};

export default NewKanban;