import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './NavBar.scss'
import { useTranslation } from 'react-i18next';

const NavBar = () => {
  const [link, setLink] = useState("/login");
  const [userImageUrl, setUserImageUrl] = useState("https://simg.nicepng.com/png/small/128-1280406_view-user-icon-png-user-circle-icon-png.png");
  const [userName, setUserName] = useState("");
  const [language, setLanguage] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if(sessionStorage.getItem('currentLanguage')) {
      i18n.changeLanguage(sessionStorage.getItem('currentLanguage'));
      setLanguage(sessionStorage.getItem('currentLanguage'));
    }
    try {
      if(sessionStorage.getItem("accessToken").length > 0) {
          setLink('/profile');
          setUserName(sessionStorage.getItem("username"));
          setUserImageUrl(sessionStorage.getItem("userImage"));
      }
      else {
        setLink('/login');
        setUserName("");
      }
    }
    catch {

    }
  }, [])

  const languageHandler = (event) => {
    sessionStorage.setItem('currentLanguage', event.target.value);
    i18n.changeLanguage(event.target.value);
    setLanguage(event.target.value);
  }

  return (
    <nav class="navbar navbar-expand-lg navBar">
      <div class="container-fluid">
        <a class="navlink navbar-brand" href="/">EnglishSchool</a>
        <button class="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" 
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <a className="navlink nav-link" href="/about">{ t('About') }</a>
            </li>
            <li className="nav-item">
                <a className="navlink nav-link" href="/calendar">{ t("Calendar") }</a>
            </li>
            <li className="nav-item">
                <a className="navlink nav-link" href="/tutors">{ t("Meeting") }</a>
            </li>
            <li className="nav-item">
                <a className="navlink nav-link" href="/courses">{ t("Courses") }</a>
            </li>
          </ul>
          <div className='me-3'>
            <select onChange={languageHandler} 
                    className='form-select' 
                    value={ language }>
              <option value='en'>EN</option>
              <option value='ua'>UA</option>
            </select>
          </div>
          <div className='userNameDiv'>{userName}</div>
          <a className="img-full-navdiv loginLink" href={link}>
            <img src={ userImageUrl } className='rounded-circle img-full'></img>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;