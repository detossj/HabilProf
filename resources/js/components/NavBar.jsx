import React from 'react'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
        <div className="container">
        <a className="navbar-brand" href="/">HABILPROF</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Inicio</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">LISTADOS</a>
            </li>
            </ul>
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
            <a className="nav-link" href="/login" >Login</a>
            </li>
            </ul>
        </div>
        </div>
    </nav>
  )
}

export default NavBar