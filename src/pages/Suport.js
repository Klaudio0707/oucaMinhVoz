import React, { useState, useEffect } from "react";
import axios from "axios"; // Biblioteca para requisições HTTP
import styles from "./Styles/SuportPage.module.css";

function SupportPage() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: "", description: "" });
  const [error, setError] = useState("");

  // URL do backend no Render (substitua com a URL real do seu backend)
  const API_URL = process.env.REACT_APP_API_URL; 

  // Função para buscar os serviços existentes da API no backend online
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(API_URL);
        setServices(response.data);
      } catch (err) {
        console.error("Erro ao buscar serviços:", err);
        setError("Erro ao carregar serviços.");
      }
    };

    fetchServices();
  }, []);

  // Função para adicionar um novo serviço
  const handleAddService = async (e) => {
    e.preventDefault();
    if (!newService.name || !newService.description) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post(API_URL, newService);
      setServices((prev) => [...prev, response.data]);
      setNewService({ name: "", description: "" });
      setError(""); // Limpa o erro, se existir
    } catch (err) {
      console.error("Erro ao adicionar serviço:", err);
      setError("Erro ao adicionar serviço.");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Suporte</h1>
        <p>Adicione novos relatórios, formulários e gerencie serviços existentes.</p>
      </header>

      <main className={styles.main}>
        {/* Adicionar Serviço */}
        <section className={styles.formSection}>
          <h2>Adicionar Novo Serviço</h2>
          <form onSubmit={handleAddService} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="serviceName">Nome do Serviço:</label>
              <input
                type="text"
                id="serviceName"
                value={newService.name}
                onChange={(e) =>
                  setNewService((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Ex: Relatório Mensal"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="serviceDescription">Descrição:</label>
              <textarea
                id="serviceDescription"
                value={newService.description}
                onChange={(e) =>
                  setNewService((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Descreva o serviço."
                required
              ></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>
              Adicionar Serviço
            </button>
          </form>
          {error && <p className={styles.error}>{error}</p>}
        </section>

        {/* Lista de Serviços */}
        <section className={styles.serviceList}>
          <h2>Serviços Existentes</h2>
          <div className={styles.summary}>
            <p><strong>Total de Solicitações:</strong> {services.length}</p>
          </div>
          {services.length === 0 ? (
            <p>Nenhum serviço adicionado ainda.</p>
          ) : (
            <ul>
              {services.map((service) => (
                <li key={service._id} className={styles.serviceItem}>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default SupportPage;
