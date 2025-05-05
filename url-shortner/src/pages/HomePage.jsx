import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import ShortenForm from '../components/url/ShortenForm';

const HomePage = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      {/* Hero Section with Dark Theme */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10"></div>
        
        {/* Glowing circles */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Shorten, Share, Track
              </span>
              <br />
              <span className="text-white/90">Your Links Globally</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100/80 mb-10 max-w-3xl mx-auto leading-relaxed">
              Create powerful shortened links with QR codes and comprehensive analytics in seconds — trusted by professionals worldwide.
            </p>
            
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-8 rounded-xl font-medium 
                    hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Create Free Account
                </Link>
                <Link
                  to="/login"
                  className="bg-white/10 backdrop-blur-lg text-white py-4 px-8 rounded-xl font-medium 
                    hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* URL Shortening Form with updated styling */}
      {isAuthenticated ? (
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-[#111827] rounded-2xl shadow-2xl p-6 md:p-10 border border-blue-900/50">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                Shorten Your URL
              </h2>
              <ShortenForm />
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Features Section with dark theme */}
          <section className="py-20 bg-[#0C1B2B]">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-4">
                Powerful Features for <span className="text-blue-400">Everyone</span>
              </h2>
              <p className="text-xl text-blue-100/70 mb-12 text-center max-w-3xl mx-auto">
                Our platform offers everything you need to manage and optimize your links efficiently.
              </p>
              
              {/* Update the features grid with dark cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {/* Feature cards with glowing effects */}
                <div className="bg-[#111827]/50 p-8 rounded-2xl border border-blue-900/50 hover:shadow-lg hover:shadow-blue-500/10 
                  transition duration-300 backdrop-blur-lg group">
                  <div className="bg-blue-500/10 p-4 rounded-xl w-16 h-16 mb-6 flex items-center justify-center 
                    group-hover:bg-blue-500/20 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 group-hover:text-white transition duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Global Link Shortening</h3>
                  <p className="text-blue-100 leading-relaxed">
                    Transform lengthy URLs into concise, memorable links that work seamlessly across devices and platforms worldwide.
                  </p>
                </div>
                
                <div className="bg-[#111827]/50 p-8 rounded-2xl border border-blue-900/50 hover:shadow-lg hover:shadow-blue-500/10 
                  transition duration-300 backdrop-blur-lg group">
                  <div className="bg-blue-500/10 p-4 rounded-xl w-16 h-16 mb-6 flex items-center justify-center 
                    group-hover:bg-blue-500/20 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 group-hover:text-white transition duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Intelligent QR Codes</h3>
                  <p className="text-blue-100 leading-relaxed">
                    Generate scannable QR codes instantly for seamless offline-to-online experiences in any language or region.
                  </p>
                </div>
                
                <div className="bg-[#111827]/50 p-8 rounded-2xl border border-blue-900/50 hover:shadow-lg hover:shadow-blue-500/10 
                  transition duration-300 backdrop-blur-lg group">
                  <div className="bg-blue-500/10 p-4 rounded-xl w-16 h-16 mb-6 flex items-center justify-center 
                    group-hover:bg-blue-500/20 transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 group-hover:text-white transition duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Global Analytics</h3>
                  <p className="text-blue-100 leading-relaxed">
                    Track engagement metrics across different countries, devices, and time zones with interactive visualization tools.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-20 bg-[#0A1628]">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-16">
                How It <span className="text-blue-600">Works</span>
              </h2>
              
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative pb-12 md:pb-0">
                    <div className="flex justify-center md:block">
                      <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">01</div>
                    </div>
                    <div className="hidden md:block absolute h-full w-px bg-blue-200 top-0 right-0 transform translate-x-1/2"></div>
                    <div className="text-center md:text-left md:pr-6">
                      <h3 className="text-xl font-bold mb-3">Paste Your URL</h3>
                      <p className="text-gray-600">
                        Enter any long URL and customize your link with a memorable alias if you prefer.
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:w-1/3 relative pb-12 md:pb-0">
                    <div className="flex justify-center md:block">
                      <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">02</div>
                    </div>
                    <div className="hidden md:block absolute h-full w-px bg-blue-200 top-0 right-0 transform translate-x-1/2"></div>
                    <div className="text-center md:text-left md:px-6">
                      <h3 className="text-xl font-bold mb-3">Shorten & Share</h3>
                      <p className="text-gray-600">
                        Get your shortened link instantly, along with a QR code ready for global sharing.
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:w-1/3 relative">
                    <div className="flex justify-center md:block">
                      <div className="w-20 h-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold mb-4 shadow-lg">03</div>
                    </div>
                    <div className="text-center md:text-left md:pl-6">
                      <h3 className="text-xl font-bold mb-3">Track Performance</h3>
                      <p className="text-gray-600">
                        Access comprehensive analytics with real-time metrics from users around the world.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 bg-[#0C1B2B]">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-4">
                Trusted <span className="text-blue-600">Worldwide</span>
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                See what our global community of users have to say about our service.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition duration-300 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      JD
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-900">John Doe</h4>
                      <p className="text-gray-500 text-sm">Marketing Manager, United States</p>
                    </div>
                  </div>
                  <div className="flex mb-4 text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 italic">"The ability to schedule links with timezone support has revolutionized our product launches across Asia. Our customers in different regions get access exactly when intended."</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition duration-300 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      JS
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-900">Jane Smith</h4>
                      <p className="text-gray-500 text-sm">Freelance Designer, Germany</p>
                    </div>
                  </div>
                  <div className="flex mb-4 text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 italic">
                    "The QR code feature is perfect for my multilingual projects. I can create one code that works for clients across Europe, with detailed tracking for each region's engagement."
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition duration-300 border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      MK
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-900">Mike Khan</h4>
                      <p className="text-gray-500 text-sm">Small Business Owner, Singapore</p>
                    </div>
                  </div>
                  <div className="flex mb-4 text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81 .588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784 .57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 italic">
                    "This tool has transformed our marketing campaigns. The global analytics help us understand audience behavior across different markets, giving us valuable insights for international campaigns."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Global Stats Section */}
          <section className="py-20 bg-[#0A1628]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Trusted by Users <span className="text-blue-600">Worldwide</span></h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Join our growing community of global professionals using our platform daily.</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">3M+</div>
                  <p className="text-gray-600">Links Created</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">195+</div>
                  <p className="text-gray-600">Countries</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">500K+</div>
                  <p className="text-gray-600">Active Users</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">1B+</div>
                  <p className="text-gray-600">Total Clicks</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600 opacity-30">
              <svg className="absolute right-0 top-0 h-full opacity-20" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="3" cy="3" r="2" fill="white" />
                  </pattern>
                </defs>
                <rect x="0" y="0" width="400" height="400" fill="url(#dots)" />
              </svg>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Ready to Go Global with Your Links?
                </h2>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                  Join thousands of professionals worldwide who trust our platform for their link management needs.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    to="/register"
                    className="bg-white text-blue-600 py-4 px-8 rounded-lg font-medium hover:bg-gray-100 transition shadow-xl transform hover:-translate-y-1"
                  >
                    Create Free Account
                  </Link>
                  <Link
                    to="/login"
                    className="bg-blue-500 bg-opacity-20 text-white border border-white border-opacity-30 py-4 px-8 rounded-lg font-medium hover:bg-opacity-30 transition transform hover:-translate-y-1"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
      
      {/* Enhanced Footer with Newsletter Subscription */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">ShortLink</h3>
              <p className="text-gray-400 mb-6">The global link management platform for professionals worldwide.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
                    <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Developers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Stay Updated</h4>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and tips.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800 text-white border border-gray-700 rounded-l py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  className="bg-blue-600 text-white py-2 px-4 rounded-r hover:bg-blue-700 transition"
                >
                  Subscribe
                </button>
              </div>
              <div className="mt-4">
                <h4 className="font-bold mb-2">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center text-gray-400 mb-4 md:mb-0">
              <p className="mr-6">© 2025 ShortLink. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</a>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">Language:</span>
              <select className="bg-gray-800 text-white border border-gray-700 rounded py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
                <option value="ar">العربية</option>
                <option value="ru">Русский</option>
                <option value="pt">Português</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;