import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../img/logo-ouca-minhA.png';
import Footer from './Components/Footer';
import style from './Styles/Login.module.css';

function Login() {
  const navigate = useNavigate();

  // Redireciona o usuário diretamente para o dashboard
  const handleRedirect = () => {
    navigate('/Dashboard');
  };

  return (
    <div>
      <div className={style['login-container']}>
        <div className={style['logo-container']}>
          <img src={logo} alt="Logo Ouca Minha Voz" className={style['logo-img']} />
        </div>

        {/* Botão para acessar o Dashboard diretamente */}
        <div className={style['login-form']}>
          <h2>Bem-vindo!</h2>
          <p>Clique no botão abaixo para acessar o dashboard.</p>
          <button
            type="button"
            className={style['btn-submit']}
            onClick={handleRedirect}
          >
            Ir para o Dashboard
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
