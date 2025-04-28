import React, { useState } from "react";
import { Copy, CheckCircle, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const DashboardPage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [copied, setCopied] = useState(false);
  const baseUrl = import.meta.env.VITE_FRONTEND_URL || window.location.origin;
  const referralLink = `${baseUrl}/contact/${currentUser?.username}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Logout Button */}
      <div className="w-full flex justify-end p-4">
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded shadow"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
      {/* Dashboard Card */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8 mt-4">
        {/* Overview Tabs (static, just Overview highlighted) */}
        <div className="flex border-b mb-6">
          <button className="px-6 py-2 font-semibold text-orange-600 border-b-2 border-orange-500 focus:outline-none">Overview</button>
        </div>
        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded p-4 text-center">
            <div className="text-sm text-gray-500 mb-1">Recent Visits</div>
            <div className="text-2xl font-bold text-gray-800">0</div>
          </div>
          <div className="bg-gray-50 rounded p-4 text-center">
            <div className="text-sm text-gray-500 mb-1">Recent Referrals</div>
            <div className="text-2xl font-bold text-gray-800">0</div>
          </div>
          <div className="bg-gray-50 rounded p-4 text-center">
            <div className="text-sm text-gray-500 mb-1">Recent Earnings</div>
            <div className="text-2xl font-bold text-gray-800">0</div>
          </div>
        </div>
        {/* Chart Placeholder */}
        <div className="bg-white border rounded mb-8" style={{height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <span className="text-gray-400">[Chart Placeholder]</span>
        </div>
        {/* Referral Link */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2 text-gray-700">Links</h4>
          <div className="mb-2 text-sm text-gray-600">Your affiliate URL:</div>
          <div className="flex">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-white text-sm"
            />
            <button
              onClick={handleCopyLink}
              className={`bg-orange-200 px-4 py-2 rounded-r-md hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-orange-800`}
            >
              {copied ? (
                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Copied!</span>
              ) : (
                <span className="flex items-center gap-1"><Copy className="w-4 h-4" /> Copy</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;