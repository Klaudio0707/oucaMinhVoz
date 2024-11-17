import React from 'react';
import { Link } from 'react-router-dom';
import './dashBoard.css';  // Importando o arquivo CSS

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="link-list">
        <Link to="/Form-Envio">Enviar Documento</Link>
        <Link to="/Status">Ver Status dos Documentos</Link>
        <Link to="/Dashboard_Governo">Dashboard Governo</Link>
        <Link to="/ProgramaEquidadeForm">Inscrição</Link>
        <Link to="/Register">Cadastro</Link>
      </div>
    </div>
  );
}

export default Dashboard;
