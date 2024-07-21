import React, { useState, useContext } from "react";
import "../css/UserForm.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const UserLogin = () => {

  const {setToken}=useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/auth/userLogin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.status){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token);
          navigate('/');
        }
        else{
          alert("Error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="*******"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="userFormButton">Login</button>
        <p>Don't have an account? <Link to="/userSignup">Signup</Link></p>
      </form>
    </div>
  );
};

export default UserLogin;
 