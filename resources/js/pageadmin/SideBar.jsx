import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className="pt-3 mt-5">
      <div className="d-flex justify-content-center"> 
        <div className="btn-group">
          <NavLink
            to="/admin/create"
            className={({ isActive }) =>
              isActive ? "btn btn-danger" : "btn btn-secondary" 
            }
          >
            Crear Habilitación
          </NavLink>

          <NavLink
            to="/admin/updatedelete"
            className={({ isActive }) =>
              isActive ? "btn btn-danger" : "btn btn-secondary"
            }
          >
            Actualizar o Eliminar
          </NavLink>

          <NavLink
            to="/admin/list"
            className={({ isActive }) =>
              isActive ? "btn btn-danger" : "btn btn-secondary"
            }
          >
            Listar Habilitaciones
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default SideBar