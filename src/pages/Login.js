import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './Services/UserContext'; // Importa o contexto do usuário
import logo from '../img/logo-ouca-minhA.png';
import Footer from './Components/Footer';
import style from './Styles/Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser(); // Obtém o método para salvar o usuário no contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');  // Limpa erros anteriores
    setLoading(true);  // Inicia o carregamento

    const apiUrl = "https://api-ouca.onrender.com/users";

    console.log("API URL:", apiUrl);  // Log para verificar se a URL está sendo carregada corretamente

    try {
      // Fazendo o GET para buscar todos os usuários
      const response = await fetch(apiUrl);  // Requisição à API
      if (!response.ok) {
        throw new Error('Erro ao carregar dados dos usuários.');
      }
      const usuarios = await response.json();

      // Procurando pelo usuário com o email e senha informados
      const usuario = usuarios.find(user => user.email === email && user.senha === senha);

      if (usuario) {
        console.log('Usuário autenticado:', usuario);

        // Armazena o usuário no contexto
        setUser(usuario);

        // Redireciona com base no tipo de usuário
        if (usuario.tipo === 'governo') {
          navigate('/DashboardGoverno');
        } else if (usuario.tipo === 'empresa') {
          navigate('/Dashboard');
        } else {
          throw new Error('Tipo de usuário desconhecido.');
        }
      } else {
        throw new Error('Email ou senha incorretos.');
      }
    } catch (error) {
      setErro(error.message || 'Erro ao fazer login. Verifique suas credenciais e tente novamente.');
      console.error('Erro ao autenticar:', error);
    } finally {
      setLoading(false);  // Finaliza o carregamento
    }
  };

  return (
    <div>
      <div className={style['login-container']}>
        <div className={style['logo-container']}>
          <img src={logo} alt="logo empresa" className={style['logo-img']} />
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
            disabled={loading || !email || !senha}  // Desabilita o botão se campos estiverem vazios
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
