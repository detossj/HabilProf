import React, { useState } from "react";
import { Link } from "react-router-dom";

const ListEnablement = () => {
  const [tipoListado, setTipoListado] = useState("");
  const [data, setData] = useState([]);

  const registros = [
    {
      semestre: "2025-1",
      run_alumno: "12345678",
      run_profesor_guia: "11111111",
      run_profesor_co_guia: "22222222",
      run_profesor_comision: "33333333",
      run_profesor_tutor: "55555555",
      supervisor_empresa: "María Rojas",
      tipo: "PrIng",
      fecha_nota: "2025-07-10",
      nota_final: "6.3",
    },
    {
      semestre: "2025-2",
      run_alumno: "23456789",
      run_profesor_guia: "11111111",
      run_profesor_co_guia: "",
      run_profesor_comision: "44444444",
      run_profesor_tutor: "",
      supervisor_empresa: "",
      tipo: "PrInv",
      fecha_nota: "2025-12-01",
      nota_final: "5.8",
    },
  ];

  const generarListado = () => {
    if (tipoListado === "Semestral") {
      setData(registros); // Mostrar todos
    } else if (tipoListado === "Historico") {
      const historico = [
        {
          run_profesor: "11111111",
          semestre: "2025-1",
          guiados: "12345678",
          co_guiados: "22222222",
          comisiones: "33333333",
          tutor: "-",
        },
        {
          run_profesor: "11111111",
          semestre: "2025-2",
          guiados: "23456789",
          co_guiados: "-",
          comisiones: "44444444",
          tutor: "-",
        },
        {
          run_profesor: "55555555",
          semestre: "2025-1",
          guiados: "-",
          co_guiados: "-",
          comisiones: "-",
          tutor: "34567890",
        },
      ];
      setData(historico);
    } else {
      setData([]);
    }
  };

  return (
    <div className="mx-auto" style={{ maxWidth: "900px", padding: "20px" }}>
      <div className="card p-4">
        <h4 className="mb-3">Listados de Habilitaciones Profesionales</h4>

        {/* Selector de tipo */}
        <div className="mb-3">
          <label>Tipo de listado</label>
          <select
            className="form-control"
            value={tipoListado}
            onChange={(e) => setTipoListado(e.target.value)}
          >
            <option value="">Seleccione...</option>
            <option value="Semestral">Semestral</option>
            <option value="Historico">Histórico</option>
          </select>
        </div>

        {/* Botones */}
        <div className="btn-group mb-4">
          <Link to={-1} className="btn btn-secondary">
            Atrás
          </Link>
          <button className="btn btn-danger" onClick={generarListado}>
            Generar listado
          </button>
        </div>

        {/* Tabla Semestral */}
        {tipoListado === "Semestral" && data.length > 0 && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Semestre</th>
                <th>RUN Alumno</th>
                <th>RUN Profesor Guía</th>
                <th>RUN Co-Guía</th>
                <th>RUN Comisión</th>
                <th>Supervisor Empresa</th>
                <th>Tipo</th>
                <th>Fecha Nota</th>
                <th>Nota Final</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i}>
                  <td>{r.semestre}</td>
                  <td>{r.run_alumno}</td>
                  <td>{r.run_profesor_guia}</td>
                  <td>{r.run_profesor_co_guia || "-"}</td>
                  <td>{r.run_profesor_comision || "-"}</td>
                  <td>{r.supervisor_empresa || "-"}</td>
                  <td>{r.tipo}</td>
                  <td>{r.fecha_nota}</td>
                  <td>{r.nota_final}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Tabla Histórico */}
        {tipoListado === "Historico" && data.length > 0 && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>RUN Profesor DINF</th>
                <th>Semestre</th>
                <th>Guiados</th>
                <th>Co-guiados</th>
                <th>Comisiones</th>
                <th>Tutor práctica</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, i) => (
                <tr key={i}>
                  <td>{r.run_profesor}</td>
                  <td>{r.semestre}</td>
                  <td>{r.guiados}</td>
                  <td>{r.co_guiados}</td>
                  <td>{r.comisiones}</td>
                  <td>{r.tutor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Mensaje cuando no hay datos */}
        {data.length === 0 && tipoListado && (
          <div className="text-center text-danger mt-3">
            No se encontraron registros
          </div>
        )}
      </div>
    </div>
  );
};

export default ListEnablement;
