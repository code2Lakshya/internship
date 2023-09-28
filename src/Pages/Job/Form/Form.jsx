import React, { useState } from 'react'
import './Form.css'
import { useDispatch } from 'react-redux';
import { addData } from '../../../redux/slices/userSlice';
import { toast } from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

const Form = ({ setForm ,jobTitle, jobEmployer}) => {
    const [formDetails, setFormDetails] = useState({ first_name: '', last_name: '', age: '', email: '', phone: '', graduation: false ,coverLetter: ''});
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const changeHandler = (e) => {
        setFormDetails(prev => {
            return ({ ...prev, [e.target.name]: e.target.checked ? (e.target.value === 'graduated' ? true : false) : e.target.value })
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addData({...formDetails,jobTitle: jobTitle,jobEmployer: jobEmployer}));
        toast.success('Applied');
        navigate('/preview');
    }
    return (
        <div className='form-container'>
            <form onSubmit={submitHandler}>
                <span className='cross' onClick={() => setForm(false)}><RxCross2 /></span>
                <h1>Application</h1>
                <div>
                    <label htmlFor='firstName'>First Name</label>
                    <input
                        type='text'
                        value={formDetails.first_name}
                        onChange={changeHandler}
                        name='first_name'
                        id='firstName'
                        autoComplete='first_name'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='lastName'>Last Name</label>
                    <input
                        type='text'
                        value={formDetails.last_name}
                        onChange={changeHandler}
                        name='last_name'
                        id='lastName'
                        autoComplete='last_name'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='age'>Age</label>
                    <input
                        type='number'
                        value={formDetails.age}
                        onChange={changeHandler}
                        name='age'
                        id='age'
                        autoComplete='age'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        value={formDetails.email}
                        onChange={changeHandler}
                        name='email'
                        id='email'
                        autoComplete='email'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='phone'>Phone</label>
                    <input
                        type='number'
                        value={formDetails.phone}
                        onChange={changeHandler}
                        name='phone'
                        id='phone'
                        autoComplete='phone_number'
                        required
                    />
                </div>
                <div className='radio-container'>
                    <label>Graduation</label>
                    <div>
                        <input
                            type='radio'
                            value='graduated'
                            onChange={changeHandler}
                            name='graduation'
                            id='graduation'
                            checked={formDetails.graduation ? true : false}
                            required
                        />
                        <label htmlFor='yes'>Yes</label>
                    </div>
                    <div>
                        <input
                            type='radio'
                            value='not-graduated'
                            onChange={changeHandler}
                            name='graduation'
                            id='no'
                            checked={formDetails.graduation ? false : true}
                            required
                        />
                        <label htmlFor='no'>No</label>
                    </div>
                </div>
                <div>
                    <textarea
                        cols='30'
                        rows='10'
                        placeholder='Enter your text here...'
                        value={formDetails.coverLetter}
                        name='coverLetter'
                        onChange={changeHandler}
                    ></textarea>
                </div>
                <button type='submit' className='btn'>Submit Details</button>
            </form>
        </div>
    )
}

export default Form