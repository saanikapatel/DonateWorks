import React, { useState } from "react";
import Navbar from "./Navbar";
import ActiveDonations from "./ActiveDonations";
import EditProfile from './EditProfile';
import './ngoDashboard.css'


const NgoDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("active-donations");

  const renderContent = () => {
    switch (selectedOption) {
      case "active-donations":
        return <ActiveDonations/>;
      case "editProfile":
        return <EditProfile />;
      // case "logout":
      //   return <Logout />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="user-navbar">
        <Navbar onSelectOption={setSelectedOption} />
      </div>
      <div className="user-dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default NgoDashboard;
