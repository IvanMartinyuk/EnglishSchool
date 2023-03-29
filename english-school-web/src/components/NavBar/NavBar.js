import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css'

const NavBar = () => {
  const [link, setLink] = useState("/login");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if(sessionStorage.getItem("accessToken").length > 0) {
        setLink('/profile');
        setUserName(sessionStorage.getItem("username"));
    }
    else {
      setLink('/login');
      setUserName("");
    }
  })

  return (
    <nav class="navbar navbar-expand-lg navBar">
      <div class="container-fluid">
        <a class="navlink navbar-brand" href="/">EnglishSchool</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
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
          <div className='userNameDiv'>{userName}</div>
          <a className="loginLink" href={link}>
            <FontAwesomeIcon icon={faUser} size="2xl"/>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;