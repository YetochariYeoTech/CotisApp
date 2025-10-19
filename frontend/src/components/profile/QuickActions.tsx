
import React from 'react';

const QuickActions = () => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-300 transition">
            <i className="fas fa-download text-blue-500"></i>
            <span className="font-semibold text-gray-700 dark:text-gray-300">Download Statement</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-300 transition">
            <i className="fas fa-file-invoice text-green-500"></i>
            <span className="font-semibold text-gray-700 dark:text-gray-300">View Invoices</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl hover:border-blue-300 transition">
            <i className="fas fa-question-circle text-purple-500"></i>
            <span className="font-semibold text-gray-700 dark:text-gray-300">Help Center</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
