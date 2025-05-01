// routes/AppRoutes.js
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import UploadResume from '../pages/user/UploadResume';
import Explore from '../pages/admin/Explore';
import JobPosts from '../pages/admin/JobPosts';
import JobRequirementsPage from '../pages/admin/Jobs';
import Profile from '../pages/user/Profile';
import Layout from '../layout/MainLayout';
import withAuth from '../hoc/withAuth';

// Protect routes using withAuth HOC
const ProtectedUploadResume = withAuth(UploadResume);
const ProtectedAdminExplore = withAuth(Explore);
const ProtectedAdminJobPosts = withAuth(JobPosts);
const ProtectedAdminJobRequirementsPage = withAuth(JobRequirementsPage);
const ProtectedProfile = withAuth(Profile);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />

      {/* Routes with layout */}
      <Route element={<Layout />}>
        <Route path="/upload-resume" element={<ProtectedUploadResume />} />
        <Route path="/admin/explore" element={<ProtectedAdminExplore />} />
        <Route path="/admin/job-post" element={<ProtectedAdminJobPosts />} />
        <Route path="/admin/jobs" element={<ProtectedAdminJobRequirementsPage />} />
        <Route path="/profile" element={<ProtectedProfile />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
