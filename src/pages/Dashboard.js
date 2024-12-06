import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
        const apiUrl = process.env.REACT_APP_API_URL; // Obtém a URL da API a partir do arquivo .env
        const response = await fetch(`${apiUrl}/users`); // Use a URL configurada no .env
        if (!response.ok) {
          throw new Error('Erro ao buscar usuários');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Erro ao conectar ao banco:", err);
        setUsers([]); // Garantir que não haja dados incorretos ou em branco
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Redirecionar para DashboardGovernoII
  const handleRedirectDash = () => {
    navigate("/DashboardGovernoII");
  };

  const handleRedirectServ = () => {
    navigate("/Suport");
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
              <strong>Ministério:</strong> Ministério do Trabalho
            </span>
          </div>
          <div className={style["user-email"]}>
            {userData.email || "Email não informado"}
          </div>
        </div>

        {/* Exibir contagem de usuários cadastrados */}
        <div className={style["stats-container"]}>
          <h3>
            Usuários cadastrados: {loading ? "Carregando..." : users.length}
          </h3>
        </div>

        {/* Botões de navegação */}
        <div className={style["link-list"]}>
          <button className={style["card"]} onClick={handleRedirectDash}>
            DashboardGoverno
          </button>
          <button className={style["card"]} onClick={handleRedirectServ}>
            Serviços e Suporte
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardGoverno;







// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaPaperPlane, FaFileAlt, FaTachometerAlt, FaClipboardList, FaUserPlus, FaClipboardCheck, FaChartLine } from 'react-icons/fa';
// import style from './Styles/dashBoard.module.css';

// function Dashboard() {
  //   // Simulação de progresso
  //   const progressData = {
    //     totalSteps: 5, // Total de passos necessários
    //     completedSteps: 3, // Passos já concluídos
    //   };
    
    //   const progressPercentage = (progressData.completedSteps / progressData.totalSteps) * 100;

//   const links = [
//     { to: "/Form-Envio", label: "Enviar Documento", icon: <FaPaperPlane /> },
//     { to: "/Status", label: "Ver Status dos Documentos", icon: <FaFileAlt /> },
//     { to: "/DashboardGovernoII", label: "Dashboard Governo2", icon: <FaTachometerAlt /> },
//     { to: "/DashboardGoverno", label: "Dashboard Governo", icon: <FaTachometerAlt /> },
//     { to: "/ProgramaEquidadeForm", label: "Inscrição", icon: <FaClipboardList /> },
//     { to: "/Register", label: "Cadastro", icon: <FaUserPlus /> },
//     { to: "/FichaInteresse", label: "Ficha de Interesse", icon: <FaClipboardCheck /> },
//     { to: "/PlanoAcao", label: "Plano de Ação", icon: <FaChartLine /> },
//   ];

//   return (
//     <div className={style["dashboard-container"]}>
//       <h2>Dashboard</h2>
      
//       {/* Barra de Progresso */}
//       <div className={style["progress-bar-container"]}>
//         <div className={style["progress-bar"]} style={{ width: `${progressPercentage}%` }}>
//           <span className={style["progress-text"]}>{`Cadastro em andamento: ${progressPercentage.toFixed(0)}%`}</span>
//         </div>
//       </div>

//       <div className={style["link-list"]}>
//         {links.map((link, index) => (
//           <Link key={index} to={link.to} className={style["card"]}>
//             <div className={style["icon"]}>{link.icon}</div>
//             <span>{link.label}</span>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;




// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaPaperPlane, FaFileAlt, FaTachometerAlt, FaClipboardList, FaUserPlus, FaClipboardCheck, FaChartLine } from 'react-icons/fa'; // Exemplos de ícones
// import style from './Styles/dashBoard.module.css';  // Importando o arquivo CSS

// function Dashboard() {
//   const links = [
//     { to: "/Form-Envio", label: "Enviar Documento", icon: <FaPaperPlane /> },
//     { to: "/Status", label: "Ver Status dos Documentos", icon: <FaFileAlt /> },
//     { to: "/DashboardGovernoII", label: "Dashboard Governo2", icon: <FaTachometerAlt /> },
//     { to: "/DashboardGoverno", label: "Dashboard Governo", icon: <FaTachometerAlt /> },
//     { to: "/ProgramaEquidadeForm", label: "Inscrição", icon: <FaClipboardList /> },
//     { to: "/Register", label: "Cadastro", icon: <FaUserPlus /> },
//     { to: "/FichaInteresse", label: "Ficha de Interesse", icon: <FaClipboardCheck /> },
//     { to: "/PlanoAcao", label: "Plano de Ação", icon: <FaChartLine /> },
//   ];

//   return (
//     <div className={style["dashboard-container"]}>
//       <h2>Dashboard</h2>
//       <div className={style["link-list"]}>
//         {links.map((link, index) => (
//           <Link key={index} to={link.to} className={style["card"]}>
//             <div className={style["icon"]}>{link.icon}</div>
//             <span>{link.label}</span>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

