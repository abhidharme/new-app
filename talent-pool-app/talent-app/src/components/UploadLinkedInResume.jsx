import "../styles/UploadResume.css"
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UploadIcon } from "lucide-react";
import Cookies from "js-cookie";
import SampleResumeIcon from '../assets/download-sampe-resume.png'; // Adjust path if needed
import { uploadProfileResume } from "../redux/slices/userSlice"; // Adjust path to your Redux slice
import { Button } from "./ui/button"; // Adjust path to your button component
// import "../styles/your-style.css"; // if needed

const UploadLinkedInResume = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedFile, setSelectedFile] = useState(null);
  const [storedUserId, setStoredUserId] = useState(null);
  const [storedAccessToken, setStoredAccessToken] = useState(null);
  const [storedRole, setStoredRole] = useState(null);
  const [userId, setUserId] = useState(null);

  const uploadedResumeData = useSelector((state) => state.users.uploadedResumeData);

  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const accessToken = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    setStoredUserId(userId);
    setStoredAccessToken(accessToken);
    setStoredRole(role);
    setUserId(userId);
  }, []);

  useEffect(() => {
    const userIdFromUrl = searchParams.get("user_id");
    const accessTokenFromUrl = searchParams.get("access_token");
    const roleFromUrl = searchParams.get("role");

    if (userIdFromUrl && !storedUserId) {
      localStorage.setItem("user_id", userIdFromUrl);
      setUserId(userIdFromUrl);
    }

    if (accessTokenFromUrl && !storedAccessToken) {
      localStorage.setItem("token", accessTokenFromUrl);
      Cookies.set("token", accessTokenFromUrl);
    }

    if (roleFromUrl && !storedRole) {
      localStorage.setItem("role", roleFromUrl);
      Cookies.set("role", roleFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    if (uploadedResumeData) {
      navigate("/profile");
    }
  }, [uploadedResumeData, navigate]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadResume = () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }
    if (!userId) {
      alert("User ID not found");
      return;
    }
    dispatch(uploadProfileResume({ file: selectedFile, user_id: Number(userId) }));
  };

  return (
    <div class="upload-resume-container">
      <div class="upload-card">
        <div class="image-container">
          <img
            src={SampleResumeIcon}
            alt="LinkedIn Resume Screenshot"
            width="510"
            height="250"
            class="resume-image"
          />
        </div>

        <h2 class="title">Upload LinkedIn Resume</h2>

        <div class="file-upload-container">
          <span class="file-name">{selectedFile ? selectedFile.name : "Upload from Device"}</span>
          <div class="upload-icon">
            <UploadIcon class="upload-icon-image" />
          </div>
          <input
            type="file"
            class="file-input"
            onChange={handleFileUpload}
          />
        </div>

        <Button
          class="upload-btn"
          onClick={handleUploadResume}
        >
          Upload
        </Button>
      </div>
    </div>

  );
};

export default UploadLinkedInResume;
