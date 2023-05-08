import React, { useEffect, useState } from 'react';
import './Profile.scss'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { UserService } from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({
    login: '',
    englishLevel: '',
    userName: '',
    image: '',
    phone: '',
    email: '',
    birthplace: ''
  });

  useEffect(() => {
    if(sessionStorage.getItem('userImage')) {
      setUser({ ...user, image: sessionStorage.getItem('userImage') });
      let userService = new UserService();
      userService.getProfile().then(data => {
        let currentUserData = {
          login: data.login,
          password: '',
          userName: data.userName,
          image: data.image,
          phone: data.phone,
          email: data.email,
          birthplace: data.birthplace,
          englishLevel: data.englishLevel
        }
        setUser(currentUserData);
      })
    }
    else {
      navigate('/login');
    }
  }, [])

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    // let userService = new UserService();
    // userService.updateProfile(user).then(() => {
    //   navigate(0);
    // })
  };

  const userExit = () => {
    sessionStorage.setItem("accessToken", "");
    sessionStorage.getItem("username", "");
    navigate('/r/true');
  }

  return (
    <div className='centerCenter text-center'>
      <div>
        <form className=""  onSubmit={handleSubmit}>
            <h1 className='signH introduction'>Profile</h1>
            <div className='d-flex justify-content-center'>
              <div>
                <div className='img-full-div '>
                  <img src={ user.image } className='rounded-circle img-full'></img>
                </div>
                <select placeholder='Your English level' 
                        className='form-select mb-3'
                        id="englishLevel" 
                        name="englishLevel" 
                        value={user.englishLevel} 
                        onChange={handleChange}>
                  <option value='A1'>A1</option>
                  <option value='A2'>A2</option>
                  <option value='B1'>B1</option>
                  <option value='B2'>B2</option>
                  <option value='C1'>C1</option>
                  <option value='C2'>C2</option>
                </select>
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
                            <input type="text" 
                                    className="form-control" 
                                    id="userName" 
                                    name="userName"
                                    value={user.userName} 
                                    placeholder='Name'
                                    onChange={handleChange} 
                                    required/>
                        </div>
                        <div className="mb-3 regInput">
                            <input type="text" 
                                    className="form-control" 
                                    id="birthplace" 
                                    name="birthplace"
                                    value={user.birthplace} 
                                    placeholder='Where are you from?'
                                    onChange={handleChange} />
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
                
                

                <div className='mb-2 mt-2'>
                  <button className="btn btn-primary submit-btn" type='submit'>Save changes</button>
                </div>

                <div className='d-flex justify-content-center'>                  
                  <button className='mb-2  btn btn-secondary submit-btn'
                          onClick={() => navigate('/changePassword')}>Change password</button>
                </div>
                
                <div>
                  <button className="btn btn-danger submit-btn" onClick={userExit}>Exit</button>
                </div>
          </form>
        </div>
        <div>

        </div>
    </div>
);
}

export default Profile;