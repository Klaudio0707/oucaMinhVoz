import React, { useState } from 'react';
import logo from "../img/logo-ouca-minhA.png";
import style from './Styles/inscricaoPrograma.module.css';
import api from '../apiFake/api'; // Certifique-se de ajustar o caminho para o arquivo de API.

function ProgramaEquidadeForm() {
  const [formData, setFormData] = useState({
    historico: '',
    justificativa: '',
    objetivoGeral: '',
    parcerias: '',
    outrasInformacoes: '',
    eixoGestaoPessoas: {
      recrutamentoSelecao: { acao: '', objetivos: '', indicadores: '', metas: '', periodo: '' },
      capacitacaoTreinamento: { acao: '', objetivos: '', indicadores: '', metas: '', periodo: '' },
      ascensaoFuncional: { acao: '', objetivos: '', indicadores: '', metas: '', periodo: '' },
      politicasBeneficios: { acao: '', objetivos: '', indicadores: '', metas: '', periodo: '' },
      saudeSeguranca: { acao: '', objetivos: '', indicadores: '', metas: '', periodo: '' },
    },
    eixoCulturaOrganizacional: {
      combateDesigualdades: { acao: '', objetivos: '', indicadores: '', metas: '', periodo: '' },
      capacitacaoRelacionamentos: { acao: '', objetivos: '', indicadores: '', metas: '', periodo: '' },
      propagandaInstitucional: { acao: '', objetivos: '', indicadores: '', metas: '', periodo: '' },
    },
    acoesInovadoras: {
      acaoInovadoraI: { acao: '', objetivos: '', indicadores: '', metas: '', periodo: '' },
      acaoInovadoraII: { acao: '', objetivos: '', indicadores: '', metas: '', periodo: '' },
    },
  });

  // Alteração de campos simples
  const handleTextChange = (field) => (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  // Alteração de campos aninhados
  const handleChange = (section, field, subField) => (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: subField ? { ...prevData[section][field], [subField]: e.target.value } : e.target.value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.formularios.get(formData);
      alert('Formulário enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      alert('Erro ao enviar o formulário. Tente novamente.');
    }
  };

  return (
    <div>
      <div className={style["logo-container"]}>
        <img src={logo} alt="Logo da empresa" className={style["logo-img"]} />
      </div>
      <form onSubmit={handleSubmit} className={style["equidade-form"]}>
        <h1 className={style["form-title"]}>Formulário do Programa de Equidade</h1>

        {/* Seções de Campos Simples */}
        {[
          { field: 'historico', label: 'Histórico da Organização' },
          { field: 'justificativa', label: 'Justificativa para Participação' },
          { field: 'objetivoGeral', label: 'Objetivo Geral' },
          { field: 'parcerias', label: 'Parcerias e Colaborações' },
          { field: 'outrasInformacoes', label: 'Outras Informações Relevantes' },
        ].map(({ field, label }, index) => (
          <section key={index} className={style["form-section"]}>
            <h2 className={style["section-title"]}>{index + 1}. {label}</h2>
            <textarea
              className={style["input-textarea"]}
              placeholder={`Insira o ${label.toLowerCase()}`}
              value={formData[field]}
              onChange={handleTextChange(field)}
            />
          </section>
        ))}

        {/* Eixo de Gestão de Pessoas */}
        <section className={style["form-section"]}>
          <h2 className={style["section-title"]}>Eixo: Gestão de Pessoas</h2>
          {Object.keys(formData.eixoGestaoPessoas).map((dimensao) => (
            <div key={dimensao} className={style["dimension"]}>
              <h3 className={style["dimension-title"]}>
                {dimensao.replace(/([A-Z])/g, ' $1')}
              </h3>
              {['Ação', 'Objetivos', 'Indicadores', 'Metas', 'Período'].map((subField, idx) => (
                <input
                  key={idx}
                  className={style["input-field"]}
                  type="text"
                  placeholder={subField}
                  value={formData.eixoGestaoPessoas[dimensao][subField.toLowerCase()]}
                  onChange={handleChange('eixoGestaoPessoas', dimensao, subField.toLowerCase())}
                />
              ))}
            </div>
          ))}
        </section>

        <button className={style["submit-button"]} type="submit">
          Enviar Formulário
        </button>
      </form>
    </div>
  );
}

export default ProgramaEquidadeForm;


