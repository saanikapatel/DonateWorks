import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import './footer.css'
import { IoIosSend } from "react-icons/io";
import { BiSolidDonateHeart } from "react-icons/bi";
 
const Footer = () => {
  return (
  
   
    <section className="footer">
      
      <div className="secContent container">
        <div className="footer-logo">
        <h1><BiSolidDonateHeart className="icon"/>Gener<span>us</span></h1>
        <h4>To kindness and love, the things we need the most</h4>
        </div>
        <div className="contactDiv flex">
          <div className="text">
            <h3>Are you an NGO?</h3>
          </div>

          <div className="inputDiv flex">
            <h3>JOIN US</h3>
            <input type="text" placeholder='Enter Email Address'/>
            <button className="btn flex" type='submit'>SEND <IoIosSend /></button>
          </div>
        </div>
      </div>

      <div className="useful-links">
        <h2>Useful links</h2>
        <p><Link to='/'>Home</Link></p>
        <p><Link to='/about'>About</Link></p>
        <p><Link to='/ngo'>NGOs</Link></p>
      </div>
    </section>
   
  )
} 

export default Footer