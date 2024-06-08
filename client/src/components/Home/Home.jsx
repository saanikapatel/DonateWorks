import React from 'react'
import './home.css'
import video from '../../assets/cover_video.mp4'

const Home = () => {
  return (
    <section className="home">
      <div className="overlay"></div>
        <video src={video} muted autoPlay loop type='video/mp4'></video> 

        <div className="homeContent container">
          <div className="textDiv">
            <h1 className="smallText">
              Be a reason someone smiles!
            </h1>
            <button className="homeTitle btn">Donate Now</button>
          </div>
        </div> 
    </section>
  )
}

export default Home