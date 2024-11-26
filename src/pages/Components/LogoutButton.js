import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from '../Styles/LogoutButton.module.css';

function LogoutButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Não exibir na página de login
  if (location.pathname === '/Login') {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear(); // Limpa todos os dados de autenticação
    navigate('/'); // Redireciona para a página de login
  };

  return (
    <button onClick={handleLogout} className={style["logout-button"]}>
      Logout
    </button>
  );
}

export default LogoutButton;
