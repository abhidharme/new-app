import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/ProfilePage.css';
import { getProfileByUserId, updateProfile } from '../../redux/slices/userSlice';
import useLoader from '../../hooks/useLoader';
import ProfileEditForm from '../../components/ProfileEditForm';
import { Button } from '../../components/ui/button';
// import AvalaibiltyPopup from '../../components/AvalaibiltyPopup';

const Profile = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const uploadedResumeData = useSelector((state) => state?.users?.uploadedResumeData);
  const updatedProfileData = useSelector((state) => state?.users?.updatedProfileData);
  const handleLoader = useLoader();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      handleLoader(async () => {
        await dispatch(getProfileByUserId(userId));
      });
    }
  }, [dispatch, updatedProfileData]);

  const handleSubmit = useCallback((values) => {
    if (values) {
      handleLoader(async () => {
        await dispatch(updateProfile(values)).then((res) => {
          if (res?.payload?.message === "Profile updated successfully") {
            setShowModal(false);
          }
        });
      });
    }
  }, [dispatch, updatedProfileData?.message]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-10 mx-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-semibold">My Profile</h2>
        <div className="flex gap-4">
          <Button className="bg-[#239852] hover:bg-green-600" onClick={() => setShowModal(true)}>
            Edit Profile
          </Button>
        </div>
      </div>

      <hr className="border-t border-gray-300 mb-6" />

      <div className="flex items-center justify-between mb-6 pb-4">
        <div className="flex items-center gap-4">
          <img
            src={uploadedResumeData?.profile_picture || '/default-profile.png'}
            width={50}
            height={50}
            alt={uploadedResumeData?.name || 'Profile'}
            className="rounded-full w-12 h-12 object-contain"
          />
          <div>
            <h3 className="text-lg font-semibold">{uploadedResumeData?.name}</h3>
            <p className="text-gray-600 text-sm">{uploadedResumeData?.area_of_interest}</p>
            <p className="text-gray-500 text-sm">{uploadedResumeData?.preferred_location}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div>
          <p className="text-lg font-semibold">Industry</p>
          <p className="text-sm">{uploadedResumeData?.industry}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Years Of Experience</p>
          <p className="text-sm">{uploadedResumeData?.years_of_experience} Years</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Preferred Location</p>
          <p className="text-sm">{uploadedResumeData?.preferred_location}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Area of interest</p>
          <p className="text-sm">{uploadedResumeData?.area_of_interest}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">Contact</p>
          <p className="text-sm">{uploadedResumeData?.phone}</p>
          <p className="text-sm">{uploadedResumeData?.email}</p>
        </div>
      </div>

      <hr className="border-t border-gray-300 mb-6" />

      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-2">About</h4>
        <p className="text-gray-700">{uploadedResumeData?.short_bio}</p>
      </div>

      <hr className="border-t border-gray-300 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-4">Experience</h4>
          {uploadedResumeData?.experience?.map((exp, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{exp.position}</p>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-gray-500 text-sm">{exp.duration}</p>
              <p className="text-gray-500 text-sm">{exp.location}</p>
            </div>
          ))}
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Education</h4>
          {uploadedResumeData?.education?.map((edu, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-gray-500">{edu.year}</p>
            </div>
          ))}
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {uploadedResumeData?.skills?.split(',')?.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full"
              >
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ProfileEditForm
        showModal={showModal}
        setShowModal={setShowModal}
        uploadedResumeData={uploadedResumeData}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Profile;
