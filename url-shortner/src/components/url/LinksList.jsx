// src/components/url/LinksList.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useUrlStore from '../../store/urlStore';
import LinkItem from './LinkItem';

const LinksList = () => {
  const { userLinks, getUserLinks, isLoading, error } = useUrlStore();

  useEffect(() => {
    getUserLinks();
  }, [getUserLinks]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        Error loading links: {error}
      </div>
    );
  }

  if (userLinks.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Links</h2>
        <p className="text-gray-600 mb-4">You don't have any shortened URLs yet.</p>
        <Link 
          to="/dashboard" 
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition"
        >
          Create Your First Link
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Links</h2>
      <div className="space-y-4">
        {userLinks.map((link) => (
          <LinkItem key={link.shortCode} link={link} />
        ))}
      </div>
    </div>
  );
};

export default LinksList;