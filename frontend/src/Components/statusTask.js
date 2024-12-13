import React from 'react';
import '../css/statusTask.css';

const StatusTask = ({ title }) => {
    return (
        <div className="status-task">
            <h2>{title}</h2>
            {/* Aquí irán las tarjetas */}
        </div>
    );
};

export default StatusTask;