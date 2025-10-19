import React, { useState } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTabs from "../components/profile/ProfileTabs";
import PersonalInfoTab from "../components/profile/PersonalInfoTab";
import WalletTab from "../components/profile/WalletTab";
import SecurityTab from "../components/profile/SecurityTab";
import PreferencesTab from "../components/profile/PreferencesTab";
import QuickActions from "../components/profile/QuickActions";
import PasswordChangeModal from "../components/profile/PasswordChangeModal";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 md:p-8 bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <ProfileHeader />
        <ProfileTabs activeTab={activeTab} switchTab={switchTab} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            className={`${
              activeTab === "personal" ? "" : "hidden"
            } lg:col-span-2`}
          >
            <PersonalInfoTab />
          </div>
          <div
            className={`${
              activeTab === "wallet" ? "" : "hidden"
            } lg:col-span-2`}
          >
            <WalletTab />
          </div>
          <div
            className={`${
              activeTab === "security" ? "" : "hidden"
            } lg:col-span-2`}
          >
            <SecurityTab />
          </div>
          <div
            className={`${
              activeTab === "preferences" ? "" : "hidden"
            } lg:col-span-2`}
          >
            <PreferencesTab />
          </div>

          <QuickActions />
        </div>

        <PasswordChangeModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
};

export default ProfilePage;
