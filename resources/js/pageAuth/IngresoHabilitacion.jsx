import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Config from '../Config';
import AuthUser from '../components/AuthUser';
import axios from 'axios';

import './LoginAndRegister.css'; 
import ucscLogo from '../../assets/images/Logo-UCSC-Color-Horizontal.png'; 

const IngresoHabilitacion = () => {
  const { getToken } = AuthUser();
  const navigate = useNavigate();

  const [tipoHabilitacion, setTipoHabilitacion] = useState('');
  const [formData, setFormData] = useState({
    descripcion: '',
    titulo_proyecto: '',
    semestre_inicio: '',
    fecha_nota: '',
    nota_final: '',
    run_alumno: '',
    run_profesor_guia: '',
    run_profesor_co_guia: '',
    run_profesor_comision: '',
    run_profesor_tutor: '',
    run_empresa: '',
    nombre_empresa: '',
    run_supervisor: '',
    nombre_supervisor: '',
  });
  const [message, setMessage] = useState('');

  // Datos de listas
  const [alumnos, setAlumnos] = useState([]);
  const [profGuia, setProfGuia] = useState([]);
  const [profCoGuia, setProfCoGuia] = useState([]);
  const [profComision, setProfComision] = useState([]);
  const [profTutor, setProfTutor] = useState([]);
  const [supervisores, setSupervisores] = useState([]);

  // Cargar datos externos (simulación)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [al, pg, pcg, pcm, pt, sup] = await Promise.all([
          axios.get('/api/externo/alumnos'),
          axios.get('/api/externo/profesores/guias'),
          axios.get('/api/externo/profesores/co-guias'),
          axios.get('/api/externo/profesores/comision'),
          axios.get('/api/externo/profesores/tutores'),
          axios.get('/api/externo/notas'),
        ]);
        setAlumnos(al.data);
        setProfGuia(pg.data);
        setProfCoGuia(pcg.data);
        setProfComision(pcm.data);
        setProfTutor(pt.data);
        setSupervisores(sup.data);
      } catch (error) {
        console.error('Error al cargar datos externos', error);
      }
    };
    fetchData();
  }, []);

  // Manejar cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tipoHabilitacion || !formData.run_alumno) {
      setMessage('Debe seleccionar el tipo de habilitación y el alumno.');
      return;
    }

    try {
      await axios.get('/sanctum/csrf-cookie');
      const { data } = await axios.post(
        '/api/v1/habilitacion',
        {
          tipo_habilitacion: tipoHabilitacion,
          ...formData,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      if (data.success) {
        setMessage('✅ Ingreso de información para habilitación profesional exitoso');
        setTimeout(() => navigate('/admin/list'), 1500);
      } else {
        setMessage(data.message || 'Error en el ingreso de datos');
      }
    } catch (error) {
      console.error('Error al enviar formulario', error);
      setMessage(
        error.response?.data?.message ||
        'Error en el ingreso de información para habilitación profesional'
      );
    }
  };

  // Render dinámico de campos según tipo
  const renderCamposTipo = () => {
    switch (tipoHabilitacion) {
      case 'PrIng':
      case 'PrInv':
        return (
          <>
            <label className='form-label text-start w-100 login-label'>Título Proyecto</label>
            <input 
              type="text" 
              className='form-control login-input-control mb-3' 
              name='titulo_proyecto' 
              value={formData.titulo_proyecto} 
              onChange={handleChange} 
              required 
            />

            <label className='form-label text-start w-100 login-label'>Profesor Guía</label>
            <select 
              className='form-select login-input-control mb-3' 
              name='run_profesor_guia'
              value={formData.run_profesor_guia} 
              onChange={handleChange} 
              required
            >
              <option value="">Seleccione</option>
              {profGuia.map((p) => (
                <option key={p.run_profesor_guia} value={p.run_profesor_guia}>
                  {p.nombre_profesor_guia}
                </option>
              ))}
            </select>

            <label className='form-label text-start w-100 login-label'>Profesor Comisión</label>
            <select 
              className='form-select login-input-control mb-3' 
              name='run_profesor_comision'
              value={formData.run_profesor_comision} 
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              {profComision.map((p) => (
                <option key={p.run_profesor_comision} value={p.run_profesor_comision}>
                  {p.nombre_profesor_comision}
                </option>
              ))}
            </select>

            <label className='form-label text-start w-100 login-label'>Profesor Co-Guía (Opcional)</label>
            <select 
              className='form-select login-input-control mb-3' 
              name='run_profesor_co_guia'
              value={formData.run_profesor_co_guia} 
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              {profCoGuia.map((p) => (
                <option key={p.run_profesor_co_guia} value={p.run_profesor_co_guia}>
                  {p.nombre_profesor_co_guia}
                </option>
              ))}
            </select>
          </>
        );

      case 'PrTut':
        return (
          <>
            <label className='form-label text-start w-100 login-label'>Empresa</label>
            <input 
              type="text" 
              className='form-control login-input-control mb-3' 
              name='nombre_empresa' 
              value={formData.nombre_empresa} 
              onChange={handleChange} 
              required 
            />

            <label className='form-label text-start w-100 login-label'>RUN Empresa</label>
            <input 
              type="number" 
              className='form-control login-input-control mb-3' 
              name='run_empresa' 
              value={formData.run_empresa} 
              onChange={handleChange} 
              required 
            />

            <label className='form-label text-start w-100 login-label'>Supervisor</label>
            <select 
              className='form-select login-input-control mb-3' 
              name='run_supervisor'
              value={formData.run_supervisor} 
              onChange={handleChange} 
              required
            >
              <option value="">Seleccione</option>
              {supervisores.map((s) => (
                <option key={s.run_supervisor} value={s.run_supervisor}>
                  {s.nombre_supervisor}
                </option>
              ))}
            </select>

            <label className='form-label text-start w-100 login-label'>Profesor Tutor</label>
            <select 
              className='form-select login-input-control mb-3' 
              name='run_profesor_tutor'
              value={formData.run_profesor_tutor} 
              onChange={handleChange} 
              required
            >
              <option value="">Seleccione</option>
              {profTutor.map((p) => (
                <option key={p.run_profesor_tutor} value={p.run_profesor_tutor}>
                  {p.nombre_profesor_tutor}
                </option>
              ))}
            </select>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className='container d-flex justify-content-center align-items-center'>
      <div className='col-sm-10 col-md-8 col-lg-6'>
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
              <h3 className='fw-bold text-subtitle-portal'>Ingreso Habilitación Profesional</h3> 
            </div>

            <form className='w-100' onSubmit={handleSubmit}>
              
              {/* Tipo habilitación */}
              <label className='form-label text-start w-100 login-label'>Tipo de Habilitación</label>
              <select 
                className='form-select login-input-control mb-3'
                value={tipoHabilitacion}
                onChange={(e) => setTipoHabilitacion(e.target.value)}
                required
              >
                <option value="">Seleccione</option>
                <option value="PrIng">PrIng - Profesional de Ingeniería</option>
                <option value="PrInv">PrInv - Profesional de Investigación</option>
                <option value="PrTut">PrTut - Profesional de Tutoría</option>
              </select>

              {/* Alumno */}
              <label className='form-label text-start w-100 login-label'>Alumno</label>
              <select 
                className='form-select login-input-control mb-3' 
                name='run_alumno'
                value={formData.run_alumno} 
                onChange={handleChange}
                required
              >
                <option value="">Seleccione</option>
                {alumnos.map((a) => (
                  <option key={a.run_alumno} value={a.run_alumno}>
                    {a.nombre_alumno}
                  </option>
                ))}
              </select>

              {/* Campos comunes */}
              <label className='form-label text-start w-100 login-label'>Descripción</label>
              <textarea 
                className='form-control login-input-control mb-3' 
                name='descripcion' 
                rows='3'
                value={formData.descripcion} 
                onChange={handleChange}
                required
              ></textarea>

              <label className='form-label text-start w-100 login-label'>Semestre Inicio (AAAA-S)</label>
              <input 
                type="text" 
                className='form-control login-input-control mb-3' 
                name='semestre_inicio' 
                value={formData.semestre_inicio} 
                onChange={handleChange} 
                required 
              />

              {/* Campos específicos */}
              {renderCamposTipo()}

              {/* Nota y fecha */}
              <label className='form-label text-start w-100 login-label'>Nota Final</label>
              <input 
                type="number" 
                className='form-control login-input-control mb-3'
                step="0.1"
                min="1"
                max="7"
                name='nota_final' 
                value={formData.nota_final} 
                onChange={handleChange} 
              />

              <label className='form-label text-start w-100 login-label'>Fecha Nota</label>
              <input 
                type="date" 
                className='form-control login-input-control mb-4' 
                name='fecha_nota' 
                value={formData.fecha_nota} 
                onChange={handleChange}
              />

              <button className='btn w-100 btn-ucsc-red' type='submit'>
                INGRESAR HABILITACIÓN
              </button>

              {message && <p className='text-center mt-3 text-danger'>{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngresoHabilitacion;