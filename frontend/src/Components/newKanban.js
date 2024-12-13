import React from 'react';
import StatusTask from './statusTask';
import '../css/newKanban.css';

const Kanban2 = () => {
    const statuses = ['To Do', 'In Progress', 'Done'];

    return (
        <div className="kanban-container">
            {statuses.map((status, index) => (
                <StatusTask key={index} title={status} />
            ))}
        </div>
    );
};

export default Kanban2;