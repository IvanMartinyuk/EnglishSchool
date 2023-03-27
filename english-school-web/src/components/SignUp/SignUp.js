import React, { useState } from 'react';
import './SignUp.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { UserService } from '../../services/userService';


const SignUp = () => {
  const [user, setUser] = useState({
    login: '',
    password: '',
    userName: '',
    image: '',
    phone: '',
    email: ''
  });

  const handleChange = (event) => {
    console.log(event)
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    console.log(user);
    let userService = new UserService();
        userService.registration(user);
    
  };

  return (
    <div className='horizontalCenter'>
        <div className="container verticalCenter">
            <h1 className='signH'>Sign in</h1>
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
                                    onChange={handleChange} />
                        </div>
                        </div>
                    <div>
                        <div className="mb-3 regInput">
                            <input type="text" 
                                    className="form-control" 
                                    id="image" 
                                    name="image" 
                                    value={user.image}
                                    placeholder='Image url'
                                    onChange={handleChange} />
                        </div>
                        <div className="mb-3 regInput">
                            <PhoneInput country={'ua'}
                                        placeholder="Phone" 
                                        inputClass="regInput"
                                        inputStyle={{width: 200 + "px"}}
                                        value={user.phone} 
                                        onChange={phone => handleChange({ 
                                            target: { name: "phone", value: phone }} )}
                                        />
                        </div>
                        <div className="mb-3 regInput">
                            <input type="email" 
                                    className="form-control" 
                                    id="email" 
                                    name="email" 
                                    value={user.email}
                                    placeholder='Email'
                                    onChange={handleChange} />
                        </div>
                    </div>
                </div>
                
                
                <button className="btn btn-primary" onClick={handleSubmit}>Sign up</button>
        </div>
    </div>
);
}

export default SignUp;