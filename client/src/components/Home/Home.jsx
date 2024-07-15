import React, {useContext, useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import './home.css'
import video from '../../assets/cover_video.mp4'
import Main from '../Main/Main'
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleJoinUs = () => {
    if(token){
      navigate('/donate');
    }
    else{
      navigate('/choose');
    }
  };
  return (
    <>
    <section className="home">
      <div className="overlay"></div>
      <div className='video-container'>
      <video src={video} muted autoPlay loop type='video/mp4' id="background-video"></video> 

      </div>
        
        <div className="homeContent container">
          <div className="textDiv">
            <h1 className="smallText">
              Be a reason someone smiles!
            </h1>
            <button className="homeTitle btn home-button" onClick={handleJoinUs}>Join us</button>
          </div>
        </div>
    </section>
        <Main/> 
    
    </>

  )
}

export default Home