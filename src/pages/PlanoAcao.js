import React from "react";
import styles from "./Styles/PlanoAcao.module.css";


function PlanoAcao() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de submissão do formulário
  };

  return (
 
    <div className={styles['plano-acao-container']}>
        <h1 className="title">Plano de Ação – 7ª Edição</h1>

        <form className="form-container" onSubmit={handleSubmit}>
          {/* Dados Cadastrais */}
          <section className="section">
            <h2 className="section-title">DADOS CADASTRAIS</h2>

            <div className="form-field">
              <label>
                Organização:
                <input type="text" className="input-field" />
              </label>
            </div>

            <div className="form-field">
              <label>
                CNPJ:
                <input type="text" className="input-field" />
              </label>
            </div>

            <div className="form-field">
              <label>
                Endereço:
                <input type="text" className="input-field" />
              </label>
            </div>

            <div className="row">
              <div className="form-field">
                <label>
                  Cidade:
                  <input type="text" className="input-field" />
                </label>
              </div>
              <div className="form-field">
                <label>
                  UF:
                  <input type="text" className="input-field small" />
                </label>
              </div>
              <div className="form-field">
                <label>
                  CEP:
                  <input type="text" className="input-field small" />
                </label>
              </div>
            </div>

            <div className="form-field">
              <label>
                Telefone(s):
                <input type="text" className="input-field" />
              </label>
            </div>

            <div className="form-field">
              <label className="label-block">Natureza da Organização:</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input type="radio" name="natureza" /> Pública
                </label>
                <label className="radio-label">
                  <input type="radio" name="natureza" /> Privada
                </label>
                <label className="radio-label">
                  <input type="radio" name="natureza" /> Especificar
                </label>
              </div>
            </div>

            <div className="form-field">
              <label className="label-block">
                Participante de edições anteriores do programa:
              </label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" /> 1ª Edição
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" /> 2ª Edição
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" /> 3ª Edição
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" /> 4ª Edição
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" /> 5ª Edição
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" /> 6ª Edição
                </label>
              </div>
            </div>

            <div className="form-field">
              <label>
                Responsável pela Gestão do Programa na Organização:
                <input type="text" className="input-field" />
              </label>
            </div>

            <div className="form-field">
              <label>
                Telefone(s):
                <input type="text" className="input-field" />
              </label>
            </div>

            <div className="form-field">
              <label>
                Cargo:
                <input type="text" className="input-field" />
              </label>
            </div>

            <div className="form-field">
              <label>
                Função:
                <input type="text" className="input-field" />
              </label>
            </div>

            <div className="form-field">
              <label>
                E-mail:
                <input type="email" className="input-field" />
              </label>
            </div>
          </section>

          {/* Histórico */}
          <section className="section">
            <h2 className="section-title">Histórico</h2>
            <div className="form-field">
              <textarea
                className="textarea-field"
                placeholder="Descreva sobre a organização, missão, área de atuação, resultados, produtos etc."
              ></textarea>
            </div>
          </section>

          {/* Justificativa */}
          <section className="section">
            <h2 className="section-title">Justificativa</h2>
            <div className="form-field">
              <textarea
                className="textarea-field"
                placeholder="Explique os motivos que levam a organização a aderir ao Programa."
              ></textarea>
            </div>
          </section>

          {/* Objetivo Geral */}
          <section className="section">
            <h2 className="section-title">Objetivo Geral</h2>
            <div className="form-field">
              <textarea
                className="textarea-field"
                placeholder="Destacar os objetivos com a promoção da igualdade."
              ></textarea>
            </div>
          </section>

          {/* Eixos de Gestão de Pessoas */}
          <section className="section">
            <h2 className="section-title">Eixos de Gestão de Pessoas</h2>
            <div className="eixo-container">
              <h3 className="eixo-title">Dimensão: Recrutamento e Seleção</h3>
              <div className="form-field">
                <textarea className="textarea-field" placeholder="Ações"></textarea>
              </div>
            </div>
          </section>

          <button type="submit" className="submit-button">
            Enviar
          </button>
        </form>
      </div>

  );
}

export default PlanoAcao;