import React, { useState } from 'react';
import './SignIn.css';
import { UserService } from  '../../services/userService';
import { useNavigate } from "react-router-dom";

const userService = new UserService()

const SignIn = () => {
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
        navigate('/');
      else {
        throw Error;
      }
    })
    .catch(() => {
      setErrors(["Email or password is invalid"]);
    })
      
  }

  return (
    <div className='centerCenter'>
      <div className='loginPage'>
        <div>
          <h1 className='introduction'>Sign in</h1>
          <div>
              {
                errors.map((error) => 
                  (<h5 className='text-danger m-1'>{error}</h5>)
                  )
              }
          </div>
          <div className='input'>
            <input type="text" name='email' class="form-control" aria-label="Text input with checkbox" placeholder='Email' onChange={handleChange}/>
          </div>
          <div className='input'>
            <input type="password" name='password' class="form-control" aria-label="Text input with checkbox" placeholder='Password' onChange={handleChange}/>
          </div>
          <button class="btn btn-primary" type="button" onClick={signInCheck}>Sign in</button>
          <div className='d-flex'>
            <div className='m-1'>Don't have account?</div>
            <a href='/signup' className='m-1'>create now</a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignIn;
