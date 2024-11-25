import React, { useEffect, useState } from 'react';
import api from '../apiFake/api'; // Atualize o caminho conforme necessário
import styles from './Styles/Dados.module.css';

function Dados() {
  const [dadosEmpresa, setDadosEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const user = await api.users.get(); // Obtém os dados do usuário logado
        setDadosEmpresa(user);
      } catch (err) {
        setError(err.message || 'Erro ao carregar os dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.container}>
      <h2>Dados da Empresa</h2>

      {dadosEmpresa ? (
        <div className={styles.dados}>
          <p><strong>Nome do Representante:</strong> {dadosEmpresa.nomeRepresentante}</p>
          <p><strong>Email:</strong> {dadosEmpresa.email}</p>
          <p><strong>CNPJ:</strong> {dadosEmpresa.cnpj}</p>
          <p><strong>Telefone:</strong> {dadosEmpresa.telefone}</p>
          <p><strong>Nome da Empresa:</strong> {dadosEmpresa.nomeEmpresa}</p>
          <p><strong>Endereço:</strong> {dadosEmpresa.endereco}</p>

          <h3>Critérios de Participação:</h3>
          {dadosEmpresa.criterios && (
            <ul>
              {Object.entries(dadosEmpresa.criterios).map(([criterio, valor]) => (
                <li key={criterio}>
                  {criterio}: {valor ? 'Atendido' : 'Não atendido'}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p>Nenhum dado encontrado.</p>
      )}
    </div>
  );
}

export default Dados;

