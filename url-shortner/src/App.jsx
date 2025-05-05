import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import DashboardPage from './pages/DashboardPage';
import LinksList from './components/url/LinksList';
import AnalyticsCard from './components/url/AnalyticsCard';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage'; 

const App = () => {
  const { checkAuth, isAuthenticated, isLoading, error } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    console.log('App mounted, calling checkAuth');
    checkAuth();
  }, []);

  useEffect(() => {
    console.log('Location changed:', location.pathname, 'isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);
  }, [location, isAuthenticated, isLoading]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">
          <p>{error}</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterForm />} />
          <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />} />
          <Route path="/links" element={isAuthenticated ? <LinksList /> : <Navigate to="/login" replace />} />
          <Route path="/analytics/:shortCode" element={isAuthenticated ? <AnalyticsCard /> : <Navigate to="/login" replace />} />
          {/* Add a catch-all route to handle unknown paths */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;