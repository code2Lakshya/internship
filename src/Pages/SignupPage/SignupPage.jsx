import { useState } from 'react';
import './SignupPage.css';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const specialCharacter = '!@#$%^&*()_+[]{}|;:,.<>?';
const SignupPage = () => {
    const [userDetail, setuserDetail] = useState({ email: '', password: '', confirm: '' });
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const navigate=useNavigate();
    const changeHandler = (e) => {
        setuserDetail(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const clickHandler = (id) => {
        if (id === 'pass')
            setShowPass(prev => !prev);
        else
            setShowConfirmPass(prev => !prev);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if (userDetail.password !== userDetail.confirm)
            toast.error('Password Mismatch');
        else {
            if (validatePassword()) {
                const arr = JSON.parse(localStorage.getItem('user-details'));
                if (arr === null) {
                    localStorage.setItem('user-details', JSON.stringify([{ email: userDetail.email, password: userDetail.password }]));
                    toast.success('Account Successfully Created');
                    setuserDetail({ email: '', password: '', confirm: '' })
                }
                else {
                    console.log(arr);
                    const index = arr?.findIndex(item => item.email === userDetail.email);
                    if (index !== -1)
                        toast.error('Account with same Email Exists');
                    else {
                        arr.push({ email: userDetail.email, password: userDetail.password });
                        toast.success('Account Successfully Created');
                        localStorage.setItem('user-details', JSON.stringify(arr));
                        setuserDetail({ email: '', password: '', confirm: '' })
                    }
                }
            }
        }
    }
    const validatePassword = () => {
        const arr = userDetail.password.split('');
        console.log(arr);
        if (arr.length < 11) {
            toast.error('Minimum Length 12 Characters');
            return 0;
        }
        else if (arr.includes(' ')) {
            toast.error('Spaces Not allowed');
            return 0;
        }
        else if (arr.findIndex(element => element.charCodeAt(0) > 64 && element.charCodeAt(0) < 91) === -1) {
            toast.error('Include minimum 1 capital letter');
            return 0;
        }
        else if (arr.findIndex(e => e.charCodeAt(0) > 96 && e.charCodeAt(0) < 123) === -1) {
            toast.error('Include minimum 1 small letter');
            return 0;
        }
        else if (arr.findIndex(element => specialCharacter.split('').findIndex(item => item === element) !== -1) === -1) {
            toast.error('Include 1 special Character');
            return 0;
        }
        else
            return 1;
    }
    return (
        <div className='signup-container'>
        <div>
        <h1>Signup</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        value={userDetail.email}
                        onChange={changeHandler}
                        name='email'
                        id='email'
                        autoComplete='email'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type={showPass ? 'text' : 'password'}
                        value={userDetail.password}
                        onChange={changeHandler}
                        name='password'
                        id='password'
                        autoComplete='password'
                        required
                    />
                    {showPass ?
                        (
                            <span onClick={() => clickHandler('pass')}><AiOutlineEyeInvisible /></span>
                        ) :
                        (
                            <span onClick={() => clickHandler('pass')}><AiOutlineEye /></span>
                        )}
                </div>
                <div>
                    <label htmlFor='confirm'>Confirm password</label>
                    <input
                        type={showConfirmPass ? 'text' : 'password'}
                        value={userDetail.confirm}
                        onChange={changeHandler}
                        name='confirm'
                        id='confirm'
                        autoComplete='password'
                        required
                    />
                    {showConfirmPass ?
                        (
                            <span onClick={() => clickHandler('confirmPass')}><AiOutlineEyeInvisible /></span>
                        ) :
                        (
                            <span onClick={() => clickHandler('confirmPass')}><AiOutlineEye /></span>
                        )}
                </div>
                <button type='submit' className='btn'>Sign In</button>
            </form>
            <p>
                <span>Already Have a Account ?</span><span onClick={()=> navigate('/login')} className='login'>Log In</span>
            </p>
        </div>
        </div>
    );
}
export default SignupPage;