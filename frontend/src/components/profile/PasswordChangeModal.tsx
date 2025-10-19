
import React from 'react';

const PasswordChangeModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="modal" style={{ display: 'flex' }}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Change Password</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
            <input
              type="password"
              className="input-field w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-xl outline-none"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              className="input-field w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-xl outline-none"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
            <input
              type="password"
              className="input-field w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 rounded-xl outline-none"
              placeholder="Confirm new password"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-primary flex-1 px-6 py-3 text-white font-semibold rounded-xl"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
