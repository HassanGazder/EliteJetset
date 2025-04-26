import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="text-xl font-bold text-gray-800"
              >
                {/* Elite JetSet */}
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;