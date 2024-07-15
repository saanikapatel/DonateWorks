import React, {useEffect} from 'react'
import './about.css'

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='about-container'>
      <h4>Welcome to Gener<span>us</span>, where generosity meets impact.</h4> 
      <p>Our platform is dedicated to bridging the gap between compassionate donators and dedicated NGOs. We provide a seamless and efficient way for individuals to donate items, ensuring that your contributions reach those in need swiftly and effectively.</p>

    <p>At Generus, we believe in the power of giving and the importance of community support. Our mission is to facilitate meaningful connections between those who want to make a difference and the organizations striving to create positive change. We make the donation process simple and convenient by collecting essential information about your donations and their addresses, and then passing this on to our partnered NGOs. These organizations will then come to collect your generous contributions directly from you.</p>

    <p>Join us in our mission to support communities and make a tangible difference in the lives of others. Together, we can create a better world, one donation at a time.</p>
    </div>
  )
}

export default About