import { useState } from 'react';
import useUrlStore from '../../store/urlStore';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';
import { TIMEZONES } from '../../utils/constants';

const ShortenForm = () => {
  const { createShortUrl, isLoading, error } = useUrlStore();
  const [formData, setFormData] = useState({
    originalUrl: '',
    customCode: '',
    expiresAt: '',
    activeTimeZone: '',
    activeStartHour: '',
    activeEndHour: ''
  });
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createShortUrl(formData);
      setFormData({ 
        originalUrl: '', 
        customCode: '', 
        expiresAt: '', 
        activeTimeZone: '', 
        activeStartHour: '', 
        activeEndHour: '' 
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error creating short URL:', error);
    }
  };

  return (
    <Card className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shorten a URL</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          URL shortened successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="originalUrl" className="block text-gray-700 font-medium mb-2">
            URL to Shorten
          </label>
          <Input
            type="url"
            id="originalUrl"
            name="originalUrl"
            value={formData.originalUrl}
            onChange={handleChange}
            placeholder="https://example.com"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="customCode" className="block text-gray-700 font-medium mb-2">
            Custom Short Code (Optional)
          </label>
          <Input
            type="text"
            id="customCode"
            name="customCode"
            value={formData.customCode}
            onChange={handleChange}
            placeholder="e.g., mylink"
          />
          <p className="text-sm text-gray-500 mt-1">
            Leave blank to generate a random code
          </p>
        </div>
        
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="text-blue-600 font-medium flex items-center"
          >
            {isAdvancedOpen ? 'Hide' : 'Show'} Advanced Options
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 ml-1 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {isAdvancedOpen && (
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <div className="mb-4">
              <label htmlFor="expiresAt" className="block text-gray-700 font-medium mb-2">
                Expiration Date (Optional)
              </label>
              <Input
                type="datetime-local"
                id="expiresAt"
                name="expiresAt"
                value={formData.expiresAt}
                onChange={handleChange}
              />
              <p className="text-sm text-gray-500 mt-1">
                Default is 30 days from creation
              </p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="activeTimeZone" className="block text-gray-700 font-medium mb-2">
                Active Time Zone (Optional)
              </label>
              <select
                id="activeTimeZone"
                name="activeTimeZone"
                value={formData.activeTimeZone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {TIMEZONES.map((timezone) => (
                  <option key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="activeStartHour" className="block text-gray-700 font-medium mb-2">
                  Active Start Hour (Optional)
                </label>
                <Input
                  type="time"
                  id="activeStartHour"
                  name="activeStartHour"
                  value={formData.activeStartHour}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="activeEndHour" className="block text-gray-700 font-medium mb-2">
                  Active End Hour (Optional)
                </label>
                <Input
                  type="time"
                  id="activeEndHour"
                  name="activeEndHour"
                  value={formData.activeEndHour}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Shortening...' : 'Shorten URL'}
        </Button>
      </form>
    </Card>
  );
};

export default ShortenForm;



// // src/components/url/ShortenForm.jsx
// import { useState } from 'react';
// import useUrlStore from '../../store/urlStore';

// const ShortenForm = () => {
//   const { createShortUrl, isLoading, error } = useUrlStore();
//   const [formData, setFormData] = useState({
//     originalUrl: '',
//     customCode: '',
//     expiresAt: '',
//     activeTimeZone: '',
//     activeStartHour: '',
//     activeEndHour: ''
//   });
//   const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createShortUrl(formData);
//       setFormData({ 
//         originalUrl: '', 
//         customCode: '', 
//         expiresAt: '', 
//         activeTimeZone: '', 
//         activeStartHour: '', 
//         activeEndHour: '' 
//       });
//       setShowSuccess(true);
//       setTimeout(() => setShowSuccess(false), 3000);
//     } catch (error) {
//       console.error('Error creating short URL:', error);
//     }
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6 mb-8">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shorten a URL</h2>
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
      
//       {showSuccess && (
//         <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//           URL shortened successfully!
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="originalUrl" className="block text-gray-700 font-medium mb-2">
//             URL to Shorten
//           </label>
//           <input
//             type="url"
//             id="originalUrl"
//             name="originalUrl"
//             value={formData.originalUrl}
//             onChange={handleChange}
//             placeholder="https://example.com"
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
        
//         <div className="mb-4">
//           <label htmlFor="customCode" className="block text-gray-700 font-medium mb-2">
//             Custom Short Code (Optional)
//           </label>
//           <input
//             type="text"
//             id="customCode"
//             name="customCode"
//             value={formData.customCode}
//             onChange={handleChange}
//             placeholder="e.g., mylink"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <p className="text-sm text-gray-500 mt-1">
//             Leave blank to generate a random code
//           </p>
//         </div>
        
//         <div className="mb-4">
//           <button
//             type="button"
//             onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
//             className="text-blue-600 font-medium flex items-center"
//           >
//             {isAdvancedOpen ? 'Hide' : 'Show'} Advanced Options
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               className={`h-5 w-5 ml-1 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} 
//               viewBox="0 0 20 20" 
//               fill="currentColor"
//             >
//               <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//           </button>
//         </div>
        
//         {isAdvancedOpen && (
//           <div className="bg-gray-50 p-4 rounded-md mb-4">
//             <div className="mb-4">
//               <label htmlFor="expiresAt" className="block text-gray-700 font-medium mb-2">
//                 Expiration Date (Optional)
//               </label>
//               <input
//                 type="datetime-local"
//                 id="expiresAt"
//                 name="expiresAt"
//                 value={formData.expiresAt}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <p className="text-sm text-gray-500 mt-1">
//                 Default is 30 days from creation
//               </p>
//             </div>
            
//             <div className="mb-4">
//               <label htmlFor="activeTimeZone" className="block text-gray-700 font-medium mb-2">
//                 Active Time Zone (Optional)
//               </label>
//               <select
//                 id="activeTimeZone"
//                 name="activeTimeZone"
//                 value={formData.activeTimeZone}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Always active</option>
//                 <option value="America/New_York">America/New_York</option>
//                 <option value="America/Chicago">America/Chicago</option>
//                 <option value="America/Denver">America/Denver</option>
//                 <option value="America/Los_Angeles">America/Los_Angeles</option>
//                 <option value="Europe/London">Europe/London</option>
//                 <option value="Europe/Paris">Europe/Paris</option>
//                 <option value="Asia/Tokyo">Asia/Tokyo</option>
//                 <option value="Australia/Sydney">Australia/Sydney</option>
//               </select>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="activeStartHour" className="block text-gray-700 font-medium mb-2">
//                   Active Start Hour (Optional)
//                 </label>
//                 <input
//                   type="time"
//                   id="activeStartHour"
//                   name="activeStartHour"
//                   value={formData.activeStartHour}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="activeEndHour" className="block text-gray-700 font-medium mb-2">
//                   Active End Hour (Optional)
//                 </label>
//                 <input
//                   type="time"
//                   id="activeEndHour"
//                   name="activeEndHour"
//                   value={formData.activeEndHour}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//           </div>
//         )}
        
//         <button
//           type="submit"
//           className={`w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
//           disabled={isLoading}
//         >
//           {isLoading ? 'Shortening...' : 'Shorten URL'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ShortenForm;