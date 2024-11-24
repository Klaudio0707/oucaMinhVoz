import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../apiFake/api';
import { useUser } from "./Services/UserContext";// Importa o contexto
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
    setErro('');
    setLoading(true);

    try {
      const { user, token } = await api.auth.login(email, senha);

      console.log('Usuário autenticado:', user);
      console.log('Token gerado:', token);

      // Armazena o usuário no contexto
      setUser(user);

      // Redireciona para a página de dados
      navigate('/Dashboard');
    } catch (error) {
      setErro(error.message || 'Erro ao fazer login. Verifique suas credenciais e tente novamente.');
      console.error('Erro ao autenticar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style['login-container']}>
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
        <button type="submit" className={style['btn-submit']} disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        {/* Link para a página de registro */}
        <Link to="/Register" className={style['btn-register']}>
          Cadastrar
        </Link>
      </form>
    </div>
  );
}

export default Login;
