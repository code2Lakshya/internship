import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from 'react-icons/fa'
import { BsPersonWorkspace } from 'react-icons/bs'
import { useNavigate } from "react-router-dom";
import { fetchData } from '../../redux/slices/searchSlice'
import { options } from "../../utils/variables";
import Loader from "../../components/Loader/Loader";
import SearchItems from "./SearchItems/SearchItems";
import './Search.css'
import { changeLogin } from "../../redux/slices/loginSlice";

const Search = () => {
    const loggedIn = useSelector(state => state.login);
    const data = useSelector(state => state.search);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    useEffect(()=>{
        sessionStorage.getItem('user')!==null?dispatch(changeLogin(true)):dispatch(changeLogin(false));
    },[])
    const changeHandler = (e) => {
        setQuery(e.target.value);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if (query.length !== 0) {
            fetchResponse(query);
        }
    }
    const fetchResponse = (value) => {
        setLoader(true);
        fetch(`https://jsearch.p.rapidapi.com/search?query=${value}%20&page=1&num_pages=1`, options)
            .then(response => response.json())
            .then(data => {
                dispatch(fetchData(data.data));
                setLoader(false);
            })
            .catch((err) => console.log(err));
    }
    return (
        <div className="search">
            {!loggedIn ? (<div className="logIn-search">Please Log In Again<span onClick={() => navigate('/login')}>Log In</span></div>)
                : (
                    <div className="search-wrapper">
                        <div className="search-container">
                            <h1>Job Portal <BsPersonWorkspace /></h1>
                            <form onSubmit={submitHandler}>
                                <input
                                    type='text'
                                    value={query}
                                    onChange={changeHandler}
                                    name='search'
                                    placeholder='Search here ...'
                                />
                                <button type="submit"><FaSearch /></button>
                            </form>
                        </div>
                        <div className="output-container">
                            {
                                loader ? <Loader /> : (
                                    data.length > 0 ? (
                                        <div>
                                            {
                                                data.map((item,index) => {
                                               return <SearchItems key={index} data={item} />
                                            })
                                            }
                                        </div>) :
                                        (<p id='job-lower'>Search For jobs</p>))
                            }
                        </div>
                    </div>
                )}
        </div>
    );
}
export default Search;