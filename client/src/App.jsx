import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./components/Login";
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Register from "./components/Register";
import Home from "./components/Home";
import About from "./components/About";
import ForgotPassword from "./components/ForgotPassword";
import LinkVerification from "./components/LinkVerification";
import ResetPassword from "./components/ResetPassword";

function App() {
   

  return (
    <Router>
        <Routes>
            {/* <Route path='/login' element={<Login/>} /> */}
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/forget-password' element={<ForgotPassword/>} />
            <Route path='/link-verification' element={<LinkVerification/>} />

            <Route element={<ProtectedRoutes/>}>
                <Route path='/' element={<Home/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/reset-password' element={<ResetPassword/>} />
            </Route>/
        </Routes>
    </Router>
  );
}

export default App;
