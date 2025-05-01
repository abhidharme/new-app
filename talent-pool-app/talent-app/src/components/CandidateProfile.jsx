import React from "react";
import "../styles/CandidateProfile.css";

const CandidateProfile = ({ profileData, setProfileData }) => {
  // console.log("profileData", profileData)
  return (
    <div className="candidate-profile-container">
      <div className="candidate-profile-header">
        <h2>Candidate Profile</h2>
        <button className="back-button" onClick={() => setProfileData('')}>Back</button>
      </div>

      <div className="custom-horizontal-line"></div>

      <div className="candidate-profile-content">
        <div className="profile-section">
          <img
            src={profileData?.profile_picture}
            alt="Profile"
            width={50}
            height={50}
            className="profile-image"
          />
          <div className="profile-info">
            <h3>{profileData?.name}</h3>
            <p className="profile-title">{profileData?.area_of_interest}</p>
            <p className="profile-location">{profileData?.preferred_location}</p>
          </div>
        </div>

        <div className="about-section">
          <h4>About</h4>
          <p>{profileData?.short_bio}</p>
        </div>

        {/* Experience Section */}
        <div className="experience-section">
          <h4>Experience</h4>
          {profileData?.experience?.length > 0 ? (
            profileData.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <p>{exp.position} - {exp.duration}</p>
                <p>{exp.company}</p>
                <p>{exp.location}</p>
              </div>
            ))
          ) : (
            <p>{"No Experience Available"}</p>
          )}
        </div>

        {/* Education Section */}
        <div className="education-section">
          <h4>Education</h4>
          {profileData?.education?.length > 0 ? (
            profileData?.education?.map((edu, index) => (
              <div key={index}>
                <p>{edu.degree} - {edu.year}</p>
              </div>
            ))
          ) : (
            <p>{"No Education Details Available"}</p>
          )}
        </div>


        {/* <div className="portal-interviews-section">
          <h4>Portal Interviews</h4>
          <div className="interviews">
            <div className="interview-card selected">Selected</div>
            <div className="interview-card selected">Selected</div>
            <div className="interview-card not-selected">Not Selected</div>
          </div>
        </div> */}
      </div>
    </div >
  );
};

export default CandidateProfile;
