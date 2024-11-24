import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Styles/Register.module.css'; // Atualizado para CSS Module

function Register() {
  const [nomeUser, setNomeUser] = useState('');
  const [nomeEnterprise, setNomeEnterprise] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nomeUser,nomeEnterprise, email, senha }),
    });
    if (response.ok) {
      localStorage.setItem('token', 'token-simulado');
      navigate('/dashboard');
    } else {
      alert('Erro no cadastro');
    }
  };

  return (
    <form className={styles["register-form"]} onSubmit={handleSubmit}>
      <h2>Cadastro</h2>
      <input
        type="text"
        value={nomeEnterprise}
        onChange={(e) => setNomeEnterprise(e.target.value)}
        placeholder="Nome da Empresa"
        required
      />
      <input
        type="text"
        value={nomeUser}
        onChange={(e) => setNomeUser(e.target.value)}
        placeholder="Nome da Usúario"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Senha"
        required
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default Register;
