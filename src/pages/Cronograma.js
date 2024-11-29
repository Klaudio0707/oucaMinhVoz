import React from "react";
import styles from "./Styles/Cronograma.module.css";

function Cronograma() {
  return (
    <div className={styles["programa-container"]}>
      <h1 className={styles.title}>
        Inscreva sua empresa na 7ª edição do Programa Pró-Equidade de Gênero e
        Raça
      </h1>

      <div className={styles["timeline-section"]}>
        <h2 className={styles["section-title"]}>Cronograma</h2>
        <div className={styles["timeline"]}>
          <div className={styles["timeline-item"]}>
            <h3 className={styles["item-date"]}>27/10/2023 até 30/04/2024*</h3>
            <p className={styles["item-description"]}>
              <strong>Envio da Ficha de Adesão</strong> <br />
              A primeira etapa para participação é o envio da Ficha de Adesão
              preenchida para o e-mail{" "}
              <a
                href="mailto:programaproequidade@mulheres.gov.br"
                className={styles["email-link"]}
              >
                programaproequidade@mulheres.gov.br
              </a>
              , para formalização do interesse de sua empresa em concorrer ao
              Selo. (Pode ser enviada antes da Ficha Perfil e Plano de Ação!)
            </p>
          </div>

          <div className={styles["timeline-item"]}>
            <h3 className={styles["item-date"]}>Até 30/04/2024</h3>
            <p className={styles["item-description"]}>
              <strong>Envio da Ficha Perfil e do Plano de Ação</strong> <br />
              Os modelos para preenchimento estão disponibilizados na seção
              abaixo, e sua empresa pode se basear no Guia Operacional e no
              Livreto para elaborá-los.
            </p>
          </div>

          <div className={styles["timeline-item"]}>
            <h3 className={styles["item-date"]}>Maio de 2024</h3>
            <p className={styles["item-description"]}>
              <strong>Assinatura do Termo de Compromisso</strong> <br />
              Finalizado o prazo para adesão, a participação da empresa no
              Programa será formalizada com a assinatura oficial do Termo de
              Compromisso.
            </p>
          </div>

          <div className={styles["timeline-item"]}>
            <h3 className={styles["item-date"]}>
              Abril de 2024 a abril de 2026
            </h3>
            <p className={styles["item-description"]}>
              <strong>Execução e Monitoramento do Plano de Ação</strong> <br />
              A execução e o monitoramento das ações previstas no Plano de Ação
              serão acompanhados por dois anos, com o intuito de assessorar a
              implementação das ações.
            </p>
          </div>

          <div className={styles["timeline-item"]}>
            <h3 className={styles["item-date"]}>Abril de 2026</h3>
            <p className={styles["item-description"]}>
              <strong>Envio do Relatório Final</strong> <br />
              Ao final do período previsto para execução, as empresas deverão
              apresentar um Relatório Final, no qual mostrarão os resultados
              obtidos com a execução do Plano de Ação.
            </p>
          </div>

          <div className={styles["timeline-item"]}>
            <h3 className={styles["item-date"]}>Maio de 2026</h3>
            <p className={styles["item-description"]}>
              <strong>Divulgação das empresas premiadas</strong> <br />
              Se verificada a implementação suficiente e efetiva do Plano de
              Ação, a empresa será premiada com o Selo Pró-Equidade de Gênero e
              Raça!
            </p>
          </div>

          <div className={styles["timeline-item"]}>
            <h3 className={styles["item-date"]}>Junho de 2026</h3>
            <p className={styles["item-description"]}>
              <strong>Cerimônia de entrega do Selo</strong> <br />
              Cerimônia de entrega do Selo Pró-Equidade de Gênero e Raça - 7ª
              Edição
            </p>
          </div>
        </div>
        <p className={styles["disclaimer"]}>
          * Prazos prorrogados conforme decisão publicada pelo Ministério das
          Mulheres, no Diário Oficial da União, em 28/03/2023, seção 3, Edição
          Extra.
        </p>
      </div>
    </div>
  );
}

export default Cronograma;
