import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from "./pages/Services/UserContext";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EnviarDocumento from './pages/Form-Envio';
import InscricaoPrograma from './pages/InscricaoPrograma';
import StatusDocumentos from './pages/Status';
import GovernoDashboard from './pages/DashboardGoverno';
import FichaInteresse from './pages/FichaInteresse';
import DashboardGovernoII from './pages/DashboardGovernoII';
import Cronograma from './pages/Cronograma';
import PlanoAcao from './pages/PlanoAcao';
import Dados from './pages/Dados';
import GlobalButtons from './pages/Components/GlobalButtons';
import Suport from "./pages/Suport";
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Dashboard" element={<><Dashboard /><GlobalButtons /></>} />
          <Route path="/Form-Envio" element={<><EnviarDocumento /><GlobalButtons /></>} />
          <Route path="/Status" element={<><StatusDocumentos /><GlobalButtons /></>} />
          <Route path="/DashboardGoverno" element={<><GovernoDashboard /><GlobalButtons /></>} />
          <Route path="/InscricaoPrograma" element={<><InscricaoPrograma /><GlobalButtons /></>} />
          <Route path="/Dados" element={<><Dados /><GlobalButtons /></>} />
          <Route path="/PlanoAcao" element={<><PlanoAcao /><GlobalButtons /></>} />
          <Route path="/FichaInteresse" element={<><FichaInteresse /><GlobalButtons /></>} />
          <Route path="/DashboardGovernoII" element={<><DashboardGovernoII /><GlobalButtons /></>} />
          <Route path="/Suport" element={<><Suport /><GlobalButtons /></>} />
          <Route path="/Cronograma" element={<><Cronograma /><GlobalButtons /></>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
