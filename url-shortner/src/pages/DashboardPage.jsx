import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useUrlStore from '../store/urlStore';
import ShortenForm from '../components/url/ShortenForm';
import LinksList from '../components/url/LinksList';
import Card from '../components/common/Card';

const DashboardPage = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { currentLink, clearCurrentLink } = useUrlStore();
  
  useEffect(() => {
    return () => {
      // Clear the current link when leaving dashboard
      clearCurrentLink();
    };
  }, [clearCurrentLink]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        {user && (
          <p className="text-gray-600">Welcome back, {user.username || user.email}</p>
        )}
      </div>

      {/* Shorten URL Section */}
      <section className="mb-12">
        <ShortenForm />
      </section>

      {/* Display Newly Created Link */}
      {currentLink && (
        <section className="mb-12">
          <Card>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your New Short URL</h2>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-md">
              <div>
                <p className="text-blue-600 font-medium">{currentLink.shortUrl}</p>
                <p className="text-sm text-gray-600">Original: {currentLink.originalUrl}</p>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(currentLink.shortUrl)}
                className="text-gray-500 hover:text-blue-600 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              </button>
            </div>
          </Card>
        </section>
      )}

      {/* List of User's Links */}
      <section>
        <LinksList />
      </section>
    </div>
  );
};

export default DashboardPage;