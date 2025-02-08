import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ name, email, username, profileImage }) => {
  return (
    <div className="profile-card">
      <img src={profileImage} alt="Profil" className="profile-image" />
      <div className="profile-details">
        <div className="profile-name-container">
          <h2 className="profile-name">{name}</h2>
          <p className="profile-username">@{username}</p>
        </div>
        <p className="profile-email">{email}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
