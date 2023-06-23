import React, { useContext } from 'react'
import AuthContext from '../context/AuthProvider';

function About() {

  const { state, dispatch } = useContext(AuthContext);
console.log(state);
  return (
    <div>
      ABOUT
    </div>
  )
}

export default About
