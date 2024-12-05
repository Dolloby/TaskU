import React from "react";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {

    const navegar = useNavigate();
    const logout = () => {
        localStorage.clear();
        navegar("/"); 
    }
    return (
        <div className="profile-sidebar">
                    <h3>AppPedidos</h3>
                    <ul>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/profile">Perfil</a></li>
                        <li><a href="/orders">Pedidos</a></li>
                        <li><a href="/board">Tablero</a></li>
                        <li><a href="/dashboard" onClick={logout}>Salir</a></li>
                    </ul>
        </div>
    );
}

export default Sidebar;