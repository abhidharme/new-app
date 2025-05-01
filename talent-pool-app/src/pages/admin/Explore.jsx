import React, { useEffect, useState } from 'react'
import '../../styles/AllCandidates.css'
import CandidateCard from '../../components/CandidateCard'
import CandidateProfile from '../../components/CandidateProfile'
import { getAllProfiles } from '../../redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
// import { hideLoader, showLoader } from '../../redux/slices/loaderSlice'
import useLoader from '../../hooks/useLoader'

function Explore(){
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState('');
  const { allProfilesData } = useSelector((state) => state.users);
  const handleLoader = useLoader(); // Use the hook

  useEffect(() => {
    const fetchProfiles = async () => {
      handleLoader(async () => {
        await dispatch(getAllProfiles()); // Replace this with your async operation
      });
    };
    fetchProfiles();
  }, [dispatch]);

  return (
    <>
      {profileData !== '' ? <CandidateProfile profileData={profileData} setProfileData={setProfileData} /> : <div className="all-candidates-container">
        <h2 className="title">{"All Candidates"}</h2>
        <div className="candidate-row">
          <CandidateCard allProfilesData={allProfilesData} setProfileData={setProfileData} />
        </div>
      </div>}
    </>
  );
}

export default Explore;