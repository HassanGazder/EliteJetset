import React, { useState, useEffect } from 'react';
import { userApi } from '../../services/api';
import { User, Mail, Phone, Calendar } from 'lucide-react';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone?: string;
  joinDate: string;
  totalEarnings: number;
  completedBookings: number;
}

const defaultProfile: ProfileData = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  joinDate: new Date().toISOString(),
  totalEarnings: 0,
  completedBookings: 0
};

const ProfileTab: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userApi.getAgentProfile();
        if (response?.data) {
          setProfile({
            ...defaultProfile,
            ...response.data
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="bg-gradient-to-r from-orange-500 to-orange-700 p-6 rounded-t-lg">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-3 rounded-full">
              <User className="h-8 w-8 text-orange-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-orange-100">Travel Agent</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="text-gray-900">{profile.username}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-900">{profile.email}</p>
                </div>
              </div>

              {profile.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900">{profile.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-gray-900">{new Date(profile.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600">Total Earnings</p>
                  <p className="text-lg font-semibold text-green-900">
                    ${(profile.totalEarnings || 0).toFixed(2)}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600">Completed Bookings</p>
                  <p className="text-lg font-semibold text-blue-900">
                    {profile.completedBookings || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab; 