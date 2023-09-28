import './Job.css'
import { options } from '../../utils/variables';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import Form from './Form/Form';


const Job = () => {
    const [loader, setLoader] = useState(false);
    const [jobDeatil, setJobDetail] = useState(null);
    const { jobId } = useParams();
    const [form, setForm] = useState(false);
    useEffect(() => {
        setLoader(true);
        fetch(`https://jsearch.p.rapidapi.com/job-details?job_id=${jobId}&extended_publisher_details=false`
            , options)
            .then(response => response.json())
            .then(data => {
                setLoader(false);
                setJobDetail(data.data[0]);
            })
            .catch(error => console.log(error))
    }, [])
    const formHandler=()=>{
        setForm(true);
        window.scroll(0,0);
    }
    return (
        <div className='job-wrapper'>
            <div className={`display-container ${form? 'active':''}`}>
                {
                    loader ? <Loader /> : (
                        jobDeatil === null ? (<h1> Network Error</h1>) : (
                            <div className='job'>
                                <div className='job-header'>
                                    <h1>{jobDeatil?.employer_name}</h1>
                                    <p>{jobDeatil?.job_title}</p>
                                    <p>Location : {jobDeatil?.job_city}, {jobDeatil?.job_country}</p>
                                </div>
                                <div className='job-main'>
                                    <p className='job-description'>{jobDeatil?.job_description}</p>
                                    <div>
                                        <p>
                                            Experience Required :
                                            {jobDeatil?.job_required_experience?.required_experience_in_months / 12} years
                                        </p>
                                        <p > Maximum Salary : <span className='salary'>$ {jobDeatil?.job_max_salary}</span></p>
                                        <p > Minimum Salary : <span className='salary'>$ {jobDeatil?.job_min_salary}</span></p>
                                    </div>
                                    <p>Direct apply Link : <span className='apply-link'>{jobDeatil?.job_apply_link}</span></p>
                                    <button  className="btn" onClick={formHandler}>Apply Now</button>
                                </div>
                            </div>))
                }
            </div>
            {form &&
                <Form  setForm={setForm} jobTile={jobDeatil?.job_title} jobEmployer={jobDeatil?.employer_name}/>
            }
            {
                
            }
        </div>
    )
}


export default Job;