import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';

const NgoDashboard = () => {

  const {setToken}=useContext(StoreContext);
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem("token")
    setToken("");
    navigate("/");
  }


  return (
    <div>
      Ngo
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default NgoDashboard
