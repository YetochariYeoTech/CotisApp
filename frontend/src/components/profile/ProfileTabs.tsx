
import React from 'react';

const ProfileTabs = ({ activeTab, switchTab }: { activeTab: string, switchTab: (tab: string) => void }) => {
  const tabs = [
    { id: 'personal', icon: 'fa-user', label: 'Personal Info' },
    { id: 'wallet', icon: 'fa-wallet', label: 'Wallet' },
    { id: 'security', icon: 'fa-shield-alt', label: 'Security' },
    { id: 'preferences', icon: 'fa-cog', label: 'Preferences' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2 mb-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button flex-1 md:flex-none px-6 py-3 rounded-xl font-semibold ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => switchTab(tab.id)}
          >
            <i className={`fas ${tab.icon} mr-2`}></i>{tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;
