import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Config from '../Config'
import AuthUser from './AuthUser'
import axios from 'axios'

import './LoginAndRegister.css'; 
import ucscLogo from '../../assets/images/Logo-UCSC-Color-Horizontal.png'; 


const Register = () => {

  const { getToken, setToken } = AuthUser()
  const [rut, setRut] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()


  useEffect(() => {
    if (getToken()) {
      navigate("/")
    }
  }, [])

  const submitRegister = async (e) => {
    e.preventDefault();
  
    if (password !== passwordConfirmation) {
      setMessage("Las contraseñas no coinciden");
      return;
    }
  
    try {
      await axios.get("/sanctum/csrf-cookie");
  
      const { data } = await Config.getRegister({
        rut,
        password,
        password_confirmation: passwordConfirmation
      });
  
      if (data.success) {
        setToken(data.user, data.token, data.user.roles?.[0]?.name);
        setMessage("Cuenta creada e iniciada correctamente!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage(
          data.errors
            ? Object.values(data.errors).flat().join(", ")
            : "Error en el registro"
        );
      }
    } catch (error) {
      console.error("Error al registrar:", error);
    
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "Error al crear cuenta");
      } else {
        setMessage("Error al crear cuenta");
      }
    }
    
  };
  
  
  return (
    <div className='container d-flex justify-content-center align-items-center'>
      <div className='col-sm-10 col-md-6 col-lg-4'>
        <div className='card shadow-lg login-card'>
          <div className='card-body d-flex flex-column align-items-center'>
            
            <div className='text-center mb-4'>
              <img 
                src={ucscLogo} 
                alt="UCSC Logo" 
                style={{ width: '150px', height: 'auto' }} 
                className='d-block mx-auto mb-3' 
              />
              <h2 className='fw-bold text-title-portal'>HabilProf</h2>
              <h2 className='fw-bold text-subtitle-portal'>Registro</h2> 
            </div>

            <div className="w-100 mb-3">
              <label className='form-label w-100 text-start login-label'>RUT</label>
              <input 
                type="text" 
                className='form-control login-input-control' 
                placeholder='Sin puntos ni dígito verificador'
                value={rut}
                onChange={(e)=>setRut(e.target.value)}
                required
              />
            </div>

            <div className="w-100 mb-4">
              <label className='form-label w-100 text-start login-label'>Contraseña</label>
              <input 
                type="password"
                className='form-control login-input-control'
                placeholder='Contraseña'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>

            <div className="w-100 mb-4">
              <label className='form-label w-100 text-start login-label'>Confirmación Contraseña</label>
              <input 
                type="password"
                className='form-control login-input-control'
                placeholder='Confirmación Contraseña'
                value={passwordConfirmation}
                onChange={(e)=>setPasswordConfirmation(e.target.value)}
                required
              />
            </div>

            <button className='btn w-100 btn-ucsc-red' onClick={submitRegister}>
              CREAR CUENTA
            </button>

            <div className='w-100 text-center mt-3'>
              <p className='d-inline'>Si ya tiene cuenta, </p>
              <a href="/" className='d-inline fw-bold text-primary text-decoration-none'>
                Inicie sesión aquí
              </a>
            </div>

            <p className='text-center mt-3 text-danger'>{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
