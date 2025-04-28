// src/components/url/AnalyticsCard.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useUrlStore from '../../store/urlStore';
import AnalyticsChart from './AnalyticsChart';

const AnalyticsCard = () => {
  const { shortCode } = useParams();
  const { getAnalytics, analytics, isLoading, error } = useUrlStore();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (shortCode) {
      getAnalytics(shortCode);
    }
  }, [shortCode, getAnalytics]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        Error loading analytics: {error}
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Analytics</h2>
        <p className="text-gray-600 mb-4">No analytics data available for this link.</p>
        <Link 
          to="/dashboard" 
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  // Function to convert CSV data to a downloadable file
  const downloadCSV = () => {
    if (!analytics.csvReport) return;
    
    const blob = new Blob([analytics.csvReport], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${shortCode}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Analytics for: {shortCode}</h2>
        <Link 
          to="/dashboard" 
          className="text-blue-600 hover:text-blue-800 transition"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Analytics Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('overview')}
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('locations')}
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'locations'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Locations
          </button>
          <button
            onClick={() => setActiveTab('times')}
            className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'times'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Time Analysis
          </button>
        </nav>
      </div>

      {/* Analytics Content */}
      {activeTab === 'overview' && (
        <div>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-800">{analytics.totalClicks}</h3>
              <p className="text-blue-600 font-medium">Total Clicks</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Click Heatmap</h3>
              <button
                onClick={downloadCSV}
                className="text-sm px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 rounded-md transition flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download CSV
              </button>
            </div>
            {analytics.heatmapBase64 && (
              <div className="flex justify-center">
                <img 
                  src={`data:image/png;base64,${analytics.heatmapBase64}`} 
                  alt="Click Heatmap" 
                  className="max-w-full h-auto rounded-md border border-gray-200"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'locations' && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Clicks by Location</h3>
          <AnalyticsChart 
            data={analytics.clicksByCityAndHour}
            chartType="location"
          />
        </div>
      )}

      {activeTab === 'times' && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Clicks by Hour</h3>
          <AnalyticsChart 
            data={analytics.clicksByCityAndHour}
            chartType="time"
          />
        </div>
      )}
    </div>
  );
};

export default AnalyticsCard;