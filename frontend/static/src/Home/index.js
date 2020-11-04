import React from 'react';
import { Link } from 'react-router-dom';


function Home(props) {
  return(
    <React.Fragment>
      <h2>Home Page</h2>
      <Link to="/register" className='nav-link'>Register</Link>
      <Link to="/form" className='nav-link'>Create Form</Link>
    </React.Fragment>
  )

}

export default Home;
