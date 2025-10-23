import React from 'react';
import './Login.css'; 

import ucscLogo from '../../assets/images/Logo-UCSC-Color-Horizontal.png'; 

const Login = () => {
    return (
        <div className='container d-flex justify-content-center align-items-center' >
            <div className='col-sm-10 col-md-6 col-lg-4'>
                <div className='card shadow-lg login-card' >
                    <div className='card-body d-flex flex-column align-items-center'>
                        
                        {/* Logo y Título */}
                        <div className='text-center mb-4'>
                            <img 
                                src={ucscLogo} 
                                alt="UCSC Logo" 
                                style={{ width: '150px', height: 'auto' }} 
                                className='d-block mx-auto mb-3' 
                            />
                          
                            <h2 className='fw-bold text-portal'>
                              HabilProf
                            </h2> 
                        </div>
                        
                        {/* Campo RUT */}
                        <div className="w-100 mb-3"> 
                            <label htmlFor="rut-input" className='form-label w-100 text-start login-label'>
                              RUT
                            </label>
                            <input 
                                id="rut-input"
                                type="text" 
                                className='form-control login-input-control' 
                                placeholder='Sin puntos, ni dígito verificador' 
                                required
                            />
                        </div>
                        
                        {/* Campo Contraseña */}
                        <div className="w-100 mb-4">
                            <label htmlFor="password-input" className='form-label w-100 text-start login-label'>
                              Contraseña
                            </label>
                            <input 
                                id="password-input"
                                type="password" 
                                className='form-control login-input-control' 
                                placeholder='Contraseña' 
                                required
                            />
                        </div>
                        
                        {/* Botón INGRESAR */}
                        <button className='btn w-100 btn-ucsc-red' >
                          INGRESAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )
}

export default Login