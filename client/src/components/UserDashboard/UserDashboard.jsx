import React, { useState, useContext, useEffect } from "react";
import Navbar from "./Navbar";
import MyDonations from './MyDonations';
import EditProfile from './EditProfile';
import './userDashboard.css';
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const UserDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("myDonations");
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/'); // Navigate to home page if no token is present
    }
  }, [token, navigate]);

  const renderContent = () => {
    switch (selectedOption) {
      case "myDonations":
        return <MyDonations />;
      case "editProfile":
        return <EditProfile />;
      default:
        return null;
    }
  };
 
  if (!token) return null; // Prevent rendering the dashboard if no token

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

export default UserDashboard;
