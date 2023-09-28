import React from 'react'
import './Preview.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Preview = () => {
    const details = useSelector(state => state.userData);
    const navigate = useNavigate();
    console.log(details);
    return (
        <div className='preview-page'>
            <div className='preview-container'>
                <h1>Your Application Preview</h1>
                <div className='details'>
                    <p>Application Submitted to : <span>{details.jobEmployer}</span></p>
                    <p>Applicant First Name : <span>{details.first_name}</span></p>
                    <p>Applicant Last Name : <span>{details.last_name}</span></p>
                    <p id='email'>Email : <span>{details.email}</span></p>
                    <p>Phone Number : <span>{details.phone}</span></p>
                    <p>Applicant Age : <span>{details.age}</span></p>
                    <p>Cover Letter : <span>{details.coverLetter}</span></p>
                    <p>Job Title : <span>{details?.jobTitle ?? 'NOT Available'}</span></p>
                </div>
                <button className='btn' onClick={() => navigate('/search')}>Go back to search</button>
            </div>
        </div>
    )
}

export default Preview