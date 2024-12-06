import React, { useState, useEffect } from "react";
import style from "./Styles/Dashboard_GovII.module.css";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import api from "../apiFake/api"; // Certifique-se de que o caminho para a API está correto

function DashboardGovII() {
  const [empresasAprovadas, setEmpresasAprovadas] = useState([]);
  const [empresasRejeitadas, setEmpresasRejeitadas] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarEmpresas();
  }, []);

  const carregarEmpresas = async () => {
    try {
      const empresasAprovadasData = await api.formularios.getEmpresasAprovadas();
      const empresasRejeitadasData = await api.formularios.getEmpresasRejeitadas();
      setEmpresasAprovadas(empresasAprovadasData);
      setEmpresasRejeitadas(empresasRejeitadasData);
    } catch (error) {
      setErro("Erro ao carregar os dados das empresas.");
    }
  };

  const rejectionData = empresasRejeitadas.map((empresa) => ({
    reason: empresa.motivoRejeicao || "Motivo não especificado",
    percentage: 1, // Pode ser ajustado se houver porcentagem real no backend
  }));

  return (
    <div className={style["dashboard-container"]}>
      <h1 className={style["dashboard-title"]}>Dashboard - Programa Pró-Equidade</h1>

      {/* Cards de Resumo */}
      <div className={style["summary-cards"]}>
        <div className={style["card"]}>
          <h2>Empresas Aprovadas</h2>
          <p className={style["card-value"]}>{empresasAprovadas.length}</p>
        </div>
        <div className={style["card"]}>
          <h2>Empresas Rejeitadas</h2>
          <p className={style["card-value"]}>{empresasRejeitadas.length}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className={style["charts-container"]}>
        {/* Principais motivos de rejeição */}
        <div className={style["chart"]}>
          <h2>Principais Motivos de Rejeição</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rejectionData} layout="vertical" margin={{ top: 10, right: 50, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="reason" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="percentage" fill="#ff4d4d" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Evolução no número de adesões */}
        <div className={style["chart"]}>
          <h2>Evolução no Número de Empresas Participantes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={empresasAprovadas} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ano" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="empresas" fill="#007BFF" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabela Resumida */}
      <div className={style["table-container"]}>
        <h2>Resumo de Empresas</h2>
        <table className={style["summary-table"]}>
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Status</th>
              <th>Motivo da Rejeição</th>
            </tr>
          </thead>
          <tbody>
            {empresasAprovadas.map((empresa, index) => (
              <tr key={`aprovada-${index}`}>
                <td>{empresa.nome}</td>
                <td>Aprovada</td>
                <td>-</td>
              </tr>
            ))}
            {empresasRejeitadas.map((empresa, index) => (
              <tr key={`rejeitada-${index}`}>
                <td>{empresa.nome}</td>
                <td>Rejeitada</td>
                <td>{empresa.motivoRejeicao || "Motivo não especificado"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {erro && <p className={style["error-message"]}>{erro}</p>}
    </div>
  );
}

export default DashboardGovII;
