import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutPublic = () => {
  return (

    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f8f9fa'
    }}>
      <Outlet />
    </div>
  
  )
}

export default LayoutPublic
