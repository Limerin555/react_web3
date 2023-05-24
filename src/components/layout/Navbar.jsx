// import React, { useEffect } from 'react';
// import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const history = useHistory();
  // const location = useLocation();

  return (
    <header id="navbar" className="mb-auto">
      <div>
        <h3 className="float-md-start mb-0">Cover</h3>
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
