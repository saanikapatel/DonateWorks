import { Link } from "react-router-dom";
import choose_donator from '../assets/choose_donator.jpg';
import choose_ngo from '../assets/choose_ngo.jpg';

const Choose = () => {
    return (  
        <div className="choose-container">
            <div className="choose-item">
                <img src={choose_donator} alt="" className="choose-item-img" />
                <button className="btn choose-btn"><Link to="/userSignup">Join as a donator</Link></button>
            </div>
            <div className="choose-item">
                <img src={choose_ngo} alt="" className="choose-item-img" />
                <button className="btn choose-btn"><Link to="/ngoLogin">Join as an NGO</Link></button>
            </div>
        </div>
    );
}
 
export default Choose;