import React from 'react';
import { useNavigate } from "react-router-dom";
import Kanban from './kanban';
import '../css/dashboard.css';

const Dashboard = () => {
    
    const navigate = useNavigate();
    const profile = () => {
        navigate("/profile");
    }
    const logout = () => {
        localStorage.clear();
        navigate("/"); 
    }
    return (
        <div className="main-container">
            <header className="header">
                <div className="logo">TaskU!</div>
                {/* <div className="search-bar">
                    <input type="text" autocomplete="off" name="text" className="input" placeholder="Buscar Tareas"></input>
                </div> */}
                <div className="group">
                    <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
                        <g>
                        <path
                            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                        ></path>
                        </g>
                    </svg>
                    <input className="input" type="search" placeholder="Search" />
                </div>
                <nav className="nav">
                    <a href="/dashbord">Tablero</a>
                    <a href="/profile" className='link' onClick={profile}>Mi Perfil</a>
                    <a href="/" className='link' onClick={logout}>Salir</a>
                </nav>
            </header>
            <div className="content">
                <Kanban />
            </div>
        </div>
    );
}

export default Dashboard;