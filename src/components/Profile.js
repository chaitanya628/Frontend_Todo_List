import React from "react";
import Navbar from "./Navbar";
import "./Profile.css";
import { useLocation } from "react-router-dom";

function Profile(props) {
  const { state } = useLocation();
  // console.log(state);
  return (
    <div>
      <Navbar />
      <br />
      <div className="user-profile">
        <div className="profile-item">
          <span className="label">First Name:</span>
          <span className="value">{state.firstname}</span>
        </div>
        <div className="profile-item">
          <span className="label">Last Name:</span>
          <span className="value">{state.lastname}</span>
        </div>
        <div className="profile-item">
          <span className="label">Mobile:</span>
          <span className="value">{state.mobilenumber}</span>
        </div>
        <div className="profile-item">
          <span className="label">Email:</span>
          <span className="value">{state.email}</span>
        </div>
        <div className="profile-item">
          <span className="label">Username:</span>
          <span className="value">{state.username}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
