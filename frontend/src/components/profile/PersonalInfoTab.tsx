
import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';

const PersonalInfoTab = () => {
  const user = useAuthStore(state => state.user);
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const saveChanges = () => {
    // Here you would typically handle saving the data
    console.log('Changes saved!');
    toggleEditMode();
  };

  return (
    <div id="personal-tab" className="lg:col-span-2">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <i className="fas fa-user-circle text-blue-500 mr-3"></i>Personal Information
        </h2>

        <form id="personal-form" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                defaultValue={user?.fullName}
                className="input-field w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-xl outline-none"
                disabled={!isEditMode}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Username</label>
              <input
                type="text"
                defaultValue={user?.email.split('@')[0]}
                className="input-field w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-xl outline-none"
                disabled={!isEditMode}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                defaultValue={user?.email}
                className="input-field w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-xl outline-none"
                disabled={!isEditMode}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="Add phone number"
                defaultValue={user?.phoneNumber}
                className="input-field w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-xl outline-none"
                disabled={!isEditMode}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Adhesion Date</label>
              <input
                type="text"
                defaultValue={new Date(user?.joinDate).toLocaleDateString()}
                className="input-field w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-xl outline-none"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Gender</label>
              <select
                className="input-field w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-xl outline-none"
                disabled={!isEditMode}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </div>
          </div>

          <div id="save-button-container" className={`${isEditMode ? '' : 'hidden'} pt-4`}>
            <button
              type="button"
              onClick={saveChanges}
              className="btn-primary w-full md:w-auto px-8 py-3 text-white font-semibold rounded-xl"
            >
              <i className="fas fa-save mr-2"></i>Save Changes
            </button>
          </div>
        </form>
        <button onClick={toggleEditMode} className="absolute top-6 right-6 text-gray-500 hover:text-blue-500">
          <i className="fas fa-edit"></i>
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoTab;
