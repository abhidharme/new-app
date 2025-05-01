import React from 'react';
import SampleProfileIcon from '../assets/sample-profile-icon.png'; 
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Avatar = () => {
  const uploadedResumeData = useSelector((state) => state?.users?.uploadedResumeData);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const profileFromUrl = searchParams.get('Profile');
  // console.log('searchParams?.Profile', profileFromUrl)
  return (
    <>
      <img
        src={uploadedResumeData?.profile_picture || profileFromUrl || SampleProfileIcon}
        alt="Avtar"
        width={25}
        height={25}
        className="rounded-full object-cover"
      />
    </>
  );
};

export default Avatar;
