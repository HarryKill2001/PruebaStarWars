import React from 'react'
import iconStarWars from '../assets/darth.png'
import { Link } from 'react-router-dom'

function sidebar() {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" >
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <img src={iconStarWars} alt="" />
                </div>
                <div className="sidebar-brand-text mx-3">Star Wars</div>
            </Link>

            <hr className="sidebar-divider my-0" />

            <hr className="sidebar-divider" />

            <div className="sidebar-heading">
                Opciones
            </div>

            <li className="nav-item active">
                <Link className="nav-link" to="/laminas">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Obtener Láminas</span>
                </Link>
            </li>

            <li className="nav-item active">
                <Link className="nav-link" to="/album">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Mi Álbum</span>
                </Link>
            </li>

            <hr className="sidebar-divider" />

        </ul>
    )
}

export default sidebar
