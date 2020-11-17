import React from 'react';
import { Link } from 'react-router-dom';


function Nav(props) {
  return (
    <nav id="navbar" className="navbar">

          {props.isLoggedIn === false ?
            <React.Fragment>
              <div className="nav justify-content-start">
                <Link to="/" id="home-button" className="navbar-brand">Home</Link>
              </div>
            </React.Fragment>
          : <React.Fragment>
              <div className="nav justify-content-start">
                <Link to="/profile" id="home-button" className="navbar-brand">Home</Link>
              </div>
              <div className="nav justify-content-end">
                <Link to="/" id="logout-button"className="nav-link" onClick={props.handleLogout}>Logout</Link>
              </div>
            </React.Fragment>
          }
          
    </nav>
  );
}

export default Nav;
