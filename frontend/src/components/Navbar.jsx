import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
      backgroundColor: '#333',
      color: 'white',
      marginBottom: '1rem'
    }}>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
          Funniest Social Media Challenges
        </Link>
      </div>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
          Home
        </Link>
        <Link to="/challenges" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
          Challenges
        </Link>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
          About
        </Link>
        <Link to="/register" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
          Sign Up
        </Link>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
          Login
        </Link>
        <Link to="/test-auth" style={{ color: 'white', textDecoration: 'none' }}>
          Test Auth
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;