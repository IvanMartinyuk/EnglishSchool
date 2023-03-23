import React, { useState } from 'react';
import './SignUp.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const SignUp = () => {
  const [user, setUser] = useState({
    login: '',
    password: '',
    name: '',
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
    event.preventDefault();
    console.log('User data:', user);
    // Perform actions with the user data, like sending it to a server
  };

  return (
    <div className='horizontalCenter'>
        <div className="container verticalCenter">
            <h1 className='signH'>Sign in</h1>
            <form onSubmit={handleSubmit}>
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
                                    id="name" 
                                    name="name"
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
                
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
);
}

export default SignUp;