import React from "react";
import './userDashboard.css';

const Navbar = ({ onSelectOption }) => {
  return (
    <nav className="dashboard-navbar">
      <ul>
        <li>
          <button onClick={() => onSelectOption("myDonations")}>My Donations</button>
        </li>
        <li>
          <button onClick={() => onSelectOption("editProfile")}>Edit Profile</button>
        </li>
        <li>
          <button onClick={() => onSelectOption("logout")} className="logout-button">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
