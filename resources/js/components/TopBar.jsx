import React from 'react'
import ucscLogo from '../../assets/images/Logo-UCSC-Color-Horizontal.png'; 
import AuthUser from '../pageAuth/AuthUser';

const TopBar = () => {
    // Nombre de usuario fijo para el ejemplo
    const {getUser, getLogout} = AuthUser()
    const user = getUser();
    const userName = user ? user.name : '';
    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm">
            <div className="container-fluid"> 
                {/* Sección del Logo (Izquierda) */}
                <a className="navbar-brand d-flex align-items-center" href="/">
                    {/* Texto UCSC como placeholder del logo */}
                    <img 
                        src={ucscLogo} 
                        alt="UCSC Logo" 
                        style={{ width: '150px', height: 'auto' }} 
                        className='d-block mx-auto' 
                    />
                </a>

                {/* Sección del Usuario (Derecha) */}
                <ul className="navbar-nav ms-auto d-flex align-items-center">
                    {/* Ícono de Horario */}
                    <li className="nav-item">
                        <a className="nav-link" href="#" title="Horario">
                            {/* Placeholder para el ícono de Horario */}
                            <i className="bi bi-calendar-check" style={{ fontSize: '1.2rem' }}></i> 
                        </a>
                    </li>
                    
                    {/* Nombre del Usuario */}
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