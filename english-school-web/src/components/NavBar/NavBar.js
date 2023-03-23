import React from 'react';
import './NavBar.css'

const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg navBar">
      <div class="container-fluid">
        <a class="navlink navbar-brand" href="/">EnglishSchool</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="navlink nav-link" href="/courses">Courses</a>
                    </li>
                    <li className="nav-item">
                        <a className="navlink nav-link" href="/calendar">Calendar</a>
                    </li>
                    <li className="nav-item">
                        <a className="navlink nav-link" href="/tutors">Tutors</a>
                    </li>
                </ul>
                <a className="loginLink" href="/login">Login</a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;