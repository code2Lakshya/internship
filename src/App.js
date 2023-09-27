import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LoginPage from './Pages/Login/LoginPage'
import SignupPage from './Pages/SignupPage/SignupPage'

const url = 'https://jsearch.p.rapidapi.com/search?query=Python%20&page=2&num_pages=4';
function App() {


  return (
    <div className="wrapper">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/search' element={<h1>Job Search Page</h1>} />
        <Route path='/details/:comapnyId' element={<h1>Details Page</h1>} />
        <Route path='/preview' element={<h1>Success Page</h1>} />
        <Route path='*' element={<h1>No Such Page Exists</h1>} />
      </Routes>
    </div>
  );
}

export default App;
