import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobCard from '../../components/JobCard';
import ProfileCard from '../../components/ProfileCard';
import ProfileOverview from '../../components/ProfileOverview';
import { getPostedJobs } from '../../redux/slices/jobSlice';
import { getMatchedProfiles } from '../../redux/slices/userSlice';
import useLoader from '../../hooks/useLoader';
import { toast } from 'react-toastify';

const JobRequirementsPage = () => {
  const dispatch = useDispatch();
  const handleLoader = useLoader();

  const [matchedId, setMatchedId] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [profilesFetched, setProfilesFetched] = useState(false);


  const { postedJobsData } = useSelector((state) => state.jobs);
  const { matchedProfilesData } = useSelector((state) => state.users);

  // Fetch all jobs
  useEffect(() => {
    handleLoader(async () => {
      try {
        await dispatch(getPostedJobs()).unwrap();
      } catch (err) {
        console.log(err)
        toast.error('Failed to fetch posted jobs');
      }
    });
  }, [dispatch]);

  // Fetch matched profiles when matchedId changes
  useEffect(() => {
    if (matchedId) {
      handleLoader(async () => {
        try {
          await dispatch(getMatchedProfiles(matchedId)).unwrap();
          setProfilesFetched(true); // ✅ Set to true after successful fetch
        } catch (err) {
          toast.error('Failed to fetch matched profiles');
          console.log(err)
          setProfilesFetched(true); // ✅ Still set to true to avoid stuck state
        }
      });

      const job = postedJobsData.find((job) => job.id === matchedId);
      setSelectedJob(job || null);
    }
  }, [matchedId, dispatch, postedJobsData]);


  useEffect(() => {
    if (profilesFetched) {
      if (matchedProfilesData?.length > 0) {
        setSelectedProfile(matchedProfilesData[0]);
      } else {
        toast.error("No Matching Profile Found");
      }
    }
  }, [matchedProfilesData, profilesFetched]);


  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
  };

  const handleBack = () => {
    setMatchedId('');
    setSelectedProfile(null);
    setSelectedJob(null);
    // dispatch(clearMatchedProfiles());
  };

  // console.log("matchedProfilesData", matchedProfilesData)

  return (
    <div className="flex flex-col justify-center items-center py-4 px-4">
      {matchedId && (
        <div className="w-full flex justify-start mb-4">
          <button
            onClick={handleBack}
            className="text-sm bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md"
          >
           {"← Back to All Jobs"}
          </button>
        </div>
      )}

      <JobCard
        postedJobsData={selectedJob ? [selectedJob] : postedJobsData}
        setMatchedId={setMatchedId}
      />

      {matchedId && matchedProfilesData?.length > 0 && (
        <div className="flex flex-col md:flex-row gap-8 mt-8 w-full">
          <ProfileCard
            matchedProfilesData={matchedProfilesData}
            onSelectProfile={handleProfileSelect}
          />
          <ProfileOverview selectedProfile={selectedProfile} />
        </div>
      )}
    </div>
  );
};

export default JobRequirementsPage;