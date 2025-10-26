import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const LayoutPublic = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Esto empuja el Footer al final y hace que se pueda centrar el login */}
        <div style={{ 
              flexGrow: 1, 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', // Centra verticalmente el contenido del Outlet
              alignItems: 'center'      // Centra horizontalmente el contenido del Outlet (el formulario)
          }}>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default LayoutPublic