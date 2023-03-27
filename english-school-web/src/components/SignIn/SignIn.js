import React, { useState } from 'react';
import './SignIn.css';
import { UserService } from  '../../services/userService';

const userService = new UserService()

const SignIn = () => {
  const [user, setUser] = useState({
    login: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const signInCheck = () => {
      userService.token(user);
  }

  return (
    <div className='horizontalCenter'>
      <div className='loginPage verticalCenter'>
        <div>
          <h1>Sign in</h1>
          <div className='input'>
            <input type="text" name='login' class="form-control" aria-label="Text input with checkbox" placeholder='Login' onChange={handleChange}/>
          </div>
          <div className='input'>
            <input type="password" name='password' class="form-control" aria-label="Text input with checkbox" placeholder='Password' onChange={handleChange}/>
          </div>
          <button class="btn btn-primary" type="button" onClick={signInCheck}>Sign in</button>
          <div className='d-flex'>
            <div>Don't have account?</div>
            <a href='/signup'>create now</a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignIn;
