import React, { useContext } from 'react'
import {  useState } from 'react';
import '../App.css';
import logo from '../assets/images/logo-2-amira.png';
import AuthContext from '../context/AuthProvider';
import axios from "../api/axios";
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

function LinkVerification() {

    const [link, setLink] = useState("")
    const [errorMessage ,setErrorMessage] = useState("");
    const [successMessage ,setSuccessMessage] = useState("");
    const navigate = useNavigate()
    const { state, dispatch } = useContext(AuthContext);
    


    async function VerifyLink(event) {
        event.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

             axios.get(link)
                 .then((response) => {
                     console.log(response.data);



                     // const user ={name:response.data.name,email:response.data.email,token:response.data.token}
                     // dispatch({type:'LOGIN',payload:{isAuthorized:true,user:user}});
                     // setCookie("access_token",response.data.token);
                     // window.localStorage.setItem("userEmail",response.data.email);
                     // navigate("/about")
                     setSuccessMessage(response.data.message)
                     dispatch({type:'LOGIN',payload:{isAuthorized:true,user:{email:response.data.email}}});

                     navigate('/reset-password')
                    //  setCode("")
             
                 })
                 .catch((error) => {
                    //  console.error(error.response.data.error);
                     console.error(error);

                     setErrorMessage("The link was not verified ! ");
                     setLink('');
                 })
        
 }

  return (
    <div className='rectangle'>
        <div className='group'> 
            <div className="logo">
                <img src={logo} alt="LOGO" />
            </div> 

            <form onSubmit={VerifyLink} className="form-control-register">

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
                            <p className='instruction-heading'>A link was sent to your email,copy it and paste it here</p>
               </div>

                <div className='control-div'>
                    <input 
                        required
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        type="text" 
                        name='link'/>
                    <label htmlFor='password'>
                        <span style={{ transitionDelay: '350ms' }}>L</span>
                        <span style={{ transitionDelay: '300ms' }}>I</span>
                        <span style={{ transitionDelay: '250ms' }}>N</span>
                        <span style={{ transitionDelay: '200ms' }}>K</span>
                    </label>
                </div>
                
              
                <button type='submit'>VERIFY</button>

                <div className="password-policy">
                    <Link  ></Link>
                    <Link to='/login' className="policy-link-register" >login</Link>
                </div>
            </form>
            
        </div>
    </div>
  )
}

export default LinkVerification
