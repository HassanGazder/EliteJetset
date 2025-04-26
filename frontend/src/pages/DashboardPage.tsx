import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, CheckCircle } from "lucide-react";
import MainLayout from "../components/layouts/MainLayout";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";

const DashboardPage: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const baseUrl = window.location.origin;
  const referralLink = `${baseUrl}/contact/${currentUser?.username}`;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (!currentUser) {
    return null;
  }

  return (
    <MainLayout>
      <div className="min-h-screen py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Welcome, {currentUser.firstName}!
              </h1>
              <p className="text-slate-600">
                You're now a Wanderlust Travels agent. Share your unique referral link to connect with potential clients.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-700 py-4 px-6">
                <h2 className="text-xl font-bold text-white">Your Agent Dashboard</h2>
              </div>

              <div className="p-6">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3 text-slate-800">Your Referral Link</h3>
                  <p className="text-slate-600 mb-4">
                    Share this unique link with potential clients. When they fill out the contact form, you'll be notified.
                  </p>

                  <div className="flex items-center">
                    <div className="flex-grow p-3 bg-slate-50 border border-slate-200 rounded-l-md text-slate-700 break-all">
                      {referralLink}
                    </div>
                    <button
                      onClick={handleCopyLink}
                      className={`p-3 flex items-center justify-center ${
                        copied ? "bg-green-600" : "bg-teal-600 hover:bg-teal-700"
                      } text-white rounded-r-md transition-colors min-w-20`}
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="h-5 w-5 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-5 w-5 mr-1" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md">
                  <h3 className="text-lg font-semibold mb-2 text-amber-800">How It Works</h3>
                  <ol className="list-decimal list-inside text-amber-700 space-y-2">
                    <li>Share your unique referral link with potential travelers</li>
                    <li>When they visit your link, they'll see a contact form</li>
                    <li>After they submit the form, you'll be notified via email</li>
                    <li>Follow up with them to help plan their perfect trip</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-700 py-4 px-6">
                <h2 className="text-xl font-bold text-white">Promotional Resources</h2>
              </div>

              <div className="p-6">
                <p className="text-slate-600 mb-4">
                  Use these resources to effectively promote your travel services on social media and other channels.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-slate-200 rounded-md p-4">
                    <h3 className="font-medium text-slate-800 mb-2">Social Media Post Template</h3>
                    <p className="text-slate-600 text-sm">
                      "Looking to plan your dream vacation? I can help make it perfect! As a Wanderlust Travels agent, I offer personalized travel planning. Contact me here: [YOUR REFERRAL LINK]"
                    </p>
                    <Button variant="outline" className="mt-3 text-sm py-2" onClick={handleCopyLink}>
                      Copy with Link
                    </Button>
                  </div>
                  
                  <div className="border border-slate-200 rounded-md p-4">
                    <h3 className="font-medium text-slate-800 mb-2">Email Template</h3>
                    <p className="text-slate-600 text-sm">
                      "Hi [NAME], I noticed you mentioned wanting to travel to [DESTINATION]. As a Wanderlust Travels agent, I'd be happy to help plan your trip. Use this link to tell me more: [YOUR REFERRAL LINK]"
                    </p>
                    <Button variant="outline" className="mt-3 text-sm py-2" onClick={handleCopyLink}>
                      Copy with Link
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;