import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from  "./pages/Services/UserContext";
import Login from './pages/Login'; // Certifique-se de que o caminho está correto
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
  const isAuthenticated = !!localStorage.getItem('token');
  console.log('Usuário autenticado:', isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  return (
    <UserProvider>
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
            <Cronograma/>
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
