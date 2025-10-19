
import React from 'react';

const PreferencesTab = () => {
  return (
    <div id="preferences-tab" className="lg:col-span-2">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <i className="fas fa-cog text-blue-500 mr-3"></i>Notification & Preferences
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">Email Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
                </div>
                <label className="relative inline-block w-14 h-8">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <div className="w-14 h-8 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition cursor-pointer"></div>
                  <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition peer-checked:translate-x-6"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">SMS Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get important alerts via SMS</p>
                </div>
                <label className="relative inline-block w-14 h-8">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="w-14 h-8 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition cursor-pointer"></div>
                  <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition peer-checked:translate-x-6"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">Push Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Browser notifications for updates</p>
                </div>
                <label className="relative inline-block w-14 h-8">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <div className="w-14 h-8 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition cursor-pointer"></div>
                  <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition peer-checked:translate-x-6"></div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Regional Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Language</label>
                <select className="input-field w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-xl outline-none">
                  <option>English</option>
                  <option>Français</option>
                  <option>Español</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
                <select className="input-field w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-xl outline-none">
                  <option>GMT+1 (WAT)</option>
                  <option>GMT+0 (UTC)</option>
                  <option>GMT-5 (EST)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesTab;
