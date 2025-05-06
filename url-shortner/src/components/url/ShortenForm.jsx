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
      setTimeout(() => setShowSuccess(false), 1000);
    } catch (error) {
      console.error('Error creating short URL:', error);
    }
  };

  return (
    <div className="bg-[#1E2A45] p-6 rounded-2xl border border-blue-800/30 shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-100 mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
        </svg>
        Shorten a URL
      </h2>

      {error && (
        <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      {showSuccess && (
        <div className="bg-green-900/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-xl mb-4">
          URL shortened successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="originalUrl" className="block text-gray-200 font-medium mb-2">
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
            icon={<LinkIcon />}
            className="bg-[#2A3959] border-blue-700/30 text-gray-100 placeholder-gray-500"
          />
        </div>
        
        <div>
          <label htmlFor="customCode" className="block text-gray-200 font-medium mb-2">
            Custom Short Code (Optional)
          </label>
          <Input
            type="text"
            id="customCode"
            name="customCode"
            value={formData.customCode}
            onChange={handleChange}
            placeholder="e.g., mylink"
            icon={<HashtagIcon />}
            className="bg-[#2A3959] border-blue-700/30 text-gray-100 placeholder-gray-500"
          />
          <p className="text-sm text-gray-400 mt-1">
            Leave blank to generate a random code
          </p>
        </div>
        
        <div>
          <button
            type="button"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="text-blue-400 hover:text-blue-300 font-medium flex items-center transition-colors"
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
          <div className="bg-[#2A3959] p-6 rounded-xl border border-blue-700/30 space-y-6">
            <div>
              <label htmlFor="expiresAt" className="block text-gray-200 font-medium mb-2">
                Expiration Date (Optional)
              </label>
              <Input
                type="datetime-local"
                id="expiresAt"
                name="expiresAt"
                value={formData.expiresAt}
                onChange={handleChange}
                className="bg-[#1a3054] border-blue-600/30 text-gray-100 
                  placeholder-gray-400 hover:bg-[#1e365e] cursor-pointer
                  [&::-webkit-calendar-picker-indicator]:filter-[#3B82F6]"
              />
              <p className="text-sm text-gray-400 mt-1">
                Default is 30 days from creation
              </p>
            </div>
            
            <div>
              <label htmlFor="activeTimeZone" className="block text-gray-200 font-medium mb-2">
                Active Time Zone (Optional)
              </label>
              <div className="relative">
                <select
                  id="activeTimeZone"
                  name="activeTimeZone"
                  value={formData.activeTimeZone}
                  onChange={handleChange}
                  className="w-full bg-[#1a3054] border border-blue-600/30 text-gray-100 
                    rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 
                    hover:bg-[#1e365e] placeholder-gray-400 transition-colors duration-200"
                >
                  {TIMEZONES.map((timezone) => (
                    <option key={timezone.value} value={timezone.value}>
                      {timezone.label}
                    </option>
                  ))}
                </select>
                {/* <GlobeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" /> */}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="activeStartHour" className="block text-gray-200 font-medium mb-2">
                  Active Start Hour (Optional)
                </label>
                <Input
                  type="time"
                  id="activeStartHour"
                  name="activeStartHour"
                  value={formData.activeStartHour}
                  onChange={handleChange}
                  className="bg-[#1a3054] border-blue-600/30 text-gray-100 
                    placeholder-gray-400 hover:bg-[#1e365e] cursor-pointer
                    [&::-webkit-calendar-picker-indicator]:filter-[#3B82F6]"
                />
              </div>
              
              <div>
                <label htmlFor="activeEndHour" className="block text-gray-200 font-medium mb-2">
                  Active End Hour (Optional)
                </label>
                <Input
                  type="time"
                  id="activeEndHour"
                  name="activeEndHour"
                  value={formData.activeEndHour}
                  onChange={handleChange}
                  className="bg-[#1a3054] border-blue-600/30 text-gray-100 
                    placeholder-gray-400 hover:bg-[#1e365e] cursor-pointer
                    [&::-webkit-calendar-picker-indicator]:filter-[#3B82F6]"
                />
              </div>
            </div>
          </div>
        )}
        
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-200"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Shortening...
            </div>
          ) : (
            'Shorten URL'
          )}
        </Button>
      </form>

      {/* Add this CSS at the top of your file */}
      <style>{`
        /* Calendar icon */
        input[type="datetime-local"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          filter: invert(60%) sepia(95%) saturate(1000%) hue-rotate(185deg) brightness(100%);
          opacity: 0.7;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        input[type="datetime-local"]::-webkit-calendar-picker-indicator:hover,
        input[type="time"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
          background-color: rgba(59, 130, 246, 0.1);
        }

        /* Hide the default select arrow */
        select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233B82F6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1em;
          padding-right: 2.5rem;
        }
      `}</style>
    </div>
  );
};

// Icons components
const LinkIcon = () => (
  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
  </svg>
);

const HashtagIcon = () => (
  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clipRule="evenodd"/>
  </svg>
);

const CalendarIcon = () => (
  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
  </svg>
);

const ClockIcon = () => (
  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
  </svg>
);

const GlobeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd"/>
  </svg>
);

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