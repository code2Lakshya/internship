import { useState } from 'react';
import './Login.css'
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPass,setShowPass]=useState(false);
    const navigate=useNavigate();
    const changeHandler = (e) => {
        setCredentials(prev=>{
            return ({...prev,[e.target.name]:e.target.value});
        })
    }
    const clickHandler=()=>{
        setShowPass(!showPass);
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        if(localStorage.getItem('user-details')){
           const arr= JSON.parse(localStorage.getItem('user-details'));
          const index=arr.findIndex((element) => element.email===credentials.email && element.password===credentials.password);
          if(index!==-1){
            toast.error('Invalid Credentials')
          }
          else{
            toast.success('Logged In');
            navigate('/search');
            setCredentials({email:'',password: ''});
          }
        }
        else{
            toast.error('No User Found');
        }
    }
    console.log(credentials);
    return (
        <div className='login-container'>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmFor='email'>Email</label>
                    <input
                        type='email'
                        value={credentials.email}
                        onChange={changeHandler}
                        name='email'
                        id='email'
                        required
                    />
                </div>
                <div>
                <label htmFor='password'>Password</label>
                    <input
                        type={showPass?'text':'password'}
                        value={credentials.password}
                        onChange={changeHandler}
                        name='password'
                        id='password'
                        required
                    />
                    {showPass?
                    (
                        <span onClick={clickHandler}><AiOutlineEyeInvisible/></span>
                    ):
                    (
                        <span onClick={clickHandler}><AiOutlineEye/></span>
                    )}
                </div>
                <input type='submit'/>
            </form>
        </div>
    );
}
export default LoginPage;