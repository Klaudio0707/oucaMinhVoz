import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'; // Certifique-se de que o caminho está correto
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EnviarDocumento from './pages/Form-Envio';
import ProgramaEquidadeForm from './pages/ProgramaEquidadeForm';
import StatusDocumentos from './pages/Status';
import GovernoDashboard from './pages/Dashboard_Governo';
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
          path="/Dashboard_Governo"
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
      </Routes>
    </Router>
  );
}

export default App;
