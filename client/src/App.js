import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import BrowseItems from './pages/BrowseItems';
import ReportLost from './pages/ReportLost';
import ReportFound from './pages/ReportFound';
import ReportIssue from './pages/ReportIssue';
import MyPosts from './pages/MyPosts';
import AdminDashboard from './pages/AdminDashboard';
import ClaimsPage from './pages/ClaimsPage';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/landingPage" element={<LandingPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/browse-items" element={<PrivateRoute><BrowseItems /></PrivateRoute>} />
      <Route path="/report-lost" element={<PrivateRoute><ReportLost /></PrivateRoute>} />
      <Route path="/report-found" element={<PrivateRoute><ReportFound /></PrivateRoute>} />
      <Route path="/my-posts" element={<PrivateRoute><MyPosts /></PrivateRoute>} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/claims" element={<ClaimsPage />} />
      <Route path="/report-issue" element={<PrivateRoute><ReportIssue /></PrivateRoute>} />
    </Routes>
  );
}

export default function App() {
  return (
    <>
     
    <BrowserRouter>
      <AuthProvider>
        <Navbar /> 
        <Toaster position="top-right" />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
      </>
  );
}