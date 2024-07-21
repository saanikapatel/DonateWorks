import React, { useState } from "react";
import Navbar from "./Navbar";
import MyDonations from './MyDonations';
import EditProfile from './EditProfile';
import './userDashboard.css'

const UserDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("myDonations");

  const renderContent = () => {
    switch (selectedOption) {
      case "myDonations":
        return <MyDonations />;
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
 
export default UserDashboard
