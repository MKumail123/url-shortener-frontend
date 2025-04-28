import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import ShortenForm from '../components/url/ShortenForm';

const HomePage = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div>
      <section className="py-10 md:py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shorten, Share, and Track Your Links
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create shorter links, QR codes, and track detailed analytics with our powerful URL shortening service.
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <Link
                to="/register"
                className="bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition"
              >
                Create Free Account
              </Link>
              <Link
                to="/login"
                className="bg-gray-100 text-gray-800 py-3 px-6 rounded-md font-medium hover:bg-gray-200 transition"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {isAuthenticated ? (
        <section className="py-8">
          <div className="container mx-auto">
            <ShortenForm />
          </div>
        </section>
      ) : (
        <>
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Easy Link Shortening</h3>
                  <p className="text-gray-600">
                    Transform long URLs into short, easy-to-share links with just a few clicks.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">QR Code Generation</h3>
                  <p className="text-gray-600">
                    Automatically generate QR codes for your shortened links for easy mobile access.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
                  <p className="text-gray-600">
                    Track clicks, locations, and visitor behavior with comprehensive analytics.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-4">01</div>
                  <h3 className="text-xl font-semibold mb-2">Paste Your URL</h3>
                  <p className="text-gray-600">
                    Enter the long URL you want to shorten and customize it if needed.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-4">02</div>
                  <h3 className="text-xl font-semibold mb-2">Shorten & Share</h3>
                  <p className="text-gray-600">
                    Get a shortened link and QR code, ready to share anywhere.
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-4">03</div>
                  <h3 className="text-xl font-semibold mb-2">Track Analytics</h3>
                  <p className="text-gray-600">
                    Monitor clicks, locations, and times with detailed insights.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 bg-gray-50">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                What Our Users Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      JD
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-800">John Doe</h4>
                      <p className="text-gray-500 text-sm">Marketing Manager</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "This tool has made sharing links so much easier! The analytics feature helps me understand my audience better."
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      JS
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-800">Jane Smith</h4>
                      <p className="text-gray-500 text-sm">Freelance Designer</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "I love the QR code feature! It’s perfect for my business cards and posters."
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      MK
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-800">Mike Khan</h4>
                      <p className="text-gray-500 text-sm">Small Business Owner</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "The ability to set active hours for my links has been a game-changer for my campaigns."
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 bg-blue-600 text-white">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust our service to shorten and track their links effortlessly.
              </p>
              <Link
                to="/register"
                className="bg-white text-blue-600 py-3 px-8 rounded-md font-medium hover:bg-gray-100 transition"
              >
                Sign Up Now
              </Link>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;