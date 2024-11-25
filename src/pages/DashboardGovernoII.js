import React from "react";
import style from "./Styles/Dashboard_GovII.module.css";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const rejectionData = [
  { reason: "Documentação incompleta", percentage: 35 },
  { reason: "Critérios não atendidos", percentage: 40 },
  { reason: "Falta de ações efetivas", percentage: 25 },
];

const adoptionData = [
  { year: "2020", companies: 50 },
  { year: "2021", companies: 80 },
  { year: "2022", companies: 120 },
  { year: "2023", companies: 150 },
  { year: "2024", companies: 200 },
];

function DashboardGovII() {
  return (
    <div className={style["dashboard-container"]}>
      <h1 className={style["dashboard-title"]}>Dashboard - Programa Pró-Equidade</h1>

      {/* Cards de Resumo */}
      <div className={style["summary-cards"]}>
        <div className={style["card"]}>
          <h2>Empresas Aprovadas</h2>
          <p className={style["card-value"]}>150</p>
        </div>
        <div className={style["card"]}>
          <h2>Empresas Rejeitadas</h2>
          <p className={style["card-value"]}>45</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className={style["charts-container"]}>
        {/* Principais motivos de rejeição */}
        <div className={style["chart"]}>
          <h2>Principais Motivos de Rejeição</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rejectionData} layout="vertical" margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="reason" type="category" />
              <Tooltip />
              <Bar dataKey="percentage" fill="#ff4d4d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Evolução no número de adesões */}
        <div className={style["chart"]}>
          <h2>Evolução no Número de Adesões</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={adoptionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="companies" stroke="#007BFF" />
            </LineChart>
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
            <tr>
              <td>Empresa A</td>
              <td>Aprovada</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Empresa B</td>
              <td>Rejeitada</td>
              <td>Documentação incompleta</td>
            </tr>
            <tr>
              <td>Empresa C</td>
              <td>Rejeitada</td>
              <td>Critérios não atendidos</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardGovII;

