import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo-ouca-minhA.png';
import style from'../Styles/Logo.module.css'; // Import the CSS file

const Logo = () => {
  return (
    <div className={style["logo-container"]}>
      <Link to="/Dashboard">
        <img src={logo} alt="Logo da empresa" className={style["logo-image"]} />
      </Link>
    </div>
  );
};

export default Logo;
