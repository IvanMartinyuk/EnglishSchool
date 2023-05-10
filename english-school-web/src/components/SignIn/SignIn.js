import React, { useEffect, useState } from 'react';
import './SignIn.scss';
import { UserService } from  '../../services/userService';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const userService = new UserService()

const SignIn = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const signInCheck = () => {
    userService.token(user).then(response => {
      if(response === true)
        navigate('/r/true');
      else {
        throw Error;
      }
    })
    .catch(() => {
      setErrors([t("Email or password is invalid")]);
    })
      
  }

  const handleGoogleCallback = (response) => {
    const token = response.credential;
    let userService = new UserService();
    userService.googleLogin(token).then(resp => {
        if(resp === true)
          navigate('/r/true');
        else {
          throw Error;
        }
    })
    .catch(() => {
      setErrors([t("Sign in error")]);
    })
  }

  useEffect(() => {
      window.google.accounts.id.initialize({
        client_id: "563028021231-8cg802qel9rsn00ulcigncit5djik4ub.apps.googleusercontent.com",
        callback: handleGoogleCallback
      })

      
      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "medium"}
      )
  }, [])

  return (
    <div className='centerCenter text-center'>
      <div className='loginPage'>
        <div>
          <h1 className='introduction'>{ t('Sign in') }</h1>
          {errors.length > 0 && 
          <div className='alert alert-danger'>
          {
            errors.map((error) => 
                  (<div>{error}</div>)
                  )
              }
          </div>
          }
          <div className='input'>
            <input type="text" 
                   name='email' 
                   class="form-control" 
                   aria-label="Text input with checkbox" 
                   placeholder={ t('Email') } 
                   onChange={handleChange}/>
          </div>
          <div className='input'>
            <input type="password" 
                   name='password' 
                   class="form-control" 
                   aria-label="Text input with checkbox" 
                   placeholder={ t('Password') } 
                   onChange={handleChange}/>
          </div>
          <button class="btn btn-primary" type="button" onClick={signInCheck}>{ t('Sign in') }</button>
          <div className='d-flex'>
            <div className='m-1'>{ t("Don't have account?") }</div>
            <a href='/signup' className='m-1'>{ t('create now') }</a>
          </div>
          <div id='signInDiv' className='d-flex justify-content-center'></div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
