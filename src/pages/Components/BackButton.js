import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from '../Styles/BackButton.module.css';

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Não exibir na página de login
  if (location.pathname === '/Dashboard') {
    return null;
  }

  return (
    <button onClick={() => navigate(-1)} className={style["back-button"]}>
      Voltar
    </button>
  );
}

export default BackButton;
