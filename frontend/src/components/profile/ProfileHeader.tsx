
import React from 'react';
import { useAuthStore } from '../../stores/authStore';

const ProfileHeader = () => {
  const user = useAuthStore(state => state.user);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-700 dark:to-blue-600 rounded-2xl shadow-lg overflow-hidden mb-6">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-white">
            <img
              src={`https://ui-avatars.com/api/?name=${user?.fullName}&size=256&background=3B82F6&color=fff&bold=true`}
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-white dark:text-gray-100">
                {user?.fullName}
              </h1>
              <button className="text-white dark:text-gray-200 hover:text-blue-100 dark:hover:text-blue-300 transition">
                <i className="fas fa-edit"></i>
              </button>
            </div>
            <p className="text-blue-100 dark:text-blue-200 text-lg mb-2">
              @{user?.email.split('@')[0]} • Member ID: #{user?.id}
            </p>
            <span className="inline-block bg-white/20 dark:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white dark:text-gray-100 font-semibold">
              <i className="fas fa-crown mr-2"></i>{user?.role}
            </span>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
            <div className="stat-card bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
              <p className="text-blue-100 dark:text-blue-200 text-sm mb-1">Wallet Balance</p>
              <p className="text-2xl font-bold text-white dark:text-gray-100">12,500 CFA</p>
            </div>
            <div className="stat-card bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
              <p className="text-blue-100 dark:text-blue-200 text-sm mb-1">Total Contributions</p>
              <p className="text-2xl font-bold text-white dark:text-gray-100">45,000 CFA</p>
            </div>
            <div className="stat-card bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
              <p className="text-blue-100 dark:text-blue-200 text-sm mb-1">Next Due</p>
              <p className="text-2xl font-bold text-white dark:text-gray-100">5 days</p>
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="mt-6 bg-white/10 dark:bg-white/5 backdrop-blur-sm p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white dark:text-gray-100 font-semibold">Profile Completion</span>
            <span className="text-white dark:text-gray-100 font-bold">80%</span>
          </div>
          <div className="w-full bg-white/20 dark:bg-white/10 rounded-full h-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-teal-500" style={{ width: '80%' }}></div>
          </div>
          <p className="text-blue-100 dark:text-blue-200 text-sm mt-2">
            <i className="fas fa-info-circle mr-1"></i>Add your phone number to enhance account recovery
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
