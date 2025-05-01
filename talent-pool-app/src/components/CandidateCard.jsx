import React from "react";
import "../styles/CandidateCard.css";

const CandidateCard = ({ allProfilesData,setProfileData }) => {
  return (
    allProfilesData?.map((item) => (
      <div key={item.id} className="candidate-card">
        <div className="top">
          <img src={item?.profile_picture} alt="avatar" width={50} height={50} className="avatar" />
          <div className="info">
            <h3 className="name">{item?.name}</h3>
            <p className="role">{item?.area_of_interest || "N/A"}</p>
            <p className="location">{item?.preferred_location || "N/A"}</p>
            <div className="tags">
              {item?.skills
                ?.split(',')
                .map((skill, index) => (
                  <span key={index}>{skill.trim()}</span>
                ))}
            </div>
          </div>
          <div className="availability">
            <p className="label">Availability</p>
            <p className="days">{item?.job_availability || "N/A"}</p>
            <p className="time">{item?.years_of_experience} years experience</p>
          </div>
        </div>

        <p className="desc">
          {item?.short_bio || "No bio available."}
        </p>

        <div className="actions">
          <button className="btn green" onClick={()=>setProfileData(item)}>View Profile</button>
          {/* <button className="btn outline">View Resume</button> */}
        </div>
      </div>
    ))
  );
};

export default CandidateCard;
