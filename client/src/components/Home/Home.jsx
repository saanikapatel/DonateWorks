import React from 'react'
import { Link } from "react-router-dom";
import './home.css'
import video from '../../assets/cover_video.mp4'
import Main from '../Main/Main'

const Home = () => {
  return (
    <>
    <section className="home">
      <div className="overlay"></div>
      <div>
      <video src={video} muted autoPlay loop type='video/mp4'></video> 

      </div>
        
        <div className="homeContent container">
          <div className="textDiv">
            <h1 className="smallText">
              Be a reason someone smiles!
            </h1>
            <button className="homeTitle btn"><Link to="/choose">Donate Now</Link></button>
          </div>
        </div> 
    </section>
    <Main/>

    </>
    


  )
}

export default Home