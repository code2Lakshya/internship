import './Home.css';
import logo from '../../assets/107028033-1646863344215-GettyImages-1316107530.jpg'
import { useNavigate } from 'react-router-dom';


const Home = () => {
const navigate=useNavigate();
    return (
        <div className="home-container">
        <img src={logo} alt='background'/>
            <div>
                <h1>Welcome to Jobs Now</h1>
                <p>We have a collection of more than 2lakh+ jobs spread all over the world.</p>
                <div className="home-btn">
                    <button onClick={()=>navigate('/login')}>Login</button>
                    <button onClick={()=>navigate('/signup')}>Signup</button>
                </div>
            </div>

        </div>
    );
}
export default Home;