import React from 'react';
import { Link } from 'react-router-dom';
import { TbBrandOpenai } from "react-icons/tb";
import '../App.css';


function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">

      {/* navbar */}
      {/* NOME DO SITE */}
      <div className="container-fluid">
        <Link className="navbar-brand " to="/"><strong>DevHelper AI</strong></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navegacao */}
        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav">
            {/* home */}
            <li className="nav-item">
              <Link className="nav-link" to="/"><u>Home</u></Link>
            </li>
            {/* ChatGPT */}
            <li className="nav-item">
              <Link className="nav-link" to="/chatgpt"><u>ChatGPT</u></Link>
            </li>
            {/* Saiba mais */}
            <li className="nav-item">
              <Link className="nav-link" to="/saiba"><u>Saiba mais</u></Link>
            </li>
            {/* Logo da openai */}
            <div >
              <TbBrandOpenai size={30} class="position-relative position-absolute top-30 end-0 mx-3 m-1"/>
              <br />

            </div>

          </ul>
          <hr />
        </div>
      </div>

    </nav>
  );
}

export default NavBar;