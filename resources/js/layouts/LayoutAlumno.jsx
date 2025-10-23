import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import AuthUser from '../pageAuth/AuthUser'

const LayoutAlumno = () => {

    const { getRol } = AuthUser()
    const navigate = useNavigate()
  
    useEffect(() => {
      if(getRol() != "alumno") {
        navigate("/")
      }
    },[])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Esto empuja el Footer al final y hace que se pueda centrar  */}
        <div style={{ flexGrow: 1, display: 'flex' }}>
        <h1>LayoutAlumno</h1>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default LayoutAlumno