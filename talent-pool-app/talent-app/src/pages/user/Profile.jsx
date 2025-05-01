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

		<div className="profile-container">
			<div className="profile-header">
				<h2 className="profile-title">My Profile</h2>
				<div className="edit-button-wrapper">
					<button className="edit-button" onClick={() => setShowModal(true)}>
						Edit Profile
					</button>
				</div>
			</div>

			<hr className="divider" />

			<div className="profile-main">
				<div className="profile-info">
					<img
						src={uploadedResumeData?.profile_picture || '/default-profile.png'}
						alt={uploadedResumeData?.name || 'Profile'}
						className="profile-avatar"
					/>
					<div>
						<h3 className="profile-name">{uploadedResumeData?.name}</h3>
						<p className="text-muted">{uploadedResumeData?.area_of_interest}</p>
						<p className="text-muted">{uploadedResumeData?.preferred_location}</p>
					</div>
				</div>
			</div>

			<div className="profile-grid">
				<div>
					<p className="label">Industry</p>
					<p className="value">{uploadedResumeData?.industry}</p>
				</div>
				<div>
					<p className="label">Years Of Experience</p>
					<p className="value">{uploadedResumeData?.years_of_experience} Years</p>
				</div>
				<div>
					<p className="label">Preferred Location</p>
					<p className="value">{uploadedResumeData?.preferred_location}</p>
				</div>
				<div>
					<p className="label">Area of Interest</p>
					<p className="value">{uploadedResumeData?.area_of_interest}</p>
				</div>
				<div>
					<p className="label">Contact</p>
					<p className="value">{uploadedResumeData?.phone}</p>
					<p className="value">{uploadedResumeData?.email}</p>
				</div>
			</div>

			<hr className="divider" />

			<div className="about-section">
				<h4 className="label">About</h4>
				<p className="text">{uploadedResumeData?.short_bio}</p>
			</div>

			<hr className="divider" />

			<div className="resume-sections">
				<div className="experience-section">
					<h4 className="label">Experience</h4>
					{uploadedResumeData?.experience?.map((exp, index) => (
						<div key={index} className="resume-item">
							<p className="font-semibold">{exp.position}</p>
							<p className="text-muted">{exp.company}</p>
							<p className="text-muted text-small">{exp.duration}</p>
							<p className="text-muted text-small">{exp.location}</p>
						</div>
					))}
				</div>

				<div className="education-section">
					<h4 className="label">Education</h4>
					{uploadedResumeData?.education?.map((edu, index) => (
						<div key={index} className="resume-item">
							<p className="font-semibold">{edu.degree}</p>
							<p className="text-muted">{edu.year}</p>
						</div>
					))}
				</div>

				<div className="skills-section">
					<h4 className="label">Skills</h4>
					<div className="skills-list">
						{uploadedResumeData?.skills?.split(',')?.map((skill, index) => (
							<span key={index} className="skill-badge">{skill.trim()}</span>
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
