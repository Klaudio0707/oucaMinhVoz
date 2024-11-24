import React from 'react';
import { Link } from 'react-router-dom';
import { FaPaperPlane, FaFileAlt, FaTachometerAlt, FaClipboardList, FaUserPlus, FaClipboardCheck, FaChartLine } from 'react-icons/fa';
import style from './Styles/dashBoard.module.css';

function Dashboard() {
  // Simulação de progresso
  const progressData = {
    totalSteps: 5, // Total de passos necessários
    completedSteps: 3, // Passos já concluídos
  };

  const progressPercentage = (progressData.completedSteps / progressData.totalSteps) * 100;

  const links = [
    { to: "/Form-Envio", label: "Enviar Documento", icon: <FaPaperPlane /> },
    { to: "/Status", label: "Ver Status dos Documentos", icon: <FaFileAlt /> },
    { to: "/DashboardGovernoII", label: "Dashboard Governo2", icon: <FaTachometerAlt /> },
    { to: "/DashboardGoverno", label: "Dashboard Governo", icon: <FaTachometerAlt /> },
    { to: "/ProgramaEquidadeForm", label: "Inscrição", icon: <FaClipboardList /> },
    { to: "/Register", label: "Cadastro", icon: <FaUserPlus /> },
    { to: "/FichaInteresse", label: "Ficha de Interesse", icon: <FaClipboardCheck /> },
    { to: "/PlanoAcao", label: "Plano de Ação", icon: <FaChartLine /> },
  ];

  return (
    <div className={style["dashboard-container"]}>
      <h2>Dashboard</h2>
      
      {/* Barra de Progresso */}
      <div className={style["progress-bar-container"]}>
        <div className={style["progress-bar"]} style={{ width: `${progressPercentage}%` }}>
          <span className={style["progress-text"]}>{`Cadastro em andamento: ${progressPercentage.toFixed(0)}%`}</span>
        </div>
      </div>

      <div className={style["link-list"]}>
        {links.map((link, index) => (
          <Link key={index} to={link.to} className={style["card"]}>
            <div className={style["icon"]}>{link.icon}</div>
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;




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

