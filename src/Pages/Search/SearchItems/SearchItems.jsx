import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchItems.css'
import logo from '../../../assets/abstract-company-logo_53876-120501.avif';

const SearchItems = ({ data }) => {
    const navigate = useNavigate();
    const clickHandler = () => {
        navigate(`/job/${data.job_id}`);  
    }
    return (
        <div className='search-item'>
            <div className='search-heading'>
                <div>
                    <h1>{data.employer_name}</h1>
                    <p>{data.job_title}</p>
                </div>
                <img src={data.employer_logo?data.employer_logo:logo} alt='logo' />
            </div>
            <div className='search-description'>
                <p>
                    {data.job_description.slice(0,500)}...
                </p>
                <p>Publisher: <span>{data.job_publisher}</span></p>
            </div>
            <button onClick={clickHandler} className='btn'>Show In Detail</button>
        </div>
    )
}

export default SearchItems