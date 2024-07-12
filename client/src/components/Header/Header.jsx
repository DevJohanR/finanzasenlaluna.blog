import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import styles from './Header.module.css';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { UserContext } from '../../context/userContext';

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const handleResize = () => {
      setIsNavShowing(window.innerWidth > 800);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleNav = () => {
    setIsNavShowing(!isNavShowing);
  };

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    }
  };

  return (
    <nav>
      <div className={`${styles.navContainer} ${styles.container}`}>
        <Link to="/" className={styles.navLogo}>
          <img src={Logo} alt="Navbar Logo" style={{ display: 'block', objectFit: 'cover', width: '100%' }} />
        </Link>
        <button className={styles.navToggleBtn} onClick={toggleNav}>
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
        <ul className={`${styles.navMenu} ${isNavShowing ? styles.show : ''}`}>
          {currentUser?.id ? (
            <>
              <li><Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler}>{currentUser.name}</Link></li>
              <li><Link to="/create" onClick={closeNavHandler}>Crear publicación</Link></li>
              <li><Link to="/authors" onClick={closeNavHandler}>Autores</Link></li>
              <li><Link to="/logout" onClick={closeNavHandler}>Cerrar sesión</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/authors" onClick={closeNavHandler}>Autores</Link></li>
              <li><Link to="/login" onClick={closeNavHandler}>Iniciar sesión</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
