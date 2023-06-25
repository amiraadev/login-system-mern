import React, { useContext } from 'react'
import {  useState } from 'react';
import '../App.css';
import logo from '../assets/images/logo-2-amira.png';
import AuthContext from '../context/AuthProvider';
import axios from "../api/axios";
import { useCookies } from 'react-cookie';
import { Link, useNavigate,useParams } from 'react-router-dom';




const login_url = process.env.REACT_APP_HOST_NAME+'api/reset-password';


function ResetPassword() {

    const param = useParams()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [errorMessage ,setErrorMessage] = useState("");
    const [successMessage ,setSuccessMessage] = useState("");
    const navigate = useNavigate()
    const [_, setCookie] = useCookies(["access_token"])
    
    const { state, dispatch } = useContext(AuthContext);
    
    async function resetPassword(event) {
           event.preventDefault();

           if(newPassword == passwordConfirm) {
            setErrorMessage("");
            setSuccessMessage("");
                 axios.put(login_url,
                             {
                             email: state.user.email,
                             newPassword:newPassword
                             },
                             {
                             headers:{"Content-Type":'application/json'},
                             })
                     .then((response) => {
                         console.log(response.data);
 
 
 
                         // const user ={name:response.data.name,email:response.data.email,token:response.data.token}
                         // dispatch({type:'LOGIN',payload:{isAuthorized:true,user:user}});
                         // setCookie("access_token",response.data.token);
                         // window.localStorage.setItem("userEmail",response.data.email);
                         // navigate("/about")
                         setSuccessMessage(response.data.message)
                         setNewPassword("")
                         setPasswordConfirm("")
                         const timeout = setTimeout(() => {
                            setSuccessMessage('');
                            navigate('/login')
                          }, 1500);
                      
                          return () => {
                            clearTimeout(timeout);
                          };
                     })
                     .catch((error) => {
                         console.error(error.response.data.error);
 
                         setErrorMessage(error.response.data.error)
                     })
   
           }
           else {
            setErrorMessage("passwords do not match ")
           }
                   
    }


  return (
    <div className='rectangle'>
        <div className='group'> 
            <div className="logo">
                <img src={logo} alt="LOGO" />
            </div> 

            <form onSubmit={resetPassword} className="form-control-register">

                {
                    successMessage &&  <div className="notifications-container">
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
               
                
               <div className="notifications-container">
                            <p className='instruction-heading'>Link verified, reset your password</p>
               </div>
               <div className='control-div'>
                <input required 
                       type="password"
                       value={newPassword}
                       onChange={(e) => setNewPassword(e.target.value)}
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
                <div className='control-div'>
                <input required 
                       type="password"
                       value={passwordConfirm}
                       onChange={(e) => setPasswordConfirm(e.target.value)}
                       name='confirmPassword'/>
                    <label htmlFor='confirmPassword'>
                        <span style={{ transitionDelay: '350ms' }}>C</span>
                        <span style={{ transitionDelay: '300ms' }}>o</span>
                        <span style={{ transitionDelay: '250ms' }}>n</span>
                        <span style={{ transitionDelay: '200ms' }}>f</span>
                        <span style={{ transitionDelay: '150ms' }}>i</span>
                        <span style={{ transitionDelay: '100ms' }}>r</span>
                        <span style={{ transitionDelay: '50ms' }}>m</span>
                    </label>
                </div>
              
                
              
                <button type='submit'>Update Password</button>

                <div className="password-policy">
                    <Link  ></Link>
                    <Link to='/login' className="policy-link-register" >login</Link>
                </div>
            </form>
            
        </div>
    </div>
  )
}

export default ResetPassword
