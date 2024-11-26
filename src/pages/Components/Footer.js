import React from 'react'
import style from "../Styles/Footer.module.css";
const Footer = () => {
  return (
    <div>

    <div className={style['footerContainer']}>
    <a className={style['linkFooter']} href="https://github.com/Klaudio0707/oucaMinhVoz.git" target="_blank" rel="noopener noreferrer">
    <p className={style['TextFooter']} >Todos os direitos reservados a <strong>Ouca Minha Voz</strong></p>
      </a>
    </div>
    </div>
  )
}

export default Footer;
