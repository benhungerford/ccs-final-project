import React from 'react';
import { Link } from 'react-router-dom';


function Home(props) {
  return(
    <div className="row justify-content-center text-center mt-3 home">
      <h2 id="home-logo" className="col-sm-12 col-12">Table</h2>
      <Link to="/register" className="col-sm-12 col-12 nav-link">Register</Link>
      <Link to="/login" className="col-sm-12 col-12 nav-link">Login</Link>
    </div>
  )

}

export default Home;
