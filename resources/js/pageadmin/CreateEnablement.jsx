import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateEnablement = () => {
  const [tipo, setTipo] = useState('');
  const [formData, setFormData] = useState({
    descripcion: '',
    rut_alumno: '',
    rut_profesor_guia: '',
    titulo_proyecto: '',
    profesor_co_guia: '',
    profesor_comision: '',
    empresa: '',
    run_supervisor: '',
    semestre_inicio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logica para crear habilitacion en el backend
    };

  return (
    <div className='container d-flex justify-content-center align-items-center'>
      <div className="row">
        <div className="col-sm-9 mt-3 mb-3">
          <div className="card p-5">
            <div className="card-body">
              <form className='form-group row' onSubmit={handleSubmit}>

                {/* Tipo de habilitación */}
                <div className='col-sm-4 mb-3'>
                  <label>Tipo de habilitación</label>
                  <select className='form-control' value={tipo} onChange={(e) => setTipo(e.target.value) } >
                    <option value="">Seleccione...</option>
                    <option value="PrIng">Proyecto de Ingeniería</option>
                    <option value="PrInv">Proyecto de Investigación</option>
                    <option value="PrTut">Práctica Tutelada</option>
                  </select>
                </div>

                {/* Campos comunes */}
                <div className='col-sm-8 mb-3'>
                  <label>Descripción</label>
                  <textarea
                    className='form-control'
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                  />
                </div>

                <div className='col-sm-4 mb-3'>
                  <label>RUT alumno</label>
                  <input
                    className='form-control'
                    type='number'
                    name="rut_alumno"
                    value={formData.rut_alumno}
                    onChange={handleChange}
                  />
                </div>

                <div className='col-sm-4 mb-3'>
                  <label>RUT profesor guía</label>
                  <input
                    className='form-control'
                    type='number'
                    name="rut_profesor_guia"
                    value={formData.rut_profesor_guia}
                    onChange={handleChange}
                  />
                </div>

                <div className='col-sm-4 mb-3'>
                  <label>Semestre Inicio</label>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Ej: 2025-1'
                    name="semestre_inicio"
                    value={formData.semestre_inicio}
                    onChange={handleChange}
                  />
                </div>

                {/* Campos específicos según tipo */}
                {(tipo === 'PrIng' || tipo === 'PrInv') && (
                  <>
                    <div className='col-sm-6 mb-3'>
                      <label>Título del proyecto</label>
                      <input
                        className='form-control'
                        name="titulo_proyecto"
                        value={formData.titulo_proyecto}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-sm-6 mb-3'>
                      <label>RUT profesor co-guía (opcional)</label>
                      <input
                        className='form-control'
                        type='number'
                        name="profesor_co_guia"
                        value={formData.profesor_co_guia}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-sm-6 mb-3'>
                      <label>RUT profesor de comisión</label>
                      <input
                        className='form-control'
                        type='number'
                        name="profesor_comision"
                        value={formData.profesor_comision}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                {tipo === 'PrTut' && (
                  <>
                    <div className='col-sm-6 mb-3'>
                      <label>Nombre de la empresa</label>
                      <input
                        className='form-control'
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                      />
                    </div>
                    <div className='col-sm-6 mb-3'>
                      <label>Rut Supervisor de la empresa</label>
                      <input
                        className='form-control'
                        name="run_supervisor"
                        type='number'
                        value={formData.run_supervisor}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                <div className='btn-group mt-3'>
                  <Link to={-1} className='btn btn-secondary'>Atrás</Link>
                  <button type='submit' className='btn btn-primary'>Crear Habilitación</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEnablement;
