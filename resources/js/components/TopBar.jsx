import React from 'react'
import ucscLogo from '../../assets/images/Logo-UCSC-Color-Horizontal.png'; 
import AuthUser from '../pageAuth/AuthUser';

const TopBar = () => {
    const {getUser, getLogout} = AuthUser()
    const user = getUser();
    const userName = user ? user.name : '';
    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm">
            <div className="container-fluid"> 
                {/* Sección del Logo (Izquierda) */}
                <a className="navbar-brand d-flex align-items-center" href="/">
                    <img 
                        src={ucscLogo} 
                        alt="UCSC Logo" 
                        style={{ width: '150px', height: 'auto' }} 
                        className='d-block mx-auto' 
                    />
                </a>

                <div className="app-title-container">
                    <h4 className="mb-0 fw-bold app-title-text" style={{
                        fontSize: '1.1rem',
                        fontWeight: '100',
                        color: '#ffffffff',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        marginBottom: '2px',
                        backgroundColor: '#dc3545',
                        padding: '4px 8px',
                        borderRadius: '7px',
                        display: 'inline-block'
                    }}>
                        HabilProf
                    </h4>
                    <small className="app-subtitle-text" style={{
                        fontSize: '0.8rem',
                        color: '#6c757d',
                        letterSpacing: '0.5px',
                        fontWeight: '400',
                        display: 'block'
                    }}>
                        Sistema de Gestión de Habilitaciones Profesionales
                    </small>
                </div>

                {/* Sección del Usuario (Derecha) */}
                <ul className="navbar-nav ms-auto d-flex align-items-center">
                    <li className="nav-item">
                        <span className="navbar-text me-3">
                            {userName}
                        </span>
                    </li>
                    
                    {/* Botón/Enlace de Cerrar Sesión */}
                    <li className="nav-item">
                        <a 
                            className="btn btn-sm btn-outline-danger me-3" 
                            onClick={getLogout}
                        >
                            Cerrar Sesión
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default TopBar