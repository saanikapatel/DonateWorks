import { Link } from "react-router-dom";

const Choose = () => {
    return (  
        <div>
            <button><Link to="/user">Join as a donator</Link></button>
            <br />
            <button><Link to="/ngo">Joins as an NGO</Link></button>
        </div>
    );
}
 
export default Choose;