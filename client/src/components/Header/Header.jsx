import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar Link de react-router-dom
import Logo from '../images/logo.png';
import styles from './Header.module.css'; // Importando el CSS module
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'

import { UserContext } from '../../context/userContext';

const Header = () => {

  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false)
  const {currentUser} = useContext(UserContext)

  const closeNavHandler = () =>{
    if(window.innerWidth < 800){
      setIsNavShowing(false);
    }else {
      setIsNavShowing(true)
    }
  }

  return (
    <nav>
      <div className={`${styles.navContainer} ${styles.container}`}>
        <Link to="/" className={styles.navLogo}>
          <img src={Logo} style={{display:'block', objectFit:'cover', width:'100%'}} alt="Navbar Logo" />
        </Link>
       { currentUser?.id && isNavShowing && <ul className={styles.navMenu}>
          <li><Link to="/profile/sdfsdf" onClick={closeNavHandler} >{currentUser?.name}</Link></li>
          <li><Link to="/create" onClick={closeNavHandler}>Crear publicación</Link></li>
          <li><Link to="/authors" onClick={closeNavHandler}>Autores</Link></li>
          <li><Link to="/logout" onClick={closeNavHandler}>Cerrar sesión</Link></li>
        </ul>} 
        {!currentUser?.id && isNavShowing && <ul className={styles.navMenu}>
          <li><Link to="/authors" onClick={closeNavHandler}>Autores</Link></li>
          <li><Link to="/login" onClick={closeNavHandler}>Cerrar sesión</Link></li>
        </ul>} 
        <button className={styles.navToggleBtn}>
        <AiOutlineClose/>
        </button>
      </div>
    </nav>
  );
}

export default Header;






