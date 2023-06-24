import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./components/Login";
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Register from "./components/Register";
import Home from "./components/Home";
import About from "./components/About";
import ForgotPassword from "./components/ForgotPassword";

function App() {
   

  return (
    <Router>
        <Routes>
            {/* <Route path='/login' element={<Login/>} /> */}
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/forget-password' element={<ForgotPassword/>} />

            <Route element={<ProtectedRoutes/>}>
                <Route path='/' element={<Home/>} />
                <Route path='/about' element={<About/>} />
            </Route>/
        </Routes>
    </Router>
  );
}

export default App;
