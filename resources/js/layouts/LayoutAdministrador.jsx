import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import AuthUser from '../pageAuth/AuthUser'
import TopBar from '../components/TopBar'
import SideBar from '../pageadmin/SideBar'

import './Layout.css'; 

const LayoutAdministrador = () => {
    const { getRol } = AuthUser()
    const navigate = useNavigate()

    useEffect(() => {
        if(getRol() !== "administrador") {
            navigate("/")
        }
    }, [])

    return (
        <div className="d-flex flex-column min-vh-100 layout-administrador-contenedor" >
            <TopBar />
            <SideBar />
            <main className="flex-grow-1 d-flex flex-column justify-content-start align-items-center p-3">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default LayoutAdministrador