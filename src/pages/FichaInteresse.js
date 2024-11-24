import React from "react";
import  style from"./Styles/FichaInteresse.module.css";

function FichaInteresse() {
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
          <label>
            Nome da Organização:
            <input type="text" className="input-field" />
          </label>
          <label>
            Endereço da matriz/sede social:
            <input type="text" className="input-field" />
          </label>
          <div className="row">
            <label>
              Cidade:
              <input type="text" className="input-field" />
            </label>
            <label>
              UF:
              <input type="text" className="input-field small" />
            </label>
            <label>
              CEP:
              <input type="text" className="input-field small" />
            </label>
          </div>
          <label>
            E-mail:
            <input type="email" className="input-field" />
          </label>
          <label>
            Página na web:
            <input type="url" className="input-field" />
          </label>
          <div className="radio-group">
            Natureza da organização:
            <label>
              <input type="radio" name="natureza" /> Pública
            </label>
            <label>
              <input type="radio" name="natureza" /> Privada
            </label>
            <label>
              <input type="radio" name="natureza" /> Outra
            </label>
          </div>
          <label>
            Especifique:
            <input type="text" className="input-field" />
          </label>
        </section>

        <section className="section">
          <h2 className="section-title">DADOS DA/O REPRESENTANTE LEGAL DA ORGANIZAÇÃO</h2>
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
