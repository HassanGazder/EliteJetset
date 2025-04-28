import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import EarningsTab from '../components/dashboard/EarningsTab';
import ProfileTab from '../components/dashboard/ProfileTab';

const DashboardPage: React.FC = () => {
  const { currentUser: user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats] = useState({
    recentVisits: 0,
    recentReferrals: 0,
    recentEarnings: 0
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCopyReferralLink = () => {
    const referralLink = `/contact/${user?.username}`;
    navigator.clipboard.writeText(window.location.origin + referralLink);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-medium text-gray-600">Recent Visits</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.recentVisits}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-medium text-gray-600">Recent Referrals</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.recentReferrals}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-medium text-gray-600">Recent Earnings</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">${stats.recentEarnings}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Statistics</h2>
              <div className="h-[300px] w-full">
                {/* Graph placeholder - you'll need to implement actual graph */}
                <div className="w-full h-full bg-gray-50 rounded-lg border flex items-center justify-center">
                  <p className="text-gray-500">Activity Graph</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Your Referral Link</h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  readOnly
                  value={window.location.origin + `/contact/${user?.username}`}
                  className="flex-1 p-2 border rounded-md bg-gray-50"
                />
                <button
                  onClick={handleCopyReferralLink}
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        );
      case 'earnings':
        return <EarningsTab />;
      case 'profile':
        return <ProfileTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
        <div className="bg-white rounded-lg shadow">
          <div className="border-b">
            <nav className="flex space-x-4 p-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'overview'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('earnings')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'earnings'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Earnings
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'profile'
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Profile
              </button>
            </nav>
          </div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;