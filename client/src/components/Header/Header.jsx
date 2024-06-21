import React from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link de react-router-dom
import Logo from '../images/logo.png';
import styles from './Header.module.css'; // Importando el CSS module
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'

const Header = () => {
  return (
    <nav>
      <div className={`${styles.navContainer} ${styles.container}`}>
        <Link to="/" className={styles.navLogo}>
          <img src={Logo} style={{display:'block', objectFit:'cover', width:'100%'}} alt="Navbar Logo" />
        </Link>
        <ul className={styles.navMenu}>
          <li><Link to="/profile">Ernest Achiever</Link></li>
          <li><Link to="/create">Create Post</Link></li>
          <li><Link to="/authors">Authors</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
        <button className={styles.navToggleBtn}>
        <AiOutlineClose/>
        </button>
      </div>
    </nav>
  );
}

export default Header;






