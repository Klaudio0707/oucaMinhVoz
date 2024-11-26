import React from "react";
import Logo from "../pages/Components/Logo";
import Footer from "./Components/Footer";
import styles from "./Styles/PlanoAcao.module.css";

function PlanoAcao() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de submissão do formulário
  };

  return (
    <div>
      <Logo/>
    <div className={styles["plano-acao-container"]}>
      <h1 className={styles["title"]}>Plano de Ação – 7ª Edição</h1>

      <form className={styles["form-container"]} onSubmit={handleSubmit}>
        {/* Dados Cadastrais */}
        <section className={styles["section"]}>
          <h2 className={styles["section-title"]}>DADOS CADASTRAIS</h2>

          <div className={styles["form-field"]}>
            <label>
              Organização:
              <input type="text" className={styles["input-field"]} />
            </label>
          </div>

          <div className={styles["form-field"]}>
            <label>
              CNPJ:
              <input type="text" className={styles["input-field"]} />
            </label>
          </div>

          <div className={styles["form-field"]}>
            <label>
              Endereço:
              <input type="text" className={styles["input-field"]} />
            </label>
          </div>

          <div className={styles["row"]}>
            <div className={styles["form-field"]}>
              <label>
                Cidade:
                <input type="text" className={styles["input-field"]} />
              </label>
            </div>
            <div className={styles["form-field"]}>
              <label>
                UF:
                <input type="text" className={styles["input-field"] + " " + styles["small"]} />
              </label>
            </div>
            <div className={styles["form-field"]}>
              <label>
                CEP:
                <input type="text" className={styles["input-field"] + " " + styles["small"]} />
              </label>
            </div>
          </div>

          <div className={styles["form-field"]}>
            <label>
              Telefone(s):
              <input type="text" className={styles["input-field"]} />
            </label>
          </div>

          <div className={styles["form-field"]}>
            <label className={styles["label-block"]}>Natureza da Organização:</label>
            <div className={styles["radio-group"]}>
              <label className={styles["radio-label"]}>
                <input type="radio" name="natureza" /> Pública
              </label>
              <label className={styles["radio-label"]}>
                <input type="radio" name="natureza" /> Privada
              </label>
              <label className={styles["radio-label"]}>
                <input type="radio" name="natureza" /> Especificar
              </label>
            </div>
          </div>

          <div className={styles["form-field"]}>
            <label className={styles["label-block"]}>
              Participante de edições anteriores do programa:
            </label>
            <div className={styles["checkbox-group"]}>
              <label className={styles["checkbox-label"]}>
                <input type="checkbox" /> 1ª Edição
              </label>
              <label className={styles["checkbox-label"]}>
                <input type="checkbox" /> 2ª Edição
              </label>
              <label className={styles["checkbox-label"]}>
                <input type="checkbox" /> 3ª Edição
              </label>
              <label className={styles["checkbox-label"]}>
                <input type="checkbox" /> 4ª Edição
              </label>
              <label className={styles["checkbox-label"]}>
                <input type="checkbox" /> 5ª Edição
              </label>
              <label className={styles["checkbox-label"]}>
                <input type="checkbox" /> 6ª Edição
              </label>
            </div>
          </div>

          <div className={styles["form-field"]}>
            <label>
              Responsável pela Gestão do Programa na Organização:
              <input type="text" className={styles["input-field"]} />
            </label>
          </div>

          <div className={styles["form-field"]}>
            <label>
              Telefone(s):
              <input type="text" className={styles["input-field"]} />
            </label>
          </div>

          <div className={styles["form-field"]}>
            <label>
              Cargo:
              <input type="text" className={styles["input-field"]} />
            </label>
          </div>

          <div className={styles["form-field"]}>
            <label>
              Função:
              <input type="text" className={styles["input-field"]} />
            </label>
          </div>

          <div className={styles["form-field"]}>
            <label>
              E-mail:
              <input type="email" className={styles["input-field"]} />
            </label>
          </div>
        </section>

        {/* Histórico */}
        <section className={styles["section"]}>
          <h2 className={styles["section-title"]}>Histórico</h2>
          <div className={styles["form-field"]}>
            <textarea
              className={styles["textarea-field"]}
              placeholder="Descreva sobre a organização, missão, área de atuação, resultados, produtos etc."
            ></textarea>
          </div>
        </section>

        {/* Justificativa */}
        <section className={styles["section"]}>
          <h2 className={styles["section-title"]}>Justificativa</h2>
          <div className={styles["form-field"]}>
            <textarea
              className={styles["textarea-field"]}
              placeholder="Explique os motivos que levam a organização a aderir ao Programa."
              ></textarea>
          </div>
        </section>

        {/* Objetivo Geral */}
        <section className={styles["section"]}>
          <h2 className={styles["section-title"]}>Objetivo Geral</h2>
          <div className={styles["form-field"]}>
            <textarea
              className={styles["textarea-field"]}
              placeholder="Destacar os objetivos com a promoção da igualdade."
              ></textarea>
          </div>
        </section>

        {/* Eixos de Gestão de Pessoas */}
        <section className={styles["section"]}>
          <h2 className={styles["section-title"]}>Eixos de Gestão de Pessoas</h2>
          <div className={styles["eixo-container"]}>
            <h3 className={styles["eixo-title"]}>Dimensão: Recrutamento e Seleção</h3>
            <div className={styles["form-field"]}>
              <textarea className={styles["textarea-field"]} placeholder="Ações"></textarea>
            </div>
          </div>
        </section>

        <button type="submit" className={styles["submit-button"]}>
          Enviar
        </button>
      </form>
    </div>
    <Footer/>
              </div>
  );
}

export default PlanoAcao;
