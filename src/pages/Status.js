import React, { useState, useEffect } from 'react';
import styles from './Styles/status.module.css';

function StatusFormularios() {
  const [formularios, setFormularios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormularios = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5001/formularios', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar os dados dos formulários.');
        }

        const data = await response.json();
        setFormularios(data.filter(form => form.empresaId)); // Filtra apenas os formulários vinculados a empresas
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFormularios();
  }, []);

  if (loading) {
    return <p className={styles.loading}>Carregando os formulários...</p>;
  }

  if (error) {
    return <p className={styles.error}>Erro: {error}</p>;
  }

  return (
    <div className={styles['status-container']}>
      <h2 className={styles.title}>Status dos Formulários Preenchidos</h2>
      {formularios.length === 0 ? (
        <p className={styles['no-data']}>Nenhum formulário encontrado.</p>
      ) : (
        <div className={styles['formularios-list']}>
          {formularios.map((formulario, index) => (
            <div
              className={`${styles['formulario-card']} ${
                formulario.criteriosParticipacao?.every(c => c.atendido)
                  ? styles['aprovado']
                  : styles['pendente']
              }`}
              key={index}
            >
              <h3 className={styles['formulario-title']}>Empresa: {formulario.organizacao.nome}</h3>
              <p>
                <strong>Organização:</strong> {formulario.organizacao?.nome || 'N/A'}
              </p>
              <p>
                <strong>Status de Critérios:</strong>{' '}
                {formulario.criteriosParticipacao?.every(c => c.atendido)
                  ? 'Atendidos'
                  : 'Pendente'}
              </p>
              <h4 className={styles['sub-title']}>Critérios de Participação:</h4>
              <ul>
                {formulario.criteriosParticipacao?.map((criterio, idx) => (
                  <li key={idx}>
                    {criterio.descricao} -{' '}
                    <span
                      className={
                        criterio.atendido ? styles['criterio-aprovado'] : styles['criterio-pendente']
                      }
                    >
                      {criterio.atendido ? 'Atendido' : 'Não Atendido'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatusFormularios;
