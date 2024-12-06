import React, { useState } from "react";
import logo from "../img/logo-ouca-minhA.png";
import Footer from "./Components/Footer";
import styles from "./Styles/PlanoAcao.module.css";

function PlanoAcao() {
  const [formData, setFormData] = useState({
    organizacao: "",
    cnpj: "",
    endereco: "",
    cidade: "",
    uf: "",
    cep: "",
    telefone: "",
    natureza: "",
    edicoesParticipadas: [],
    responsavel: "",
    cargo: "",
    funcao: "",
    email: "",
    historico: "",
    justificativa: "",
    objetivoGeral: "",
    recrutamentoSelecao: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => {
      const edicoesParticipadas = checked
        ? [...prevState.edicoesParticipadas, name]
        : prevState.edicoesParticipadas.filter((item) => item !== name);
      return { ...prevState, edicoesParticipadas };
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/planoacao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Erro ao enviar os dados.");
      }
      alert("Plano de Ação enviado com sucesso!");
    } catch (err) {
      alert("Erro ao enviar o formulário: " + err.message);
    }
  };

  return (
    <div>
      <div className={styles["logo-container"]}>
        <img src={logo} alt="logo empresa" className={styles["logo-img"]} />
      </div>

      <div className={styles["plano-acao-container"]}>
        <h1 className={styles["title"]}>Plano de Ação – 7ª Edição</h1>

        <form className={styles["form-container"]} onSubmit={handleSubmit}>
          {/* Dados Cadastrais */}
          <section className={styles["section"]}>
            <h2 className={styles["section-title"]}>DADOS CADASTRAIS</h2>

            <div className={styles["form-field"]}>
              <label>
                Organização:
                <input
                  type="text"
                  className={styles["input-field"]}
                  name="organizacao"
                  value={formData.organizacao}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className={styles["form-field"]}>
              <label>
                CNPJ:
                <input
                  type="text"
                  className={styles["input-field"]}
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className={styles["form-field"]}>
              <label>
                Endereço:
                <input
                  type="text"
                  className={styles["input-field"]}
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className={styles["row"]}>
              <div className={styles["form-field"]}>
                <label>
                  Cidade:
                  <input
                    type="text"
                    className={styles["input-field"]}
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className={styles["form-field"]}>
                <label>
                  UF:
                  <input
                    type="text"
                    className={`${styles["input-field"]} ${styles["small"]}`}
                    name="uf"
                    value={formData.uf}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className={styles["form-field"]}>
                <label>
                  CEP:
                  <input
                    type="text"
                    className={`${styles["input-field"]} ${styles["small"]}`}
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <div className={styles["form-field"]}>
              <label>
                Telefone(s):
                <input
                  type="text"
                  className={styles["input-field"]}
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className={styles["form-field"]}>
              <label className={styles["label-block"]}>Natureza da Organização:</label>
              <div className={styles["radio-group"]}>
                <label className={styles["radio-label"]}>
                  <input
                    type="radio"
                    name="natureza"
                    value="Pública"
                    checked={formData.natureza === "Pública"}
                    onChange={handleRadioChange}
                  />
                  Pública
                </label>
                <label className={styles["radio-label"]}>
                  <input
                    type="radio"
                    name="natureza"
                    value="Privada"
                    checked={formData.natureza === "Privada"}
                    onChange={handleRadioChange}
                  />
                  Privada
                </label>
                <label className={styles["radio-label"]}>
                  <input
                    type="radio"
                    name="natureza"
                    value="Especificar"
                    checked={formData.natureza === "Especificar"}
                    onChange={handleRadioChange}
                  />
                  Especificar
                </label>
              </div>
            </div>

            <div className={styles["form-field"]}>
              <label className={styles["label-block"]}>
                Participante de edições anteriores do programa:
              </label>
              <div className={styles["checkbox-group"]}>
                {["1ª Edição", "2ª Edição", "3ª Edição", "4ª Edição", "5ª Edição", "6ª Edição"].map(
                  (edicao, index) => (
                    <label key={index} className={styles["checkbox-label"]}>
                      <input
                        type="checkbox"
                        name={edicao}
                        checked={formData.edicoesParticipadas.includes(edicao)}
                        onChange={handleCheckboxChange}
                      />
                      {edicao}
                    </label>
                  )
                )}
              </div>
            </div>

            <div className={styles["form-field"]}>
              <label>
                Responsável pela Gestão do Programa na Organização:
                <input
                  type="text"
                  className={styles["input-field"]}
                  name="responsavel"
                  value={formData.responsavel}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className={styles["form-field"]}>
              <label>
                Telefone(s):
                <input
                  type="text"
                  className={styles["input-field"]}
                  name="telefoneResponsavel"
                  value={formData.telefoneResponsavel}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className={styles["form-field"]}>
              <label>
                Cargo:
                <input
                  type="text"
                  className={styles["input-field"]}
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className={styles["form-field"]}>
              <label>
                Função:
                <input
                  type="text"
                  className={styles["input-field"]}
                  name="funcao"
                  value={formData.funcao}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className={styles["form-field"]}>
              <label>
                E-mail:
                <input
                  type="email"
                  className={styles["input-field"]}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </div>
          </section>

          {/* Histórico */}
          <section className={styles["section"]}>
            <h2 className={styles["section-title"]}>Histórico</h2>
            <div className={styles["form-field"]}>
              <textarea
                className={styles["textarea-field"]}
                name="historico"
                value={formData.historico}
                onChange={handleChange}
                placeholder="Descreva sobre a organização, missão, área de atuação, resultados, produtos etc."
              ></textarea>
            </div>

            <div className={styles["form-field"]}>
              <textarea
                className={styles["textarea-field"]}
                name="justificativa"
                value={formData.justificativa}
                onChange={handleChange}
                placeholder="Descreva o histórico de envolvimento com a temática da igualdade de gênero."
              ></textarea>
            </div>

            <div className={styles["form-field"]}>
              <textarea
                className={styles["textarea-field"]}
                name="objetivoGeral"
                value={formData.objetivoGeral}
                onChange={handleChange}
                placeholder="Descreva o objetivo geral do plano de ação."
              ></textarea>
            </div>
          </section>

          {/* Recrutamento e Seleção */}
          <section className={styles["section"]}>
            <h2 className={styles["section-title"]}>Recrutamento e Seleção</h2>
            <div className={styles["form-field"]}>
              <textarea
                className={styles["textarea-field"]}
                name="recrutamentoSelecao"
                value={formData.recrutamentoSelecao}
                onChange={handleChange}
                placeholder="Descreva como será feito o recrutamento e seleção dos participantes."
              ></textarea>
            </div>
          </section>

          <button type="submit" className={styles["submit-button"]}>
            Enviar Plano de Ação
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default PlanoAcao;
