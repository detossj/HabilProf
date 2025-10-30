import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Datos de simulación para diferentes tipos de habilitación
const mockEnablements = {
    // RUN para Proyecto de Ingeniería
    '12345678': {
        descripcion: 'Desarrollo de un sistema de recomendación avanzado.',
        tipo: 'PrIng',
        semestre_inicio: '2024-1',
        fecha_nota: '2025-01-15',
        nota_final: 6.5,
        titulo_proyecto: 'Sistema de Recomendación basado en ML',
        run_profesor_guia: '9876543-2',
        run_profesor_comision: '1122334-5',
        run_profesor_co_guia: '4455667-8',
        run_profesor_tutor: '',
        run_supervisor: '',
        empresa: ''
    },
    // RUN para Práctica Tutelada
    '99887766': {
        descripcion: 'Práctica profesional en desarrollo web full-stack.',
        tipo: 'PrTut',
        semestre_inicio: '2024-2',
        fecha_nota: '',
        nota_final: '',
        titulo_proyecto: '',
        run_profesor_guia: '3322110-9',
        run_profesor_comision: '',
        run_profesor_co_guia: '',
        run_profesor_tutor: '',
        run_supervisor: '6543210-9',
        empresa: 'Tech Solutions Ltda.',
        rut_empresa: '76543210-7', 
        nombre_supervisor: 'Juan Pérez' 
    },
};

const UpdateDeleteEnablement = () => {
    const [accion, setAccion] = useState('actualizar') // 'actualizar' | 'eliminar'
    const [foundEnablement, setFoundEnablement] = useState(false)
    const [alertMessage, setAlertMessage] = useState({ type: '', text: '' });
    const [tipo, setTipo] = useState(''); // Tipo de habilitación (PrIng, PrInv, PrTut)

    const initialFormData = {
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
        empresa: '',
        rut_empresa: '',
        nombre_supervisor: ''
    };
    const [formData, setFormData] = useState(initialFormData);


    useEffect(() => {
        if (foundEnablement && formData.tipo) {
            setTipo(formData.tipo);
        } else {
            setTipo('');
        }
    }, [foundEnablement, formData.tipo]);
    

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleTipoChange = (e) => {
        const newTipo = e.target.value;
        setTipo(newTipo);
        setFormData(prev => ({ 
            ...prev, 
            tipo: newTipo, // Actualizar 'tipo' en formData también
            // Opcional: Limpiar campos específicos al cambiar el tipo para evitar inconsistencias
            titulo_proyecto: newTipo === 'PrIng' || newTipo === 'PrInv' ? prev.titulo_proyecto : '',
            run_profesor_comision: newTipo === 'PrIng' || newTipo === 'PrInv' ? prev.run_profesor_comision : '',
            run_profesor_co_guia: newTipo === 'PrIng' || newTipo === 'PrInv' ? prev.run_profesor_co_guia : '',
            
            empresa: newTipo === 'PrTut' ? prev.empresa : '',
            run_supervisor: newTipo === 'PrTut' ? prev.run_supervisor : '',
            rut_empresa: newTipo === 'PrTut' ? prev.rut_empresa : '', // Limpiar nuevo campo
            nombre_supervisor: newTipo === 'PrTut' ? prev.nombre_supervisor : '', // Limpiar nuevo campo
        }));
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setFoundEnablement(false);
        setAlertMessage({ type: '', text: '' });

        const runSinGuion = formData.run_alumno.replace(/[^0-9kK]/g, '');

        // Simulación de búsqueda en la "base de datos"
        const foundData = mockEnablements[runSinGuion];

        if (foundData) {
            setFoundEnablement(true);
            setAlertMessage({ type: 'success', text: `Habilitación encontrada para RUN: ${runSinGuion}. Seleccione la acción.` });
            
            // Precargar el estado con los datos encontrados
            setFormData(prev => ({
                ...initialFormData, // Usar initialFormData para limpiar campos ausentes
                ...foundData,
                run_alumno: prev.run_alumno, // Mantener el RUN ingresado con el formato original (si lo tiene)
                tipo: foundData.tipo, // Asegurar que el tipo se cargue en formData
            }));

        } else {
            setFoundEnablement(false);
            setAlertMessage({ type: 'danger', text: 'Habilitación no encontrada o RUN inválido.' });
            // Si no se encuentra, solo mantenemos el RUN ingresado
            setFormData(prev => ({ ...initialFormData, run_alumno: prev.run_alumno }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!foundEnablement) {
            handleSearch(e);
            return;
        }

        // Lógica de Actualizar o Eliminar
        if (accion === 'eliminar') {
            setAlertMessage({ type: 'warning', text: `Eliminando habilitación para RUN: ${formData.run_alumno}... (Lógica de API)` });
        } else {
            setAlertMessage({ type: 'primary', text: `Actualizando habilitación para RUN: ${formData.run_alumno}... (Lógica de API)` });
        }
        // Simulación de reseteo (volver al estado de búsqueda)
        setTimeout(() => {
            setFoundEnablement(false);
            setAlertMessage({ type: 'success', text: `Operación de ${accion} finalizada. Listo para nueva búsqueda.` });
            setFormData(initialFormData);
            setAccion('actualizar');
        }, 2000);
    }

    // Determina las clases y el texto del botón principal
    const mainButtonClass = accion === 'eliminar' ? 'btn-danger' : 'btn-primary'
    const mainButtonText = accion === 'eliminar' ? 'Eliminar Habilitación' : 'Actualizar Habilitación'


    return (
        <div className="mx-auto" style={{ maxWidth: '800px', padding: '20px' }}>
            <div className="row justify-content-center">
                <div className="col-sm-12 mt-3 mb-3 d-flex justify-content-center">
                    <div className="card p-5" style={{ minWidth: '700px' }}> 
                        <div className="card-body">
                            
                            <form className='form-group row' onSubmit={foundEnablement ? handleSubmit : handleSearch}>

                                {/* ALERTAS DE ESTADO */}
                                {alertMessage.text && (
                                    <div className={`alert alert-${alertMessage.type}`} role="alert">
                                        {alertMessage.text}
                                    </div>
                                )}

                                {/* SECCIÓN DE BÚSQUEDA */}
                                <div className="col-12">
                                    <label htmlFor="runAlumnoInput">RUN alumno</label>
                                    <div className="input-group mb-4">
                                        <input
                                            id="runAlumnoInput"
                                            className="form-control"
                                            type="text"
                                            name="run_alumno"
                                            placeholder="Ingrese el RUN (ej: 12345678)"
                                            value={formData.run_alumno}
                                            onChange={handleChange}
                                            disabled={foundEnablement} 
                                        />
                                        {!foundEnablement && (
                                            <button className='btn btn-danger' type='submit'>
                                                Buscar
                                            </button>
                                        )}
                                    </div>
                                </div>
                                
                                {/* ------------------------------------------------------------- */}
                                {/* FORMULARIO DE ACTUALIZACIÓN (VISIBLE SOLO SI foundEnablement es true) */}
                                {/* ------------------------------------------------------------- */}
                                {foundEnablement && (
                                    <>
                                        {/* SELECCIÓN DE ACCIÓN (Actualizar / Eliminar) */}
                                        <div className="col-12 mb-4">
                                            <h5 className="mt-2 mb-3">Seleccionar Acción</h5>
                                            <div className="btn-group w-100" role="group">
                                                <button 
                                                    type="button" 
                                                    className={`btn ${accion === 'actualizar' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                    onClick={() => setAccion('actualizar')}
                                                >
                                                    Actualizar
                                                </button>
                                                <button 
                                                    type="button" 
                                                    className={`btn ${accion === 'eliminar' ? 'btn-danger' : 'btn-outline-danger'}`}
                                                    onClick={() => setAccion('eliminar')}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>

                                        {/* CAMPOS DEL FORMULARIO */}
                                        <h5 className="col-12 mb-3 mt-3">Datos de la Habilitación</h5>
                                        
                                        {/* 1. Tipo de habilitación */}
                                        <div className='col-md-4 mb-3'>
                                            <label>Tipo de habilitación</label>
                                            <select 
                                                className='form-control' 
                                                value={tipo} 
                                                onChange={handleTipoChange} 
                                                disabled={accion === 'eliminar'} // Solo deshabilitado si la acción es eliminar
                                            >
                                                <option value="">Seleccione...</option>
                                                <option value="PrIng">Proyecto de Ingeniería</option>
                                                <option value="PrInv">Proyecto de Investigación</option>
                                                <option value="PrTut">Práctica Tutelada</option>
                                            </select>
                                        </div>

                                        {/* 2. Descripción */}
                                        <div className='col-md-8 mb-3'>
                                            <label>Descripción</label>
                                            <textarea
                                                className='form-control'
                                                name="descripcion"
                                                value={formData.descripcion}
                                                onChange={handleChange}
                                                rows="1"
                                                disabled={accion === 'eliminar'}
                                            />
                                        </div>

                                        {/* 3. RUT profesor guía */}
                                        <div className='col-md-4 mb-3'>
                                            <label>RUT profesor guía</label>
                                            <input
                                                className='form-control'
                                                type='text'
                                                name="run_profesor_guia"
                                                value={formData.run_profesor_guia}
                                                onChange={handleChange}
                                                disabled={accion === 'eliminar'}
                                            />
                                        </div>

                                        {/* 4. Semestre Inicio */}
                                        <div className='col-md-4 mb-3'>
                                            <label>Semestre Inicio</label>
                                            <input
                                                className='form-control'
                                                type='text'
                                                placeholder='Ej: 2025-1'
                                                name="semestre_inicio"
                                                value={formData.semestre_inicio}
                                                onChange={handleChange}
                                                disabled={accion === 'eliminar'}
                                            />
                                        </div>

                                        {/* 5. Nota Final y Fecha Nota */}
                                        <div className='col-md-4 mb-3'>
                                            <label>Nota Final (Opcional)</label>
                                            <input
                                                className='form-control'
                                                type='number'
                                                step="0.1"
                                                min="1.0"
                                                max="7.0"
                                                name="nota_final"
                                                value={formData.nota_final}
                                                onChange={handleChange}
                                                disabled={accion === 'eliminar'}
                                            />
                                        </div>

                                        <div className='col-md-4 mb-3'>
                                            <label>Fecha Nota (Opcional)</label>
                                            <input
                                                className='form-control'
                                                type='date'
                                                name="fecha_nota"
                                                value={formData.fecha_nota}
                                                onChange={handleChange}
                                                disabled={accion === 'eliminar'}
                                            />
                                        </div>

                                        {/* ------------------------------------------------------------------ */}
                                        {/* CAMPOS ESPECÍFICOS SEGÚN EL TIPO DE HABILITACIÓN */}
                                        {/* ------------------------------------------------------------------ */}
                                        {(tipo === 'PrIng' || tipo === 'PrInv') && (
                                            <>
                                                <div className='col-md-6 mb-3'>
                                                    <label>Título del proyecto</label>
                                                    <input
                                                        className='form-control'
                                                        name="titulo_proyecto"
                                                        value={formData.titulo_proyecto}
                                                        onChange={handleChange}
                                                        disabled={accion === 'eliminar'}
                                                    />
                                                </div>
                                                <div className='col-md-6 mb-3'>
                                                    <label>RUT profesor co-guía (opcional)</label>
                                                    <input
                                                        className='form-control'
                                                        type='text'
                                                        name="run_profesor_co_guia"
                                                        value={formData.run_profesor_co_guia}
                                                        onChange={handleChange}
                                                        disabled={accion === 'eliminar'}
                                                    />
                                                </div>
                                                <div className='col-md-6 mb-3'>
                                                    <label>RUT profesor de comisión</label>
                                                    <input
                                                        className='form-control'
                                                        type='text'
                                                        name="run_profesor_comision"
                                                        value={formData.run_profesor_comision}
                                                        onChange={handleChange}
                                                        disabled={accion === 'eliminar'}
                                                    />
                                                </div>
                                            </>
                                        )}

                                        {tipo === 'PrTut' && (
                                            <>
                                                <div className='col-md-6 mb-3'>
                                                    <label>Nombre de la empresa</label>
                                                    <input
                                                        className='form-control'
                                                        name="empresa"
                                                        value={formData.empresa}
                                                        onChange={handleChange}
                                                        disabled={accion === 'eliminar'}
                                                    />
                                                </div>
                                                <div className='col-md-6 mb-3'>
                                                    <label>Rut Supervisor de la empresa</label>
                                                    <input
                                                        className='form-control'
                                                        type='text'
                                                        name="run_supervisor"
                                                        value={formData.run_supervisor}
                                                        onChange={handleChange}
                                                        disabled={accion === 'eliminar'}
                                                    />
                                                </div>
                                                
                                                <div className='col-md-6 mb-3'>
                                                    <label>RUT de la Empresa</label>
                                                    <input
                                                        className='form-control'
                                                        type='text'
                                                        name="rut_empresa"
                                                        value={formData.rut_empresa}
                                                        onChange={handleChange}
                                                        disabled={accion === 'eliminar'}
                                                    />
                                                </div>
                                                <div className='col-md-6 mb-3'>
                                                    <label>Nombre del Supervisor</label>
                                                    <input
                                                        className='form-control'
                                                        type='text'
                                                        name="nombre_supervisor"
                                                        value={formData.nombre_supervisor}
                                                        onChange={handleChange}
                                                        disabled={accion === 'eliminar'}
                                                    />
                                                </div>
                                                
                                            </>
                                        )}
                                    </>
                                )}
                                {/* FIN: FORMULARIO DE ACTUALIZACIÓN */}
                                
                                {/* BOTONES DE ACCIÓN (FINAL) */}
                                <div className="btn-group mt-3 w-100">
                                    <Link to={-1} className="btn btn-secondary">Atrás</Link>
                                    
                                    {/* Botón Principal (se muestra solo si foundEnablement es true) */}
                                    {foundEnablement && (
                                        <button 
                                            type="submit" 
                                            className={`btn ${mainButtonClass}`}
                                        >
                                            {mainButtonText}
                                        </button>
                                    )}
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