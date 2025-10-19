
import React from 'react';

const SecurityTab = () => {
  return (
    <div id="security-tab" className="lg:col-span-2">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <i className="fas fa-shield-alt text-blue-500 mr-3"></i>Security Settings
        </h2>

        <div className="space-y-4">
          <div className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-300 transition cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                  <i className="fas fa-key text-blue-500"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">Change Password</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Update your password regularly for security</p>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </div>
          </div>

          <div className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                  <i className="fas fa-mobile-alt text-green-500"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                </div>
              </div>
              <label className="relative inline-block w-14 h-8">
                <input type="checkbox" className="peer sr-only" />
                <div className="w-14 h-8 bg-gray-300 peer-checked:bg-green-500 rounded-full transition cursor-pointer"></div>
                <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition peer-checked:translate-x-6"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Recent Login Activity</h2>

        <div className="space-y-3">
          {/* Session Rows */}
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
