import React, { useContext, useEffect } from 'react'
import {  useState } from 'react';
import '../App.css';
import logo from '../assets/images/logo-2-amira.png';
import AuthContext from '../context/AuthProvider';
import axios from "../api/axios";
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
const login_url = process.env.REACT_APP_HOST_NAME+'api/register';


function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage ,setErrorMessage] = useState("");
    const [successMessage ,setSuccessMessage] = useState("");
    const navigate = useNavigate()
    const [_, setCookie] = useCookies(["access_token"])
    
    const { state, dispatch } = useContext(AuthContext);

    

        // useEffect(() => {
        //     const timeout = setTimeout(() => {
        //     notificationsContainer.style.display = 'none';
        //     }, 5000);

        //     return () => {
        //     clearTimeout(timeout);
        //     };
        // }, [successMessage, errorMessage]);



    async function registerUser(event) {
           event.preventDefault();

        //    setErrorMessage("");
        //    setSuccessMessage("");
        //         axios.post(login_url,
        //                     {
        //                     name:name,
        //                     email: email,
        //                     password: password,
        //                     },
        //                     {
        //                     headers:{"Content-Type":'application/json'},
        //                     })
        //             .then((response) => {
        //                 console.log(response.data);
        //                 // const user ={name:response.data.name,email:response.data.email,token:response.data.token}
        //                 // dispatch({type:'LOGIN',payload:{isAuthorized:true,user:user}});
        //                 // setCookie("access_token",response.data.token);
        //                 // window.localStorage.setItem("userEmail",response.data.email);
        //                 // navigate("/about")
        //                 setSuccessMessage(response.data.message)
        //                 setName("")
        //                 setEmail("")
        //                 setPassword("")
        //             })
        //             .catch((error) => {
        //                 console.error(error.response.data.error);

        //                 setErrorMessage(error.response.data.error)
        //             })

        // setSuccessMessage("response.data.message")
        // console.log(notificationsContainer);

        setSuccessMessage("User successfully registered!")
        const timeout = setTimeout(() => {
            setSuccessMessage('');
          }, 2000);
      
          return () => {
            clearTimeout(timeout);
          };


           
    }


  return (
    <div className='rectangle'>
        <div className='group'> 
            <div className="logo">
                <img src={logo} alt="LOGO" />
            </div> 

            <form onSubmit={registerUser} className="form-control-register">

                {
                    successMessage &&  <div className="notifications-container" >
                                <div className="success-message">
                                    <div className="flex">
                                        <div className="error-prompt-container">
                                            <p className="success-prompt-heading">{successMessage} </p>          
                                        </div>
                                    </div>
                                </div>
                    </div> 
                }
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text" 
                        name='name'/>
                    <label htmlFor='name'>
                        <span style={{ transitionDelay: '350ms' }}>N</span>
                        <span style={{ transitionDelay: '300ms' }}>a</span>
                        <span style={{ transitionDelay: '250ms' }}>m</span>
                        <span style={{ transitionDelay: '200ms' }}>e</span>
                    </label>
                </div> 
                <div className='control-div'>
                    <input 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text" 
                        name='email'/>
                    <label htmlFor='email'>
                    <span style={{ transitionDelay: '350ms' }}>E</span>
                        <span style={{ transitionDelay: '300ms' }}>m</span>
                        <span style={{ transitionDelay: '250ms' }}>a</span>
                        <span style={{ transitionDelay: '200ms' }}>i</span>
                        <span style={{ transitionDelay: '150ms' }}>l</span>
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
              
                <button type='submit'>register</button>

            </form>
                <div className="password-policy">
                    <Link  ></Link>
                    <Link to='/login' className="policy-link-register" >login</Link>
                </div>
            
        </div>
    </div>
  )
}

export default Register
