import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from '../Styles/GlobalButtons.module.css';

function GlobalButtons() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear(); // Limpa todos os dados de autenticação
    navigate('/');  // Redireciona para a página de login
  };

  // Ocultar botões na página de login
  if (location.pathname === '/Login') {
    return null;
  }

  return (
    <div className={style["buttons-container"]}>
      <button onClick={() => navigate(-1)} className={style["back-button"]}>
        Voltar
      </button>
      <button onClick={handleLogout} className={style["logout-button"]}>
        Logout
      </button>
    </div>
  );
}

export default GlobalButtons;
