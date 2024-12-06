import React, { useEffect, useState } from "react";
import style from "./Styles/FichaInteresse.module.css";
import Logo from "../pages/Components/Logo";
import Footer from "./Components/Footer";
import api from "../apiFake/api"; // Importando a API fornecida

function FichaInteresse() {
  const [userData, setUserData] = useState(null); // Estado para armazenar os dados do usuário
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento
  const [error, setError] = useState(null); // Estado para mensagens de erro
  const [formData, setFormData] = useState({
    nomeContato: "",
    cargoContato: "",
    telefoneContato: "",
    emailContato: "",
  }); // Estado para armazenar os dados do formulário

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar os dados do formulário para a API
      const response = await fetch(`${process.env.ENDPOINTS.USERS}/fichaInteresse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Erro ao enviar os dados.");
      }
      alert("Ficha de Interesse enviada com sucesso!");
    } catch (err) {
      alert("Erro ao enviar os dados: " + err.message);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Erro ao carregar dados: {error}</p>;
  }

  return (
    <div>
      <Logo />
      <div className={style["ficha-interesse-container"]}>
        <h1 className={style["title"]}>
          Ficha de Interesse em Participar do Programa Pró-Equidade de Gênero e Raça - 7ª Edição
        </h1>
        <p className={style["subtitle"]}>www.gov.br/mulheres/proequidade</p>
        <p className={style["contact-info"]}>
          E-mail: programaproequidade@mulheres.gov.br | Tel: (61) 2027-3083
        </p>

        <form className={style["ficha-form"]} onSubmit={handleSubmit}>
          <section className={style["section"]}>
            <h2 className={style["section-title"]}>DADOS DA ORGANIZAÇÃO</h2>
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

          <section className={style["section"]}>
            <h2 className={style["section-title"]}>DADOS DA/O REPRESENTANTE LEGAL DA ORGANIZAÇÃO</h2>
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

          <section className={style["section"]}>
            <h2 className={style["section-title"]}>DADOS DO CONTATO NA ORGANIZAÇÃO</h2>
            <label>
              Nome:
              <input
                type="text"
                className={style["input-field"]}
                name="nomeContato"
                value={formData.nomeContato}
                onChange={handleChange}
              />
            </label>
            <label>
              Cargo:
              <input
                type="text"
                className={style["input-field"]}
                name="cargoContato"
                value={formData.cargoContato}
                onChange={handleChange}
              />
            </label>
            <label>
              Telefone:
              <input
                type="tel"
                className={style["input-field"]}
                name="telefoneContato"
                value={formData.telefoneContato}
                onChange={handleChange}
              />
            </label>
            <label>
              E-mail:
              <input
                type="email"
                className={style["input-field"]}
                name="emailContato"
                value={formData.emailContato}
                onChange={handleChange}
              />
            </label>
          </section>

          <button type="submit" className={style["submit-button"]}>
            Tenho Interesse
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default FichaInteresse;
