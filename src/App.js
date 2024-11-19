import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'; // Certifique-se de que o caminho está correto
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EnviarDocumento from './pages/Form-Envio';
import ProgramaEquidadeForm from './pages/ProgramaEquidadeForm';
import StatusDocumentos from './pages/Status';
import GovernoDashboard from './pages/DashboardGoverno';
import FichaInteresse from './pages/FichaInteresse';
import DashboardGovernoII from './pages/DashboardGovernoII';
import PlanoAcao from './pages/PlanoAcao';
import './App.css';

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('token');
  console.log('Usuário autenticado:', isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Form-Envio"
          element={
            <ProtectedRoute>
              <EnviarDocumento />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Status"
          element={
            <ProtectedRoute>
              <StatusDocumentos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/DashboardGoverno"
          element={
            <ProtectedRoute>
              <GovernoDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ProgramaEquidadeForm"
          element={
            <ProtectedRoute>
              <ProgramaEquidadeForm />
            </ProtectedRoute>
          }
        />
         <Route
          path="/PlanoAcao"
          element={
            <ProtectedRoute>
              <PlanoAcao />
            </ProtectedRoute>
          }
        />
         <Route
          path="/FichaInteresse"
          element={
            <ProtectedRoute>
              <FichaInteresse />
            </ProtectedRoute>
          }
        />
         <Route
          path="/DashboardGovernoII"
          element={
            <ProtectedRoute>
              <DashboardGovernoII />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
