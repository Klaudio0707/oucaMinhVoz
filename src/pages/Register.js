import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../src/pages/Components/Footer";
import logo from "../img/logo-ouca-minhA.png";
import styles from "./Styles/Register.module.css";

function Register() {
  const [nomeRepresentante, setNomeRepresentante] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [empresaData, setEmpresaData] = useState(null);
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
        telefone:data.ddd_telefone_1, // Prioriza o telefone do formulário
        cnpj,
        nomeEmpresa: data.razao_social,
        endereco: `${data.logradouro}, ${data.numero}, ${data.municipio}, - ${data.uf}`,
        criterios,
      };

      // Envia os dados do usuário para o backend
      const userResponse = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
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
    <div>
      <div className={styles["logo-container"]}>
        <img src={logo} alt="logo empresa" className={styles["logo-img"]} />
      </div>

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
          <h3 className={styles["title-criterios"]}>Critérios de Participação</h3>
          <div className={styles["criterios-section"]}>
            {/* Lista de critérios */}
            {Object.keys(criterios).map((criterio, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  name={criterio}
                  checked={criterios[criterio]}
                  onChange={handleCheckboxChange}
                />
                <label>
                  {/* Texto de cada critério */}
                  {criterio === "criterio1" &&
                    "Ser pública, privada ou de economia mista, com 100 ou mais empregadas/os, com personalidade jurídica própria."}
                  {criterio === "criterio2" && "Estar em dia com as obrigações trabalhistas."}
                  {criterio === "criterio3" && "Não ter sofrido denúncias de trabalho escravo."}
                  {criterio === "criterio4" && "Não ter denúncias não apuradas de assédio e/ou discriminação."}
                  {criterio === "criterio5" &&
                    "Publicar relatórios de transparência salarial conforme a Lei n. 14.611/2023."}
                </label>
              </div>
            ))}
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
              <p>
                <strong>Razão Social:</strong> {empresaData.razao_social}
              </p>
              <p>
                <strong>Endereço:</strong> {empresaData.logradouro}, {empresaData.numero},{" "}
                {empresaData.municipio} - {empresaData.uf}
              </p>
              <p>
                <strong>CNPJ:</strong> {empresaData.cnpj}
              </p>
              <p>
                <strong>Telefone:</strong> {empresaData.ddd_telefone_1}
              </p>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Register;



