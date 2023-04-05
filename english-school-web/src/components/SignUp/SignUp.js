import React, { useEffect, useState } from 'react';
import './SignUp.scss'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { UserService } from '../../services/userService';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [user, setUser] = useState({
    login: '',
    password: '',
    userName: '',
    image: 'https://simg.nicepng.com/png/small/128-1280406_view-user-icon-png-user-circle-icon-png.png',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let userService = new UserService();
        userService.registration(user).then(resp => {
            if(resp.ok === true) {
                navigate('/login')
            }
            else {
                resp.json().then(data => {
                    setErrors(data);
                })
            }
        })
    
  };

  return (
    <div className='centerCenter'>
        <form className=""  onSubmit={handleSubmit}>
            
            <h1 className='signH introduction'>Sign up</h1>   
            <div className='d-flex justify-content-center'>
              <div className='img-full-div '>
                <img src={ user.image } className='rounded-circle img-full'></img>
              </div>
            </div>       
            {errors.length > 0 && (
                    <div className="alert alert-danger">{
                        errors.map((error) => (
                            <div>{error}</div>
                        ))
                    }</div>
                )}
                <div className='d-flex justify-content-center gapInput'>
                    <div>
                        <div className="mb-3 regInput">
                            <input type="text" 
                                    className="form-control" 
                                    id="login" 
                                    name="login" 
                                    value={user.login} 
                                    onChange={handleChange}
                                    placeholder='Login'
                                    required />
                        </div>
                        <div className="mb-3 regInput">
                            <input type="password" 
                                    className="form-control" 
                                    id="password" 
                                    name="password" 
                                    value={user.password} 
                                    onChange={handleChange}
                                    placeholder='Password'
                                    required />
                        </div>
                        <div className="mb-3 regInput">
                            <input type="text" 
                                    className="form-control" 
                                    id="userName" 
                                    name="userName"
                                    value={user.name} 
                                    placeholder='Name'
                                    onChange={handleChange} 
                                    required/>
                        </div>
                        </div>
                    <div>
                      <div className='d-flex regInput align-items-center'>
                        
                        <div className="mb-3">
                          <input type="text" 
                                  className="form-control" 
                                  id="image" 
                                  name="image" 
                                  value={user.image}
                                  placeholder='Image url'
                                  onChange={handleChange} />
                          </div>  
                      </div>
                        <div className="mb-3 regInput">
                            <PhoneInput country={'ua'}
                                        placeholder="Phone" 
                                        inputClass="regInput"
                                        inputStyle={{width: 200 + "px"}}
                                        value={user.phone} 
                                        onChange={phone => handleChange({ 
                                            target: { name: "phone", value: phone }} )}/>
                        </div>
                        <div className="mb-3 regInput">
                            <input type="email" 
                                    className="form-control" 
                                    id="email" 
                                    name="email" 
                                    value={user.email}
                                    placeholder='Email'
                                    onChange={handleChange} 
                                    required/>
                        </div>
                    </div>
                </div>
                
                <button className="btn btn-primary" type='submit'>Sign up</button>
        </form>
    </div>
);
}

export default SignUp;