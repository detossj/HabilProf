import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import AuthUser from '../pageAuth/AuthUser'
import TopBar from '../components/TopBar'

const LayoutProfesor = () => {

    const { getRol } = AuthUser()
    const navigate = useNavigate()
  
    useEffect(() => {
      if(getRol() != "profesor") {
        navigate("/")
      }
    },[])

  return (
    <div>
        <div>
          <div style={{ 
              flexGrow: 1, 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', // Centra verticalmente el contenido del Outlet
              alignItems: 'center'      // Centra horizontalmente el contenido del Outlet (el formulario)
          }}></div>
          <TopBar/>
          <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default LayoutProfesor