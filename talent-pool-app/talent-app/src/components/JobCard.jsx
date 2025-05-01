import React from 'react';
import companyLogo from '../assets/companyLogo.png'; // Placeholder for company logo
import '../styles/jobCard.css';

const JobCard = ({ postedJobsData, setMatchedId }) => {
  return (
    <div className="job-card-container">
      {postedJobsData?.length > 0 ? (
        postedJobsData.map((item, index) => (
          <div key={index} className="job-card">
            <div className="job-card-header">
              {/* Logo */}
              <div className="job-card-logo">
                <img
                  src={companyLogo}
                  alt="Company Logo"
                  className="company-logo"
                />
              </div>

              {/* Job Content */}
              <div className="job-card-content">
                <h3 className="job-title">{item?.job_name}</h3>
                <p className="job-description">{item?.description}</p>

                {/* Job Details */}
                <div className="job-details-grid">
                  <div className="job-detail-item">
                    <span className="job-detail-label">Employment Type:</span>
                    <br /> {item?.employment_type}
                  </div>
                  <div className="job-detail-item">
                    <span className="job-detail-label">Budget:</span>
                    <br /> {item?.budget}
                  </div>
                  <div className="job-detail-item">
                    <span className="job-detail-label">Openings:</span>
                    <br /> {item?.openings}
                  </div>
                  <div className="job-detail-item">
                    <span className="job-detail-label">Skills:</span>
                    <br /> {Array.isArray(item?.skills) ? item.skills.join(', ') : item.skills}
                  </div>
                  <div className="job-detail-item">
                    <span className="job-detail-label">Location:</span>
                    <br /> {item?.location}
                  </div>
                </div>

                {/* Button aligned to right */}
                <div className="job-card-button-container">
                  <button className="job-card-button" onClick={() => setMatchedId(item?.id)}>
                    View Matching Candidates
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-jobs-container">
          <h2 className="no-jobs-title">{"No Job Postings Found"}</h2>
          <p className="no-jobs-subtitle">
            {"You haven't posted any jobs yet. Start by creating a new job posting to find the best candidates!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default JobCard;