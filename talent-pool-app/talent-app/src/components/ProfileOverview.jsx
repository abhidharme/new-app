'use client';
import React from 'react';
import ExternLabsIcon from '../assets/extern_labs_icon.png';
import '../styles/ProfileOverview.css';

const ProfileOverview = ({ selectedProfile }) => {
  if (!selectedProfile) {
    return <div></div>; // You can customize this loading UI
  }

  const {
    name,
    area_of_interest,
    preferred_location,
    short_bio,
    skills,
    experiences,
    educations,
    profile_picture
  } = selectedProfile;

  return (
    <div className="profile-overview">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-user">
          <img
            src={profile_picture || ExternLabsIcon}
            alt="Profile"
            width={48}
            height={48}
            className="profile-avatar"
          />
          <div>
            <h2 className="profile-name">{name}</h2>
            <p className="profile-role">{area_of_interest}</p>
            <p className="profile-location">{preferred_location}</p>
          </div>
        </div>
        {/* <div className="profile-button-container">
          {/* <button className="profile-button">{"View Resume"}</button> */}
        {/* </div>  */}
      </div>

      {/* About */}
      <div className="profile-section">
        <h3 className="profile-section-title">{"About"}</h3>
        <p className="profile-text">{short_bio}</p>
      </div>

      {/* Insights */}
      <div className="profile-section">
        <h3 className="profile-section-title">{"Insights from profile"}</h3>
        <div className="profile-insights">
          <div className="profile-experience">
            <strong className="profile-subtitle">{"Experience"}</strong>
            {experiences?.map((exp, index) => (
              <p key={index} className="profile-text">
                {exp.position} – {exp.duration}<br />{exp.company}
              </p>
            ))}
          </div>
          <div className="profile-education">
            <strong className="profile-subtitle">{"Education"}</strong>
            {educations?.map((edu, index) => (
              <p key={index} className="profile-text">
                {edu.degree} – {edu.year}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="profile-section">
        <h3 className="profile-section-title">{"Skills"}</h3>
        <div className="profile-skills">
          {skills?.split(',').map((skill, index) => (
            <span key={index} className="profile-skill">{skill.trim()}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;