import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import MainLayout from '../components/layouts/MainLayout';
import { adminApi } from '../services/api';

const AdminPage: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Redirect if not authenticated or not an admin
    if (!isAuthenticated || (currentUser && currentUser.role !== 'admin')) {
      navigate('/login');
    }
  }, [isAuthenticated, currentUser, navigate]);

  const handleGenerateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    setRegistrationLink('');

    try {
      const response = await adminApi.generateRegistrationLink(email);
      setRegistrationLink(response.registrationLink);
      setSuccess('Registration link generated successfully!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to generate registration link. Please try again.');
      console.error('Error generating link:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(registrationLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!isAuthenticated || (currentUser && currentUser.role !== 'admin')) {
    return null;
  }

  return (
    <MainLayout>
      <div className="min-h-screen py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 py-4 px-6">
              <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Generate Agent Registration Link</h3>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  {success}
                </div>
              )}
              
              <form onSubmit={handleGenerateLink} className="mb-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Agent Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="agent@example.com"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Enter the email of the person you want to invite as an agent
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isLoading ? 'Generating...' : 'Generate Link'}
                </button>
              </form>
              
              {registrationLink && (
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Registration Link</h4>
                  <div className="flex">
                    <input
                      type="text"
                      value={registrationLink}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-white text-sm"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="bg-gray-200 px-4 py-2 rounded-r-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminPage; 