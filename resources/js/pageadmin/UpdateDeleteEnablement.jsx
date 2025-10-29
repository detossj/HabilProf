import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UpdateDeleteEnablement = () => {
  const [tipo, setTipo] = useState('')        // PrIng | PrInv | PrTut
  const [accion, setAccion] = useState('')    // actualizar | eliminar

  const [formData, setFormData] = useState({
    run_alumno: '',
    descripcion: '',
    semestre_inicio: '',
    fecha_nota: '',
    nota_final: '',
    titulo_proyecto: '',
    run_profesor_guia: '',
    run_profesor_comision: '',
    run_profesor_co_guia: '',
    run_profesor_tutor: '',
    run_supervisor: '',
    empresa: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="mx-auto" style={{ maxWidth: '800px', padding: '20px' }}>
      <div className="row">
        <div className="col-sm-12 mt-3 mb-3">
          <div className="card p-5" style={{ maxWidth: '400px' }}>
            <div className="card-body">
              <form className="form-group row" onSubmit={handleSubmit}>
                {/* Acción */}
                <div className="col-sm-12 mb-3">
                  <label>Acción</label>
                  <select className="form-control" value={accion} onChange={(e) => setAccion(e.target.value)}>
                    <option value="">Seleccione...</option>
                    <option value="actualizar">Actualizar</option>
                    <option value="eliminar">Eliminar</option>
                  </select>
                </div>

                <div className="col-sm-6 mb-3">
                  <label>RUN alumno</label>
                  <input
                    className="form-control"
                    type="number"
                    name="run_alumno"
                    value={formData.run_alumno}
                    onChange={handleChange}
                  />
                </div>

                {/* Tipo de habilitación */}
                <div className="col-sm-12 mb-3">
                  <label>Tipo de habilitación</label>
                  <select className="form-control" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="">Seleccione...</option>
                    <option value="PrIng">Proyecto de Ingeniería</option>
                    <option value="PrInv">Proyecto de Investigación</option>
                    <option value="PrTut">Práctica Tutelada</option>
                  </select>
                </div>

                {accion === 'actualizar' && (tipo === 'PrIng' || tipo === 'PrInv') && (
                  <>
                    <div className="col-sm-8 mb-3">
                      <label>Descripción</label>
                      <textarea
                        className="form-control"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-8 mb-3">
                      <label>Semestre inicio</label>
                      <input
                        className="form-control"
                        type="text"
                        name="semestre_inicio"
                        value={formData.semestre_inicio}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-8 mb-3">
                      <label>Título del proyecto</label>
                      <input
                        className="form-control"
                        name="titulo_proyecto"
                        value={formData.titulo_proyecto}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label>RUN profesor guía</label>
                      <input
                        className="form-control"
                        type="text"
                        name="run_profesor_guia"
                        value={formData.run_profesor_guia}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label>RUN profesor comisión</label>
                      <input
                        className="form-control"
                        type="text"
                        name="run_profesor_comision"
                        value={formData.run_profesor_comision}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label>RUN profesor co-guía (opcional)</label>
                      <input
                        className="form-control"
                        type="text"
                        name="run_profesor_co_guia"
                        value={formData.run_profesor_co_guia}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                {accion === 'actualizar' && tipo === 'PrTut' && (
                  <>
                    <div className="col-sm-8 mb-3">
                      <label>Descripción</label>
                      <textarea
                        className="form-control"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-8 mb-3">
                      <label>Semestre inicio</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Ej: 2025-1"
                        name="semestre_inicio"
                        value={formData.semestre_inicio}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label>RUN profesor tutor</label>
                      <input
                        className="form-control"
                        type="text"
                        name="run_profesor_tutor"
                        value={formData.run_profesor_tutor}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label>RUN supervisor</label>
                      <input
                        className="form-control"
                        type="text"
                        name="run_supervisor"
                        value={formData.run_supervisor}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label>Nombre de la empresa</label>
                      <input
                        className="form-control"
                        name="nombre_empresa"
                        value={formData.nombre_empresa}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                {accion === 'eliminar' && (
                  <div className="col-sm-12 mb-2">
                    <div className="alert alert-warning">
                      Se eliminará la habilitación del RUN indicado para el tipo seleccionado.
                    </div>
                  </div>
                )}

                {/* Botones */}
                <div className="btn-group mt-3">
                  <Link to={-1} className="btn btn-secondary">Atrás</Link>
                  <button type="submit" className={`btn ${accion === 'eliminar' ? 'btn-danger' : 'btn-primary'}`}>
                    {accion === 'eliminar' ? 'Eliminar' : 'Actualizar'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateDeleteEnablement