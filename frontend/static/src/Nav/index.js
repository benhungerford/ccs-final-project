import React from 'react';
import { Link } from 'react-router-dom';
import Event from './../Event';


function Nav(props) {
  return (
    <nav id="navbar" className="navbar">
          <Link to="/" className="navbar-brand">Home</Link>
          {props.isLoggedIn === false ?
            <React.Fragment className="justify-content-end">
              <div className="nav justify-content-end">
                <Link to="/login" className="nav-link">Login</Link>
              </div>
            </React.Fragment>


          : <React.Fragment>
              <div className="nav justify-content-end">
                <Link to="/" className="nav-link" onClick={props.handleLogout}>Logout</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
                <Event />
              </div>
            </React.Fragment>
          }


    </nav>
  );
}

export default Nav;
