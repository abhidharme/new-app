// // routes/AppRoutes.js
// import { Routes, Route } from 'react-router-dom';
// import Login from '../pages/auth/Login';
// import NotFound from '../pages/NotFound';
// import Home from '../pages/Home';
// import UploadResume from '../pages/user/UploadResume';
import Explore from '../pages/admin/Explore';
// import JobPosts from '../pages/admin/JobPosts';
// import JobRequirementsPage from '../pages/admin/Jobs';
// import Profile from '../pages/user/Profile';
// import Layout from '../layout/MainLayout';
// import ProtectedRoute from './ProtectedRoute';

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/" element={<Home />} />

//       <Route element={<Layout />}>
//         {/* Jobseeker routes */}
//         <Route
//           path="/upload-resume"
//           element={
//             <ProtectedRoute allowedRoles={['jobseeker']}>
//               <UploadResume />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute allowedRoles={['jobseeker']}>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />

//         {/* Admin routes */}
//         <Route
//           path="/admin/explore"
//           element={
//             <ProtectedRoute allowedRoles={['admin']}>
//               <Explore />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/job-post"
//           element={
//             <ProtectedRoute allowedRoles={['admin']}>
//               <JobPosts />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/jobs"
//           element={
//             <ProtectedRoute allowedRoles={['admin']}>
//               <JobRequirementsPage />
//             </ProtectedRoute>
//           }
//         />
//       </Route>

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default AppRoutes;


// routes/AppRoutes.js
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Home from '../pages/Home';
import {reactLocalStorage} from 'reactjs-localstorage';
// Simple ProtectedRoute: Checks token in localStorage
const ProtectedRoute = ({ children }) => {
  const token = reactLocalStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

// Simple PublicRoute: Redirects to profile if token exists
const PublicRoute = ({ children }) => {
  const token = reactLocalStorage.getItem('token');
  return token ? <Navigate to="/profile" replace /> : children;
};

const AppRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/admin/explore"
        element={
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>
        }
      />
      {/* Catch-all: Redirect unknown routes to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
