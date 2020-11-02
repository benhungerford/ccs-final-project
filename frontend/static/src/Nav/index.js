import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Nav(props) {
  return (
    <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          {props.isLoggedIn === false ?
            <Link to="/login" className="nav-link">Login</Link>
          : <Link to="/" className="nav-link" onClick={props.handleLogout}>Logout</Link>
          }
          <Link to="/register" className='nav-link' onClick={props.handleRegistration}>Register</Link>


    </nav>
  );
}

export default Nav;
