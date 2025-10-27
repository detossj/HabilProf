import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Config from '../Config'
import AuthUser from './AuthUser'
import axios from 'axios'

import './LoginAndRegister.css'; 
import ucscLogo from '../../assets/images/Logo-UCSC-Color-Horizontal.png'; 

/**
 * normalizeIdentifier: convierte cualquier entrada a una cadena "base"
 * - quita puntos, guiones y espacios
 * - pasa a minúsculas
 * - si es número (o string numérico) lo deja como dígitos
 */
const normalizeIdentifier = (v) => {
  if (v === undefined || v === null) return ""
  const s = String(v)
  return s.toLowerCase().replace(/[^0-9k]/g, "")
}

/**
 * checkRutExists: revisa ambos JSON y retorna { exists, type, record }
 * - type: 'alumno' | 'profesor' | null
 * - record: objeto encontrado (o null)
 */

const checkRutExists = async (inputRut) => {
  try {
    // Cargar ambos JSON
    const [profResp, alumResp] = await Promise.all([
      fetch('https://facuna-m.github.io/Mock-UCSC/registros_profesores.json'),
      fetch('https://facuna-m.github.io/Mock-UCSC/registros_alumnos.json')
    ]);

    const [profData, alumData] = await Promise.all([
      profResp.ok ? profResp.json() : null,
      alumResp.ok ? alumResp.json() : null
    ]);

    
  console.log(profResp)

    if (!profData && !alumData) throw new Error("No se pudieron cargar los registros");

    const cleanInput = normalizeIdentifier(inputRut);

    // === ALUMNOS ===
    const alumnosArr = alumData.alumnos || alumData || [];
    for (const alumno of alumnosArr) {
      if (normalizeIdentifier(alumno.run_alumno) === cleanInput) {
        return { exists: true, type: 'alumno', record: alumno };
      }
    }

    // === PROFESORES ===
    const tiposProfesores = [
      { tipo: 'profesor_guia', lista: profData.profesores_guia || [] },
      { tipo: 'profesor_co_guia', lista: profData.profesores_co_guia || [] },
      { tipo: 'profesor_comision', lista: profData.profesores_comision || [] },
      { tipo: 'profesor_tutor', lista: profData.profesores_tutores || [] },
    ];

    for (const grupo of tiposProfesores) {
      for (const profesor of grupo.lista) {
        // cada tipo tiene su propio campo
        const campoRun = Object.keys(profesor).find(k => k.startsWith('run_profesor'));
        if (campoRun && normalizeIdentifier(profesor[campoRun]) === cleanInput) {
          return { exists: true, type: grupo.tipo, record: profesor };
        }
      }
    }

    // No encontrado
    return { exists: false, type: null, record: null };

  } catch (error) {
    console.error("Error verificando RUT:", error);
    return { exists: false, type: null, record: null };
  }
};



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
  
    if (!rut) {
      setMessage("Ingrese su RUT / RUN");
      return;
    }
  
    setMessage("Verificando RUT...");
  
    const { exists, type, record } = await checkRutExists(rut);
  
    if (!exists) {
      setMessage("El RUT no se encuentra registrado en el sistema UCSC");
      return;
    }
  
    // === Extraer nombre y correo desde el registro ===
    const nombre =
      record?.nombre_alumno ||
      record?.nombre_profesor_co_guia ||
      record?.nombre_profesor_comision ||
      record?.nombre_profesor_guia ||
      record?.nombre_profesor_tutor ||
      "Sin nombre";
  
    const correo =
      record?.correo_alumno ||
      record?.correo_profesor_co_guia ||
      record?.correo_profesor_comision ||
      record?.correo_profesor_guia ||
      record?.correo_profesor_tutor ||
      `${rut}@ucsc.cl`;
  
    try {
      await axios.get("/sanctum/csrf-cookie");
      
      const { data } = await Config.getRegister({
        rut,
        password,
        password_confirmation: passwordConfirmation,
        roleFromRegistro: type.includes("profesor") ? "profesor" : "alumno",
        name: nombre,
        email: correo,
      });
  
      if (data.success) {
        // Guardar datos en sessionStorage
        const userRole = data.user?.roles?.[0]?.name || (type.includes("profesor") ? "profesor" : "alumno");
        setToken(data.user, data.token, userRole);
  
        // Mostrar mensaje y redirigir
        setMessage("Cuenta creada e iniciada correctamente!");
  
        setTimeout(() => {
          if (userRole === "profesor") {
            navigate("/prof");
          } else if (userRole === "alumno") {
            navigate("/alum");
          } else {
            navigate("/"); // fallback
          }
        }, 1000);
      } else {
        setMessage(
          data.errors ? Object.values(data.errors).flat().join(", ") : "Error en el registro"
        );
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      setMessage("Error al crear cuenta");
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
