import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";

import Footer from "../pages/Components/Footer";
import style from "./Styles/Dashboard_Governo.module.css"; // Certifique-se de ter os estilos necessários

function DashboardGoverno() {
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulando dados do administrador
  useEffect(() => {
    setUserData({
      nomeRepresentante: "Administrador",
      email: "admin@governo.br",
      senha: "123456",
      cnpj: "12345678000190"
    });
  }, []);

  // Buscar usuários cadastrados do banco db.json
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5001/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Erro ao buscar usuários.");
        }
      } catch (err) {
        console.error("Erro ao conectar ao banco:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Redirecionar para DashboardGovernoII
  const handleRedirect = () => {
    navigate("/DashboardGovernoII");
  };

  return (
    <div>
      <div className={style["dashboard-container"]}>
        {/* Barra superior com informações do usuário */}
        <div className={style["user-bar"]}>
          <div>
            <strong>Bem-vindo, {userData.nomeRepresentante || "Usuário"}!</strong>
            <br />
            <span>
              <strong>Administrador:</strong> Governo
            </span>
          </div>
          <div className={style["user-email"]}>
            {userData.email || "Email não informado"}
          </div>
          <strong>CNPJ: {userData.cnpj || "CNPJ não informado"}</strong>
        </div>

        {/* Exibir contagem de usuários cadastrados */}
        <div className={style["stats-container"]}>
          <h3>Usuários cadastrados: {loading ? "Carregando..." : users.length}</h3>
        </div>

        {/* Botão para acessar DashboardGovernoII */}
        <div className={style["link-list"]}>
          <button className={style["card"]} onClick={handleRedirect}>
            Ir para DashboardGovernoII
          </button>
        </div>
      </div>
<Footer/>
    </div>
  );
}

export default DashboardGoverno;
