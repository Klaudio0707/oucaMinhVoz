import React, { useEffect, useState } from "react";
import style from "./Styles/FichaInteresse.module.css";
import api from "../apiFake/api"; // Importando a API fornecida

function FichaInteresse() {
  const [userData, setUserData] = useState(null); // Estado para armazenar os dados do usuário
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [error, setError] = useState(null); // Estado para mensagens de erro

  useEffect(() => {
    // Função para buscar os dados do usuário autenticado
    const fetchUserData = async () => {
      try {
        const user = await api.users.get();
        setUserData(user); // Armazenando os dados no estado
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro ao carregar dados: {error}</p>;
  }

  return (
    <div className={style["ficha-interesse-container"]}>
      <h1 className="title">
        Ficha de Interesse em Participar do Programa Pró-Equidade de Gênero e Raça - 7ª Edição
      </h1>
      <p className="subtitle">www.gov.br/mulheres/proequidade</p>
      <p className="contact-info">
        E-mail: programaproequidade@mulheres.gov.br | Tel: (61) 2027-3083
      </p>

      <form className="ficha-form">
        <section className="section">
          <h2 className="section-title">DADOS DA ORGANIZAÇÃO</h2>
          <p>
            <strong>Nome da Organização:</strong> {userData?.nomeEmpresa || "Não informado"}
          </p>
          <p>
            <strong>Endereço:</strong> {userData?.endereco || "Não informado"}
          </p>
          <p>
            <strong>Cidade:</strong> {userData?.cidade || "Não informado"} |{" "}
            <strong>UF:</strong> {userData?.uf || "Não informado"} |{" "}
            <strong>CEP:</strong> {userData?.cep || "Não informado"}
          </p>
          <p>
            <strong>E-mail:</strong> {userData?.email || "Não informado"}
          </p>
          <p>
            <strong>Natureza da organização:</strong> {userData?.natureza || "Não informado"}
          </p>
        </section>

        <section className="section">
          <h2 className="section-title">DADOS DA/O REPRESENTANTE LEGAL DA ORGANIZAÇÃO</h2>
          <p>
            <strong>Nome:</strong> {userData?.nomeRepresentante || "Não informado"}
          </p>
          <p>
            <strong>Cargo:</strong> {userData?.cargo || "Não informado"}
          </p>
          <p>
            <strong>Telefone:</strong> {userData?.telefone || "Não informado"}
          </p>
          <p>
            <strong>E-mail:</strong> {userData?.emailRepresentante || "Não informado"}
          </p>
        </section>

        <section className="section">
          <h2 className="section-title">DADOS DO CONTATO NA ORGANIZAÇÃO</h2>
          <label>
            Nome:
            <input type="text" className="input-field" />
          </label>
          <label>
            Cargo:
            <input type="text" className="input-field" />
          </label>
          <label>
            Telefone:
            <input type="tel" className="input-field" />
          </label>
          <label>
            E-mail:
            <input type="email" className="input-field" />
          </label>
        </section>

        <button type="submit" className="submit-button">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default FichaInteresse;

