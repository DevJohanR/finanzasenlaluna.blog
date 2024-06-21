import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';  // Importando el CSS module

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.footerCategories}>
        <li><Link to="/posts/categories/Agriculture">Agriculture</Link></li>
        <li><Link to="/posts/categories/Business">Business</Link></li>
        <li><Link to="/posts/categories/Education">Education</Link></li>
        <li><Link to="/posts/categories/Entertainment">Entertainment</Link></li>
        <li><Link to="/posts/categories/Art">Art</Link></li>
        <li><Link to="/posts/categories/Investment">Investment</Link></li>
        <li><Link to="/posts/categories/Uncategorized">Uncategorized</Link></li>
        <li><Link to="/posts/categories/Weather">Weather</Link></li>
      </ul>
      <div className={styles.footerCopyright}>
        <small>Todos los derechos reservados</small>
      </div>
    </footer>
  );  
}

export default Footer;
