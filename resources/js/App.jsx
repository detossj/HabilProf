import React from 'react'
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LayoutPublic from './layouts/LayoutPublic';
import Login from './pageAuth/Login';
import Register from './pageAuth/Register';
import LayoutAlumno from './layouts/LayoutAlumno';
import LayoutAdministrador from './layouts/LayoutAdministrador';
import LayoutProfesor from './layouts/LayoutProfesor';
import ProtectedRoutes from './pageAuth/ProtectedRoutes';
import PublicRoutes from './pageAuth/PublicRoutes';
import CreateEnablement from './pageadmin/CreateEnablement';
import UpdateDeleteEnablement from './pageadmin/UpdateDeleteEnablement';
import ListEnablement from './pageadmin/ListEnablement';
import IngresoHabilitacion from './pageAuth/CreateHabilitacion';



const App = () => {
  return (
    <Router>
      <Routes>

      {/* Rutas públicas */}
      <Route element={<PublicRoutes/>}>

        <Route path="/" element={<LayoutPublic/>}>

          <Route index element={<Login/>} />

          <Route path='/register' element={ <Register/>} />

        </Route>

      </Route>

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoutes/>}>

          <Route path="/admin" element={<LayoutAdministrador/>}>
            <Route index element={<Navigate to="create" replace />} />
            <Route path="create" element={<CreateEnablement />} />
            <Route path="ingreso-habilitacion" element={<IngresoHabilitacion/>} />
            <Route path='updatedelete' element={ <UpdateDeleteEnablement/> }/>
            <Route path='list' element={ <ListEnablement/> }/>

          </Route>

          <Route path="/alum" element={<LayoutAlumno/>}>
            
          </Route>

          <Route path="/prof" element={<LayoutProfesor/>}>
            
          </Route>

        </Route>
      
      </Routes>
    </Router>
  )
}

export default App
if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"));

    Index.render(
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    )
}
