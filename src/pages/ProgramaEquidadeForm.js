import React, { useState } from 'react';
import './dashBoard.css';

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

  const handleChange = (section, field, subField) => (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: subField ? { ...prevData[section][field], [subField]: e.target.value } : e.target.value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="equidade-form">
      <h1 className="form-title">Formulário do Programa de Equidade</h1>

      <section className="form-section">
        <h2 className="section-title">1. Histórico</h2>
        <textarea
          className="input-textarea"
          placeholder="Descreva a organização, missão, área de atuação, produtos etc."
          value={formData.historico}
          onChange={handleChange('historico')}
        />
      </section>
    
          <section className="form-section">
            <h2 className="section-title">2. Justificativa</h2>
            <textarea
              className="input-textarea"
              placeholder="Motivos para adesão, resultados de iniciativas anteriores, princípios orientadores..."
              value={formData.justificativa}
              onChange={handleChange('justificativa')}
            />
          </section>
    
          <section className="form-section">
            <h2 className="section-title">3. Objetivo Geral</h2>
            <textarea
              className="input-textarea"
              placeholder="Objetivo geral com o programa"
              value={formData.objetivoGeral}
              onChange={handleChange('objetivoGeral')}
            />
          </section>
    
          <section className="form-section">
            <h2 className="section-title">4. Parcerias</h2>
            <textarea
              className="input-textarea"
              placeholder="Parcerias para implementação do programa"
              value={formData.parcerias}
              onChange={handleChange('parcerias')}
            />
          </section>
    
          <section className="form-section">
            <h2 className="section-title">5. Outras Informações</h2>
            <textarea
              className="input-textarea"
              placeholder="Orçamento, acompanhamento, avaliação e integrantes do comitê..."
              value={formData.outrasInformacoes}
              onChange={handleChange('outrasInformacoes')}
            />
          </section>
    
          <section className="form-section">
            <h2 className="section-title">Eixo de Gestão de Pessoas</h2>
            {['recrutamentoSelecao', 'capacitacaoTreinamento', 'ascensaoFuncional', 'politicasBeneficios', 'saudeSeguranca'].map((dimensao) => (
              <div key={dimensao} className="dimension">
                <h3 className="dimension-title">Dimensão: {dimensao.replace(/([A-Z])/g, ' $1')}</h3>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Ação"
                  value={formData.eixoGestaoPessoas[dimensao].acao}
                  onChange={handleChange('eixoGestaoPessoas', dimensao, 'acao')}
                />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Objetivos Específicos"
                  value={formData.eixoGestaoPessoas[dimensao].objetivos}
                  onChange={handleChange('eixoGestaoPessoas', dimensao, 'objetivos')}
                />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Indicadores"
                  value={formData.eixoGestaoPessoas[dimensao].indicadores}
                  onChange={handleChange('eixoGestaoPessoas', dimensao, 'indicadores')}
                />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Metas"
                  value={formData.eixoGestaoPessoas[dimensao].metas}
                  onChange={handleChange('eixoGestaoPessoas', dimensao, 'metas')}
                />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Período de Execução"
                  value={formData.eixoGestaoPessoas[dimensao].periodo}
                  onChange={handleChange('eixoGestaoPessoas', dimensao, 'periodo')}
                />
              </div>
            ))}
          </section>
    
          <section className="form-section">
            <h2 className="section-title">Eixo de Cultura Organizacional</h2>
            {['combateDesigualdades', 'capacitacaoRelacionamentos', 'propagandaInstitucional'].map((dimensao) => (
              <div key={dimensao} className="dimension">
                <h3 className="dimension-title">Dimensão: {dimensao.replace(/([A-Z])/g, ' $1')}</h3>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Ação"
                  value={formData.eixoCulturaOrganizacional[dimensao].acao}
                  onChange={handleChange('eixoCulturaOrganizacional', dimensao, 'acao')}
                />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Objetivos Específicos"
                  value={formData.eixoCulturaOrganizacional[dimensao].objetivos}
                  onChange={handleChange('eixoCulturaOrganizacional', dimensao, 'objetivos')}
                />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Indicadores"
                  value={formData.eixoCulturaOrganizacional[dimensao].indicadores}
                  onChange={handleChange('eixoCulturaOrganizacional', dimensao, 'indicadores')}
                />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Metas"
                  value={formData.eixoCulturaOrganizacional[dimensao].metas}
                  onChange={handleChange('eixoCulturaOrganizacional', dimensao, 'metas')}
                />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Período de Execução"
                  value={formData.eixoCulturaOrganizacional[dimensao].periodo}
                  onChange={handleChange('eixoCulturaOrganizacional', dimensao, 'periodo')}
                />
              </div>
            ))}
          </section>
    
          <section className="form-section">
            <h2 className="section-title">Ações Inovadoras (Opcional)</h2>
            {['acaoInovadoraI', 'acaoInovadoraII'].map((acao) => (
              <div key={acao} className="dimension">
                <h3 className="dimension-title">{acao.replace(/([A-Z])/g, ' $1')}</h3>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Ação"
                  value={formData.acoesInovadoras[acao].acao}
                  onChange={handleChange('acoesInovadoras', acao, 'acao')}
                />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Objetivos Específicos"
                  value={formData.acoesInovadoras[acao].objetivos}
                  onChange={handleChange('acoesInovadoras', acao, 'objetivos')}
                />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Indicadores"
                  value={formData.acoesInovadoras[acao].indicadores}
                  onChange={handleChange('acoesInovadoras', acao, 'indicadores')}
                />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Metas"
                  value={formData.acoesInovadoras[acao].metas}
                  onChange={handleChange('acoesInovadoras', acao, 'metas')}
                />
                <input
                  className="input-field"
                  type="text"
                  placeholder="Período de Execução"
                  value={formData.acoesInovadoras[acao].periodo}
                  onChange={handleChange('acoesInovadoras', acao, 'periodo')}
                />
              </div>
            ))}
          </section>
    
          <button className="submit-button" type="submit">Enviar</button>
        </form>
  );
}

export default ProgramaEquidadeForm;
