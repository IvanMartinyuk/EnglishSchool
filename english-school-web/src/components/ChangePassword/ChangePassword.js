import { useState } from 'react';
import './ChangePassword.scss'
import { UserService } from '../../services/userService';

const ChangePassword = () => {
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [alertClasses, setAlertClasses] = useState('collapse');
    const [alertText, setAlertText] = useState('Passwords do not match');

    const errorClasses = "alert alert-danger";
    const successClasses = "alert alert-success";

    const errorPasswordMatchText = "Passwords do not match";
    const errorPasswordSaveText = "Password is not saved";
    const successPasswordSave = "Password is saved";

    const savePassword = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setAlertText(errorPasswordMatchText);
            setAlertClasses(errorClasses);
        }
        else {
            let userService = new UserService();
            userService.updatePassword(password).then(resp => {
                 if(resp) {
                    setAlertText(successPasswordSave);
                    setAlertClasses(successClasses);
                 }
                 else {
                    setAlertText(errorPasswordSaveText);
                    setAlertClasses(errorClasses);
                 }
            })
        }
    }

    return (
        <div className='centerCenter'>
            <form onSubmit={savePassword}>
                <div className={ alertClasses }>{ alertText }</div>
                <div>
                    <label className='d-block form-label fs-5 fw-semibold'>Enter password</label>
                    <input type='password' 
                           className='form-control' 
                           value={password} 
                           onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label className='d-block form-label fs-5 fw-semibold mt-2'>Confirm password</label>
                    <input type='password' 
                           className='form-control' 
                           value={confirmPassword} 
                           onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>
                <div className='d-flex justify-content-center mt-3'>
                    <button className='btn btn-primary fs-5' type='submit'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword;