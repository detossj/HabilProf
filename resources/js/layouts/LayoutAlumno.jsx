import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import AuthUser from '../pageAuth/AuthUser'
import TopBar from '../components/TopBar'

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
        <TopBar/>
          <div style={{ 
              flexGrow: 1, 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', // Centra verticalmente el contenido del Outlet
              alignItems: 'center'      // Centra horizontalmente el contenido del Outlet (el formulario)
          }}></div>
          <Outlet/>
        <Footer/>
    </div>
  )
}

export default LayoutAlumno