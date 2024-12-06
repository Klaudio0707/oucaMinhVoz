import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from './Services/UserContext'; // Importa o contexto do usuário
import logo from '../img/logo-ouca-minhA.png';
import Footer from './Components/Footer';
import {Link} from "react-router-dom";
import style from './Styles/Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    const apiUrl = process.env.REACT_APP_BACKEND_URL; // URL da sua API
    const timeoutDuration = 5000;
    console.log('API URL:', apiUrl);

    // Aborta a requisição após o timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

    try {
      // Fazendo a requisição POST para login
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }), // Envia o email e senha para o backend
        signal: controller.signal,
      });

      clearTimeout(timeoutId); // Limpa o timeout

      if (!response.ok) {
        throw new Error('Email ou senha incorretos.');
      }

      const usuario = await response.json();

      console.log('Usuário autenticado:', usuario);

      // Armazena o usuário no contexto
      setUser(usuario);

      // Redireciona para o dashboard do tipo de usuário
      if (usuario.tipo === 'governo') {
        navigate('/DashboardGoverno');
      } else {
        navigate('/Dashboard');
      }

    } catch (error) {
      if (error.name === 'AbortError') {
        setErro('Tempo de resposta da API excedido. Tente novamente.');
      } else {
        setErro(error.message || 'Erro ao fazer login. Tente novamente.');
      }
      console.error('Erro ao autenticar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={style['login-container']}>
        <div className={style['logo-container']}>
          <img src={logo} alt="Logo Ouca Minha Voz" className={style['logo-img']} />
        </div>
        <form className={style['login-form']} onSubmit={handleSubmit}>
          <h2>Login</h2>

          {/* Exibe mensagens de erro */}
          {erro && <p className={style['error-message']}>{erro}</p>}

          <div className={style['form-group']}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className={style['form-group']}>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          {/* Botão de envio com estado de carregamento */}
          <button
            type="submit"
            className={style['btn-submit']}
            disabled={loading || !email || !senha} // Desabilita o botão se campos estiverem vazios
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          {/* Link para a página de registro */}
          <Link to="/Register" className={style['btn-register']}>
            Cadastrar
          </Link>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
