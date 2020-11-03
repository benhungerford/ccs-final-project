import React from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
  return (
    <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          {props.isLoggedIn === false ?
            <Link to="/login" className="nav-link">Login</Link>
          : <React.Fragment>
              <Link to="/" className="nav-link" onClick={props.handleLogout}>Logout</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
            </React.Fragment>
          }


    </nav>
  );
}

export default Nav;
