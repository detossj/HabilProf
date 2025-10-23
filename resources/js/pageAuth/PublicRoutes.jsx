import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthUser from './AuthUser'

const PublicRoutes = () => {
  const { getToken, getRol } = AuthUser()

  if(getToken()) {
    // Redirige según el rol
    const rol = getRol()
    if(rol === 'administrador') return <Navigate to="/admin" />
    if(rol === 'profesor') return <Navigate to="/prof" />
    if(rol === 'alumno') return <Navigate to="/alum" />
  }

  return <Outlet />
}

export default PublicRoutes
