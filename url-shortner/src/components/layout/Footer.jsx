import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="text-xl font-bold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
              URLShortener
            </Link>
            <p className="mt-2 text-sm text-blue-100">
              Shorten, share, and track your links with ease.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-blue-100 hover:text-white transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-blue-100 hover:text-white transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-blue-100 hover:text-white transition">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-blue-100">
              Email: <a href="mailto:support@urlshortener.com" className="hover:text-white transition">support@urlshortener.com</a>
            </p>
            <p className="text-blue-100 mt-2">
              Phone: <a href="tel:+1234567890" className="hover:text-white transition">+1 (234) 567-890</a>
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-blue-500 pt-4 text-center">
          <p className="text-sm text-blue-100">
            &copy; {new Date().getFullYear()} URLShortener. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;