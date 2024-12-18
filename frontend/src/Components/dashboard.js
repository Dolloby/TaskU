import React from 'react';
import NewKanban from './newKanban';
import HeaderApp from './headerApp';
import '../css/dashboard.css';

const Dashboard = () => {

    return (
        <div className="main-container">
            <div className="">
                <HeaderApp />
            </div>
            <div className="content">
                <NewKanban />
            </div>
        </div>
    );
}

export default Dashboard;