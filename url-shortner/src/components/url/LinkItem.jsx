import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { formatDate, getTimeRemaining } from '../../utils/helpers';

const LinkItem = ({ link }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="mb-2 md:mb-0">
          <h3 className="font-medium text-lg text-blue-600 truncate">
            {link.originalUrl}
          </h3>
          <div className="flex items-center mt-1">
            <span 
              className="text-gray-700 hover:text-blue-600 cursor-pointer truncate"
              onClick={handleCopy}
            >
              {link.shortUrl}
            </span>
            <button 
              onClick={handleCopy}
              className="ml-2 text-gray-500 hover:text-blue-600"
            >
              {copied ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
          <Button
            onClick={() => setShowQR(!showQR)}
            variant="secondary"
            className="text-sm"
          >
            {showQR ? 'Hide QR' : 'Show QR'}
          </Button>
          
          <Link
            to={`/analytics/${link.shortCode}`}
            className="text-sm px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-md transition"
          >
            Analytics
          </Link>
        </div>
      </div>
      
      <div className="mt-3 text-sm text-gray-500 flex flex-wrap gap-x-4">
        <span>Created: {formatDate(link.createdAt)}</span>
        <span>Expires: {formatDate(link.expiresAt) || 'Never'}</span>
        <span className={link.expiresAt && new Date(link.expiresAt) < new Date() ? 'text-red-500' : 'text-green-500'}>
          {getTimeRemaining(link.expiresAt)}
        </span>
      </div>
      
      {showQR && (
        <div className="mt-4 flex justify-center md:justify-start">
          <div className="p-2 bg-white border border-gray-200 rounded-md">
            <img 
              src={`data:image/png;base64,${link.qrCodeBase64}`} 
              alt="QR Code" 
              className="w-32 h-32"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkItem;