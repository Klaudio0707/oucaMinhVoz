import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/dashBoard.css';  // Importando o arquivo CSS

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="link-list">
        <Link to="/Form-Envio">Enviar Documento</Link>
        <Link to="/Status">Ver Status dos Documentos</Link>
        <Link to="/DashboardGovernoII">Dashboard Governo2</Link>
        <Link to="/DashboardGoverno">Dashboard Governo</Link>
        <Link to="/ProgramaEquidadeForm">Inscrição</Link>
        <Link to="/Register">Cadastro</Link>
        <Link to="/FichaInteresse">Ficha de Interesse</Link>
        <Link to="/PlanoAcao">Plano de Ação</Link>
      </div>
    </div>
  );
}

export default Dashboard;
