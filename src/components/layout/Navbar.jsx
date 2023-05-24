// import React, { useEffect } from 'react';
// import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const history = useHistory();
  // const location = useLocation();

  return (
    <header id="navbar" className="mb-auto">
      <div>
        <Link className="navbar-brand float-md-start mb-0" to="/">
          <h3>Pew 3x</h3>
        </Link>
        <nav className="nav nav-masthead justify-content-center float-md-end">
          <Link className="nav-link active" to="/">Home</Link>
          <Link className="nav-link" to="/features">Features</Link>
          <Link className="nav-link" to="/contact">Contact</Link>
          {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
