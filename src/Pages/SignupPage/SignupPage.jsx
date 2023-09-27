import { useState } from 'react';
import './SignupPage.css'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { toast } from 'react-hot-toast';

const SignupPage = () => {
    const [userDetail, setuserDetail] = useState({ email: '', password: '', confirm: '' });
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
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
            const arr = JSON.parse(localStorage.getItem('user-details'));
            const index = arr?.findIndex(item => item.email === userDetail.email);
            if (index !== -1)
                toast.error('Account with same Email Exists');
            else {
                arr.push({ email: userDetail.email, password: userDetail.password });
                toast.success('Account Successfully Created');
                localStorage.setItem('user-details',JSON.stringify(arr));
            }
        }
    }
    return (
        <div className='signup-container'>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmFor='email'>Email</label>
                    <input
                        type='email'
                        value={userDetail.email}
                        onChange={changeHandler}
                        name='email'
                        id='email'
                        required
                    />
                </div>
                <div>
                    <label htmFor='password'>Password</label>
                    <input
                        type={showPass ? 'text' : 'password'}
                        value={userDetail.password}
                        onChange={changeHandler}
                        name='password'
                        id='password'
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
                    <label htmFor='confirm'>Confirm password</label>
                    <input
                        type={showConfirmPass ? 'text' : 'password'}
                        value={userDetail.confirm}
                        onChange={changeHandler}
                        name='confirm'
                        id='confirm'
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
                <input type='submit' />
            </form>
        </div>
    );
}
export default SignupPage;