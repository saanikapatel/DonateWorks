import { Link } from "react-router-dom";

const Choose = () => {
    return (  
        <div>
            <button><Link to="/userSignup">Join as a donator</Link></button>
            <br />
            <button><Link to="/ngoLogin">Joins as an NGO</Link></button>
        </div>
    );
}
 
export default Choose;