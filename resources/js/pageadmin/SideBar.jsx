import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className="pt-3 mt-5">
      <div className=" list-group list-group-horizontal justify-content-center">
        <NavLink
          to="/admin/create"
          className={({ isActive }) =>
            isActive ? "list-group-item active" : "list-group-item"
          }
        >
          Crear Habilitación
        </NavLink>

        <NavLink
          to="/admin/updatedelete"
          className={({ isActive }) =>
            isActive ? "list-group-item active" : "list-group-item"
          }
        >
          Actualizar o Eliminar
        </NavLink>

        <NavLink
          to="/admin/list"
          className={({ isActive }) =>
            isActive ? "list-group-item active" : "list-group-item"
          }
        >
          Listar Habilitaciones
        </NavLink>
      </div>
    </div>
  )
}

export default SideBar
