import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../apiFake/api'; // Certifique-se de que o caminho está correto
import  style from './Styles/Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      // Chamando o método de login da API
      const { user, token } = await api.auth.login(email, senha);

      // Exibindo informações úteis para depuração
      console.log('Usuário autenticado:', user);
      console.log('Token gerado:', token);

      // Redireciona para o Dashboard
      navigate('/Dashboard');
    } catch (error) {
      setErro(error.message || 'Erro ao fazer login');
      console.error('Erro ao autenticar:', error);
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  return (
    <div className={style["login-container"]}>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {erro && <p className="error-message">{erro}</p>}
        <div className="form-group">
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
        <div className="form-group">
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
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        <Link to="/Register" className="btn-register">Cadastrar</Link>
      </form>
    </div>
  );
}

export default Login;
