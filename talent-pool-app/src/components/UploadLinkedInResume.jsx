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
    <div className="bg-white rounded-lg border border-[#E0E0E0] min-h-[810px] flex items-center justify-center">
      <div className="p-8 w-full max-w-xl shadow-sm">
        <div className="flex justify-center mb-8">
          <img
            src={SampleResumeIcon}
            alt="LinkedIn Resume Screenshot"
            width={510}
            height={250}
            className="rounded-md shadow"
          />
        </div>

        <h2 className="text-xl font-semibold text-center text-[#0A0A0A] mb-6">
          Upload LinkedIn Resume
        </h2>

        <div className="flex items-center border border-[#D1D5DB] rounded-md px-4 py-2 mb-6 bg-white relative overflow-hidden cursor-pointer">
          <span className="text-sm text-gray-700 pointer-events-none">
            {selectedFile ? selectedFile.name : "Upload from Device"}
          </span>
          <UploadIcon className="w-5 h-5 text-gray-500 ml-auto pointer-events-none" />
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleFileUpload}
          />
        </div>

        <Button
          className="w-full bg-[#00B74A] text-white py-2 rounded-md text-sm font-medium hover:bg-[#009f3e] transition"
          onClick={handleUploadResume}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default UploadLinkedInResume;
