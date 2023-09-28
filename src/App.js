import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LoginPage from './Pages/Login/LoginPage'
import SignupPage from './Pages/SignupPage/SignupPage'
import Error from "./Pages/Error/Error";
import Search from "./Pages/Search/Search";
import Job from "./Pages/Job/Job";
import Preview from "./Pages/Preview/Preview";


function App() {


  return (
    <div className="wrapper">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/job/:jobId' element={<Job />} />
        <Route path='/preview' element={<Preview />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
