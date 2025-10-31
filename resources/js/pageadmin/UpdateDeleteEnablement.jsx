import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UpdateDeleteEnablement = () => {
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

                <div className="col-sm-12 mb-3">
                  <label>RUN alumno</label>
                  <input
                    className="form-control"
                    type="number"
                    name="run_alumno"
                    value={formData.run_alumno}
                    onChange={handleChange}
                  />
                  <button className='btn btn-primary'>Buscar</button>
                </div>

                

                {/* Botones */}
                <div className="btn-group mt-3">
                  <Link to={-1} className="btn btn-secondary">Atrás</Link>
                  <button type="submit" className={'btn btn-danger'}>
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