import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';  // Importando el CSS module

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.footerCategories}>
        <li><Link to="/posts/categories/Agriculture">Finanzas</Link></li>
        <li><Link to="/posts/categories/Business">Empresas</Link></li>
        <li><Link to="/posts/categories/Education">Educación</Link></li>
        <li><Link to="/posts/categories/Entertainment">Seguridad</Link></li>
        <li><Link to="/posts/categories/Art">Trading</Link></li>
        <li><Link to="/posts/categories/Investment">Inversiones</Link></li>
        <li><Link to="/posts/categories/Uncategorized">Sin Categoria</Link></li>
        <li><Link to="/posts/categories/Weather">Noticias</Link></li>
      </ul>
      <div className={styles.footerCopyright}>
        <small>Todos los derechos reservados</small>
      </div>
    </footer>
  );  
}

export default Footer;
