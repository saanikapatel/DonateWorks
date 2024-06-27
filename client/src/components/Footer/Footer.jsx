import React from 'react'
import './footer.css'
import video from '../../assets/cover_video.mp4'
import { IoIosSend } from "react-icons/io";

const Footer = () => {
  return (
    <section className="footer">
      {/* <div className="videoDiv">
      <video src={video} muted autoPlay loop type='video/mp4'></video>
      </div> */}

      <div className="secContent container">
        <div className="contactDiv flex">
          <div className="text">
            <h3>Are you an NGO?</h3>
            <p>Join us</p>
          </div>


          <div className="inputDiv flex">
            <input type="text" placeholder='Enter Email Address'/>
            <button className="btn flex" type='submit'>SEND <IoIosSend /></button>
          </div>
        </div>
      </div>
    </section>
  )
} 

export default Footer