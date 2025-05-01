
'use client';
import React from 'react';
import ExternLabsIcon from '../assets/extern_labs_icon.png';
import '../styles/profileCard.css'; // <-- Import your CSS file

const ProfileCard = ({ matchedProfilesData, onSelectProfile }) => {
  return (
    <div className="profile-card-container">
      {matchedProfilesData?.length > 0 && matchedProfilesData?.map((item, index) => {
        // console.log("item?.profile_picture", item?.profile_picture)
        return <div
          className="profile-card"
          key={index}
          onClick={() => onSelectProfile(item)}
        >
          {/* Profile Header */}
          <div className="profile-card-header">
            <img
              src={item?.profile_picture || ExternLabsIcon}
              alt="User Logo"
              width={48}
              height={48}
              className="profile-card-avatar"
            />
            <div className="profile-card-info">
              <h2 className="profile-card-name">{item?.name}</h2>
              <p className="profile-card-role">{item?.role}</p>
              <p className="profile-card-location">{item?.preferred_location}</p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="profile-card-skills">
            {item?.skills?.split(",").map((skill, skillIndex) => (
              <span key={skillIndex} className="profile-card-skill">
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      })}
    </div>)
};

export default ProfileCard;