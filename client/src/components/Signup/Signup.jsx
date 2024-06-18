import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import Axios from 'axios';

const Signup = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:4000/auth/signup", {
      username, 
      email,
      password 
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <div className='sign-up-container'>
      <form className="sign-up-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
        <label htmlFor="username">Username:</label>
        <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>

        <label htmlFor="email">Email:</label>
        <input type="email" placeholder='Email' autoComplete='off' onChange={(e) => setEmail(e.target.value)}/>

        <label htmlFor="password">Password:</label>
        <input type="password" placeholder='******' onChange={(e) => setPassword(e.target.value)}/>

        <button className='btn' type='submit'>Sign up</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  )
}

export default Signup;
