import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import AuthUser from '../pageAuth/AuthUser'

const LayoutAdministrador = () => {

  const { getRol } = AuthUser()
  const navigate = useNavigate()

  useEffect(() => {
    if(getRol() != "administrador") {
      navigate("/")
    }
  },[])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Esto empuja el Footer al final y hace que se pueda centrar  */}
        <div style={{ flexGrow: 1, display: 'flex' }}>
          <h1>LayoutAdministrador</h1>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default LayoutAdministrador