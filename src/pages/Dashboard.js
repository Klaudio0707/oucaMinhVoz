import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPaperPlane, FaFileAlt,  FaClipboardList, FaUserPlus, FaClipboardCheck, FaChartLine } from 'react-icons/fa';
import style from './Styles/dashBoard.module.css';
import Footer from "./Components/Footer.js";
import api from '../apiFake/api.js';

function Dashboard() {
  const [progress, setProgress] = useState({ totalSteps: 5, completedSteps: 0 });
  const [userData, setUserData] = useState({ nome: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [formsSubmitted, setFormsSubmitted] = useState(0); // Novo estado para formulários enviados

  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await api.users.get(); // Simula a busca de dados do usuário
        setUserData(user);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }
    fetchUserData();
  }, []);

  const handleFormSubmit = () => {
    // Simula o envio de um formulário
    setLoading(true);
    setTimeout(() => {
      setFormsSubmitted((prev) => prev + 1); // Atualiza a contagem de formulários enviados
      setLoading(false);
    }, 1000); // Simula um atraso no envio
  };

  useEffect(() => {
    // Atualiza o progresso toda vez que a contagem de formulários enviados mudar
    setProgress((prev) => ({
      ...prev,
      completedSteps: formsSubmitted,
    }));
  }, [formsSubmitted]);

  const progressPercentage = (progress.completedSteps / progress.totalSteps) * 100;

  const links = [
    { to: "/Form-Envio", label: "Enviar Documento", icon: <FaPaperPlane />, action: handleFormSubmit },
    { to: "/Status", label: "Ver Status dos Documentos", icon: <FaFileAlt /> },
  
   
    { to: "/InscricaoPrograma", label: "Inscrição", icon: <FaClipboardList /> },
    { to: "/Dados", label: "Dados", icon: <FaUserPlus /> },
    { to: "/FichaInteresse", label: "Ficha de Interesse", icon: <FaClipboardCheck /> },
    { to: "/PlanoAcao", label: "Plano de Ação", icon: <FaChartLine /> },
  ];

  return (
    <div>

    <div className={style["dashboard-container"]}>
      {/* Barra superior com informações do usuário */}
      <div className={style["user-bar"]}>
        <div>
          <strong>Bem-vindo, {userData.nomeRepresentante || "Usuário"}!</strong>
          <br />
          <span>
            <strong>Empresa:</strong>{" "}
            {userData.nomeEmpresa?.split(" ").slice(0, 2).join(" ") || "Empresa"}
          </span>
        </div>
        <div className={style["user-email"]}>{userData.email || "Email não informado"}</div>
        <strong>CNPJ: {userData.cnpj?.split(" ").slice(0, 3).join(".") || "cnpj"}</strong>
      </div>

      {/* Barra de progresso centralizada */}
      <div className={style["progress-bar-container"]}>
        <div
          className={style["progress-bar"]}
          style={{ width: `${progressPercentage}%` }}
        >
          <span className={style["progress-text"]}>
            {`Cadastro em andamento: ${progressPercentage.toFixed(0)}%`}
          </span>
        </div>
      </div>

      {/* Links em forma de cards */}
      <div className={style["link-list"]}>
        {links.map((link, index) => (
          <Link
          key={index}
          to={link.to}
          className={style["card"]}
          onClick={link.action || null}
          >
            <div className={style["icon"]}>{link.icon}</div>
            <span>
              {loading && link.to === "/Form-Envio" ? "Enviando..." : link.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
      <Footer/>
</div>
  );
}

export default Dashboard;






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

