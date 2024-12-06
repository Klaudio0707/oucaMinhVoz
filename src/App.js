import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from  "./pages/Services/UserContext";
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

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const tipoUsuario = localStorage.getItem('tipo');  // Obtém o tipo do usuário (empresa/governo)

  console.log('Usuário autenticado:', token);
  if (!token) {
    return <Navigate to="/" />;
  }

  // Se o tipo for "empresa", redireciona para o Dashboard de empresa
  if (tipoUsuario === 'empresa') {
    return <Navigate to="/Dashboard" />;
  }

  // Se o tipo for "governo", redireciona para o Dashboard de governo
  if (tipoUsuario === 'governo') {
    return <Navigate to="/DashboardGoverno" />;
  }

  return children;  // Se não for nenhum dos casos, exibe os filhos do ProtectedRoute
}

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          {/* Defina as rotas protegidas */}
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
                <GlobalButtons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Form-Envio"
            element={
              <ProtectedRoute>
                <EnviarDocumento />
                <GlobalButtons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Status"
            element={
              <ProtectedRoute>
                <StatusDocumentos />
                <GlobalButtons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/DashboardGoverno"
            element={
              <ProtectedRoute>
                <GovernoDashboard />
                <GlobalButtons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/InscricaoPrograma"
            element={
              <ProtectedRoute>
                <InscricaoPrograma />
                <GlobalButtons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Dados"
            element={
              <ProtectedRoute>
                <Dados />
                <GlobalButtons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/PlanoAcao"
            element={
              <ProtectedRoute>
                <PlanoAcao />
                <GlobalButtons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/FichaInteresse"
            element={
              <ProtectedRoute>
                <FichaInteresse />
                <GlobalButtons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/DashboardGovernoII"
            element={
              <ProtectedRoute>
                <DashboardGovernoII />
                <GlobalButtons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Suport"
            element={
              <ProtectedRoute>
                <Suport />
                <GlobalButtons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Cronograma"
            element={
              <ProtectedRoute>
                <Cronograma />
                <GlobalButtons />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

