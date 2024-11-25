import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Styles/Register.module.css"; // Atualizado para CSS Module

function Register() {
  const [nomeRepresentante, setNomeRepresentante] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [empresaData, setEmpresaData] = useState(null); 
  // Dados retornados da consulta 
 
  const [criterios, setCriterios] = useState({
    criterio1: false,
    criterio2: false,
    criterio3: false,
    criterio4: false,
    criterio5: false,
  });
  
  const [error, setError] = useState(""); // Para exibir mensagens de erro
  const [loading, setLoading] = useState(false); // Estado de carregamento para o botão enviar

  const navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCriterios((prevCriterios) => ({
      ...prevCriterios,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpa erros prévios

    // Valida se todos os critérios foram aceitos
    if (Object.values(criterios).includes(false)) {
      setError("Você deve aceitar todos os critérios de participação.");
      return;
    }

    // Valida o CNPJ antes de enviar
    if (!cnpj || cnpj.length !== 14) {
      setError("Informe um CNPJ válido.");
      return;
    }

    try {
      setLoading(true);

      // Consulta os dados do CNPJ
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
      if (!response.ok) {
        throw new Error("CNPJ inválido ou não encontrado.");
      }

      const data = await response.json();
      setEmpresaData(data);

      // Cria o payload do usuário com os dados da empresa
      const payload = {
        nomeRepresentante,
        email,
        senha,
        telefone,
        cnpj,
        nomeEmpresa: data.razao_social,
        endereco: `${data.logradouro}, ${data.numero}, ${data.municipio}, ${data.numero}, - ${data.uf}`,
        criterios,
      };

      // Envia os dados do usuário para o backend
      const userResponse = await fetch("http://localhost:5001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (userResponse.ok) {
        localStorage.setItem("token", "token-simulado");
        
        navigate("/dashboard");
      } else {
        setError("Erro ao cadastrar. Tente novamente.");
      }
    } catch (err) {
      setError(err.message || "Erro ao processar o cadastro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles["register_container"]}>
      <form className={styles["register-form"]} onSubmit={handleSubmit}>
        <h2>Cadastro</h2>

        {/* Campos do formulário */}
        <input
          type="text"
          value={nomeRepresentante}
          onChange={(e) => setNomeRepresentante(e.target.value)}
          placeholder="Nome do Representante"
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
        <input
          type="text"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          placeholder="CNPJ (somente números)"
          required
        />

        {/* Critérios de Participação */}
        <div className={styles["criterios-section"]}>
          <h3>Critérios de Participação</h3>
          <div>
            <label>
              <input
                type="checkbox"
                name="criterio1"
                checked={criterios.criterio1}
                onChange={handleCheckboxChange}
              />
              Ser pública, privada ou de economia mista, com 100 ou mais empregadas/os, com personalidade jurídica própria.
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="criterio2"
                checked={criterios.criterio2}
                onChange={handleCheckboxChange}
              />
              Estar em dia com as obrigações trabalhistas.
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="criterio3"
                checked={criterios.criterio3}
                onChange={handleCheckboxChange}
              />
              Não ter sofrido denúncias de trabalho escravo.
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="criterio4"
                checked={criterios.criterio4}
                onChange={handleCheckboxChange}
              />
              Não ter denúncias não apuradas de assédio e/ou discriminação.
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="criterio5"
                checked={criterios.criterio5}
                onChange={handleCheckboxChange}
              />
              Publicar relatórios de transparência salarial conforme a Lei n. 14.611/2023.
            </label>
          </div>
        </div>

        {/* Exibir mensagem de erro, se houver */}
        {error && <p className={styles["error-message"]}>{error}</p>}

        {/* Botão de envio */}
        <button type="submit" disabled={loading}>
          {loading ? "Processando..." : "Enviar"}
        </button>

        {/* Exibir dados da empresa (se encontrados) */}
        {empresaData && (
          <div className={styles["empresa-data"]}>
            <h3>Dados da Empresa</h3>
            <p><strong>Razão Social:</strong> {empresaData.razao_social}</p>
            <p><strong>Endereço:</strong> {empresaData.logradouro}, {empresaData.numero}, {empresaData.municipio} - {empresaData.uf}</p>
            <p><strong>CNPJ:</strong> {empresaData.cnpj}</p>
            <p><strong>Telefone:</strong> {empresaData.telefone}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default Register;



