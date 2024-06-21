import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  const btnStyle = {
    display: 'inline-block',
    width: 'fit-content',
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radius-2)',
    background: isHovered ? 'var(--color-gray-900)' : 'var(--color-white)',
    color: isHovered ? 'var(--color-white)' : 'var(--color-text)', // Asumiendo que tienes una variable --color-text
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'var(--transition)'
  };

  const btnPrimaryStyle = {
    ...btnStyle,
    background: isHovered ? 'var(--color-gray-900)' : 'var(--color-gray-500)',
    color: 'var(--color-white)'
  };

  const centerStyle = {
    textAlign: 'center',
    paddingTop: '5rem',
    margin: 'auto',
    display: 'block',
    width: '100%'
  };

  const errorPageHeaderStyle = {
    marginTop: '3rem'
  };

  return (
    <section className="error-page">
      <div style={centerStyle}>
        <Link 
          to="/" 
          style={btnPrimaryStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Go Back Home
        </Link>
        <h2 style={errorPageHeaderStyle}>Page Not Found</h2>
      </div>
    </section>
  );
}

export default ErrorPage;
