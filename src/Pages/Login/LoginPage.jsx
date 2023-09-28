import { useState } from 'react';
import './Login.css'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToSessionStorage, changeLogin } from '../../redux/slices/loginSlice';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const changeHandler = (e) => {
        setCredentials(prev => {
            return ({ ...prev, [e.target.name]: e.target.value });
        })
    }
    const clickHandler = () => {
        setShowPass(!showPass);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if (localStorage.getItem('user-details')) {
            const arr = JSON.parse(localStorage.getItem('user-details'));
            const index = arr?.findIndex(element => element.email === credentials.email && element.password === credentials.password);
            if (index === -1) {
                toast.error('Invalid Credentials')
            }
            else {
                toast.success('Logged In');
                dispatch(changeLogin(true));
                dispatch(addToSessionStorage(credentials));
                navigate('/search');
                setCredentials({ email: '', password: '' });
            }
        }
        else {
            toast.error('No User Found');
        }
    }
    return (
        <div className='login-container'>
            <div>
                <h1>LogIn</h1>
                <form onSubmit={submitHandler}>
                    <div className='form-item'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            value={credentials.email}
                            onChange={changeHandler}
                            name='email'
                            id='email'
                            autoComplete='email'
                            required
                        />
                    </div>
                    <div className='form-item'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type={showPass ? 'text' : 'password'}
                            value={credentials.password}
                            onChange={changeHandler}
                            name='password'
                            id='password'
                            autoComplete='password'
                            required
                        />
                        {showPass ?
                            (
                                <span onClick={clickHandler}><AiOutlineEyeInvisible /></span>
                            ) :
                            (
                                <span onClick={clickHandler}><AiOutlineEye /></span>
                            )}
                    </div>
                    <button type='submit' className='btn'>Log In</button>
                </form>
                <p>
                    <span>Don't have an Account</span><span onClick={() => navigate('/signup')} className='signup'>Sign Up</span>
                </p>
            </div>
        </div>
    );
}
export default LoginPage;