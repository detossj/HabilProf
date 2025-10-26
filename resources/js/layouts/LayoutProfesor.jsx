import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import AuthUser from '../pageAuth/AuthUser'

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
        {/* Esto empuja el Footer al final y hace que se pueda centrar  */}
        <div>
          <h1>LayoutProfesor</h1>
          <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default LayoutProfesor