import React, { useContext } from 'react'
import {  useState } from 'react';
// import '../App.css';
import '../login.css';
import logo from '../assets/images/logo-2-amira.png';
import AuthContext from '../context/AuthProvider';
import axios from "../api/axios";
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
const login_url = process.env.REACT_APP_HOST_NAME+'api/login';


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage ,setErrorMessage] = useState("");
    const navigate = useNavigate()
    const [_, setCookie] = useCookies(["access_token"])
    
    const { state, dispatch } = useContext(AuthContext);

    async function loginUser(event) {
           event.preventDefault();
                axios.post(login_url,
                            {
                            email: email,
                            password: password,
                            },
                            {
                            headers:{"Content-Type":'application/json'},
                            })
                    .then((response) => {
                        console.log(response.data);
                        const user ={name:response.data.name,email:response.data.email,token:response.data.token}
                        dispatch({type:'LOGIN',payload:{isAuthorized:true,user:user}});
                        setCookie("access_token",response.data.token);
                        window.localStorage.setItem("userEmail",response.data.email);
                        navigate("/about")
                    })
                    .catch((error) => {
                        console.error(error.response.data.error);

                        setErrorMessage(error.response.data.error)
                    })
           
    }


  return (
    <div className='rectangle'>
        <div className='group'> 
            <div className="logo">
                <img src={logo} alt="LOGO" />
            </div> 

            <form onSubmit={loginUser} className="form-control">

                {
                    errorMessage &&  <div className="notifications-container">
                                <div className="error-alert">
                                    <div className="flex">
                                        <div className="error-prompt-container">
                                            <p className="error-prompt-heading">{errorMessage} </p>          
                                        </div>
                                    </div>
                                </div>
                    </div> 
                }
               
                
                <div className='control-div'>
                    <input 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text" 
                        name='username'/>
                    <label htmlFor='username'>
                        <span style={{ transitionDelay: '350ms' }}>U</span>
                        <span style={{ transitionDelay: '300ms' }}>s</span>
                        <span style={{ transitionDelay: '250ms' }}>e</span>
                        <span style={{ transitionDelay: '200ms' }}>r</span>
                        <span style={{ transitionDelay: '150ms' }}>n</span>
                        <span style={{ transitionDelay: '100ms' }}>a</span>
                        <span style={{ transitionDelay: '50ms' }}>m</span>
                        <span style={{ transitionDelay: '0ms' }}>e</span>
                    </label>
                </div>
                <div className='control-div'>
                <input required 
                       type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       name='password'/>
                    <label htmlFor='password'>
                        <span style={{ transitionDelay: '350ms' }}>P</span>
                        <span style={{ transitionDelay: '300ms' }}>a</span>
                        <span style={{ transitionDelay: '250ms' }}>s</span>
                        <span style={{ transitionDelay: '200ms' }}>s</span>
                        <span style={{ transitionDelay: '150ms' }}>w</span>
                        <span style={{ transitionDelay: '100ms' }}>o</span>
                        <span style={{ transitionDelay: '50ms' }}>r</span>
                        <span style={{ transitionDelay: '0ms' }}>d</span>
                    </label>
                </div>
              
                <button type='submit'>submit</button>

                <div className="password-policy">
                    <Link to='/register' className="policy-link" >register</Link>
                    <Link to='/register' className="policy-link" >Forgot password ? </Link>
                </div>
            </form>
            
        </div>
    </div>
  )
}

export default Login
