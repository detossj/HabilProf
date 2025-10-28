
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Config from '../Config'
import AuthUser from './AuthUser'
import axios from 'axios'

import './LoginAndRegister.css'; 
import ucscLogo from '../../assets/images/Logo-UCSC-Color-Horizontal.png'; 

const Login = () => {

    const { getToken, setToken } = AuthUser()

    const [rut, setRut] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
  
    const navigate = useNavigate()
  
    useEffect(() => {
      if(getToken()) {
        navigate("/")
      }
    },[])
  
    const submitLogin = async (e) => {
      e.preventDefault();
      setMessage("Verificando RUT y contraseña...");
    
      try {
        await axios.get('/sanctum/csrf-cookie');
    

        const { data } = await Config.getLogin({ rut, password });
    
        if (data.success) {
          setToken(data.user, data.token, data.user.roles[0].name);
          setMessage("Inicio de sesión exitoso");

          setTimeout(() => {
            navigate("/"); 
          }, 500);
        } else {
          // Mostrar mensaje de error del backend
          setMessage(data.message || "RUT o contraseña incorrectos");
        }
      } catch (error) {
        console.error(error);
        // Si Laravel retorna 401, mostrar mensaje
        if (error.response && error.response.status === 401) {
          setMessage(error.response.data.message || "RUT o contraseña incorrectos");
        } else if (error.response && error.response.data?.message) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Error al iniciar sesión");
        }
      }
    };
    

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
                          
                            <h2 className='fw-bold text-title-portal'>
                              HabilProf
                            </h2> 
                            <h2 className='fw-bold text-subtitle-portal'>
                              Iniciar sesión
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
                                value={rut} 
                                onChange={(e)=>setRut(e.target.value)}
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
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        {/* Botón INGRESAR */}
                        <button className='btn w-100 btn-ucsc-red' onClick={submitLogin} >
                          INGRESAR
                        </button>

                        <div className='w-100 text-center mt-3'>
                          <p className='d-inline'>¿No tiene cuenta? </p>
                          <a 
                              href="/register" 
                              className='d-inline fw-bold text-primary text-decoration-none'
                          >
                              Regístrese aquí
                          </a>
                      </div>

                      <p className='text-center mt-3 text-danger'>{message}</p>
                    </div>
                </div>
            </div>
        </div>
      )
}

export default Login