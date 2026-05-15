import { useState } from "react";

import SectionTitle from "../../components/SectionTitle";
import Breadcrumbs from "../../components/Breadcrumbs";
function SettingsPage({
  TopActionBar,
  darkMode,
  setDarkMode,
  panelBg,
  mutedText,
  showToast,
  addNotification,
  fakeDownload,
}) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Sara’s",
    email: "Sara’s@strategai.com",
    role: "Strategy Manager",
    memberSince: "March 2025",
  });

  const [preferences, setPreferences] = useState({
    language: "English / Arabic",
    emailNotifications: true,
    weeklySummary: true,
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    lastLogin: "Today, 3:48 AM",
  });

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
    showToast("success", "Profile updated", "Your profile changes were saved.");
    addNotification("Profile updated", "Your account profile was updated successfully.");
  };

  const handleExportData = () => {
    fakeDownload("Account data");
    addNotification("Export data", "Your account data export was prepared.");
  };

  const handleLogout = () => {
    showToast("success", "Logged out", "Logout action is ready for backend integration.");
  };

  return (
    <>
      <TopActionBar />
      <Breadcrumbs items={["Dashboard", "Settings"]} darkMode={darkMode} />

      <SectionTitle
        title="Settings"
        subtitle="Manage your account profile, preferences, security, and quick actions"
        darkMode={darkMode}
      />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className={`border rounded-2xl p-6 shadow-sm ${panelBg}`}>
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-[#355872] text-white flex items-center justify-center text-2xl font-bold">
                S
              </div>
              <div>
                <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Profile Overview
                </h3>
                <p className={`text-sm mt-1 ${mutedText}`}>
                  Your personal account information
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (isEditingProfile) {
                  handleSaveProfile();
                } else {
                  setIsEditingProfile(true);
                }
              }}
              className="bg-[#355872] hover:bg-[#7AAACE] text-white px-4 py-2 rounded-xl transition"
            >
              {isEditingProfile ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`block text-sm mb-2 ${mutedText}`}>Full Name</label>
              <input
                type="text"
                value={profileData.fullName}
                disabled={!isEditingProfile}
                onChange={(e) =>
                  setProfileData({ ...profileData, fullName: e.target.value })
                }
                className={`w-full border rounded-xl px-4 py-3 ${
                  darkMode
                    ? "bg-[#0F172A] border-gray-700 text-white disabled:opacity-80"
                    : "bg-gray-50 border-gray-200 text-gray-900 disabled:opacity-90"
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm mb-2 ${mutedText}`}>Email</label>
              <input
                type="email"
                value={profileData.email}
                disabled={!isEditingProfile}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className={`w-full border rounded-xl px-4 py-3 ${
                  darkMode
                    ? "bg-[#0F172A] border-gray-700 text-white disabled:opacity-80"
                    : "bg-gray-50 border-gray-200 text-gray-900 disabled:opacity-90"
                }`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`rounded-2xl border p-4 ${darkMode ? "bg-[#0F172A] border-gray-700" : "bg-[#F7F8F0] border-gray-200"}`}>
                <p className={`text-sm mb-1 ${mutedText}`}>Role</p>
                <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {profileData.role}
                </p>
              </div>

              <div className={`rounded-2xl border p-4 ${darkMode ? "bg-[#0F172A] border-gray-700" : "bg-[#F7F8F0] border-gray-200"}`}>
                <p className={`text-sm mb-1 ${mutedText}`}>Member Since</p>
                <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {profileData.memberSince}
                </p>
              </div>
            </div>

            {isEditingProfile && (
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSaveProfile}
                  className="bg-[#355872] hover:bg-[#7AAACE] text-white px-4 py-2 rounded-xl transition"
                >
                  Save
                </button>

                <button
                  onClick={() => setIsEditingProfile(false)}
                  className={`px-4 py-2 rounded-xl border transition ${
                    darkMode
                      ? "border-gray-600 text-gray-100 hover:bg-gray-800"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={`border rounded-2xl p-6 shadow-sm ${panelBg}`}>
          <h3 className={`text-xl font-semibold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Preferences
          </h3>

          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className={darkMode ? "text-white font-medium" : "text-gray-900 font-medium"}>Theme</p>
                <p className={`text-sm mt-1 ${mutedText}`}>Switch between light and dark mode</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`px-4 py-2 rounded-xl transition ${
                  darkMode
                    ? "bg-[#355872] text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {darkMode ? "Dark" : "Light"}
              </button>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className={darkMode ? "text-white font-medium" : "text-gray-900 font-medium"}>Language</p>
                <p className={`text-sm mt-1 ${mutedText}`}>Choose your preferred interface language</p>
              </div>
              <span className="text-[#355872] font-medium">{preferences.language}</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className={darkMode ? "text-white font-medium" : "text-gray-900 font-medium"}>Notifications</p>
                <p className={`text-sm mt-1 ${mutedText}`}>Receive product and report updates</p>
              </div>
              <button
                onClick={() =>
                  setPreferences({
                    ...preferences,
                    emailNotifications: !preferences.emailNotifications,
                  })
                }
                className={`px-4 py-2 rounded-xl transition ${
                  preferences.emailNotifications
                    ? "bg-[#355872] text-white"
                    : darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {preferences.emailNotifications ? "Enabled" : "Disabled"}
              </button>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className={darkMode ? "text-white font-medium" : "text-gray-900 font-medium"}>Weekly Summary</p>
                <p className={`text-sm mt-1 ${mutedText}`}>Get a weekly email summary of activity</p>
              </div>
              <button
                onClick={() =>
                  setPreferences({
                    ...preferences,
                    weeklySummary: !preferences.weeklySummary,
                  })
                }
                className={`px-4 py-2 rounded-xl transition ${
                  preferences.weeklySummary
                    ? "bg-[#355872] text-white"
                    : darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {preferences.weeklySummary ? "Enabled" : "Disabled"}
              </button>
            </div>
          </div>
        </div>

        <div className={`border rounded-2xl p-6 shadow-sm ${panelBg}`}>
          <h3 className={`text-xl font-semibold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Security
          </h3>

          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className={darkMode ? "text-white font-medium" : "text-gray-900 font-medium"}>Change Password</p>
                <p className={`text-sm mt-1 ${mutedText}`}>Update your password for better account security</p>
              </div>
              <button
                onClick={() => {
                  showToast("success", "Change password", "Password change flow is ready for backend integration.");
                  addNotification("Security update", "Password change action was opened.");
                }}
                className={`px-4 py-2 rounded-xl border transition ${
                  darkMode
                    ? "border-gray-600 text-gray-100 hover:bg-gray-800"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Change
              </button>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className={darkMode ? "text-white font-medium" : "text-gray-900 font-medium"}>Two-Factor Authentication</p>
                <p className={`text-sm mt-1 ${mutedText}`}>Add an extra layer of protection to your account</p>
              </div>
              <button
                onClick={() =>
                  setSecurity({
                    ...security,
                    twoFactorEnabled: !security.twoFactorEnabled,
                  })
                }
                className={`px-4 py-2 rounded-xl transition ${
                  security.twoFactorEnabled
                    ? "bg-[#355872] text-white"
                    : darkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {security.twoFactorEnabled ? "Enabled" : "Disabled"}
              </button>
            </div>

            <div className={`rounded-2xl border p-4 ${darkMode ? "bg-[#0F172A] border-gray-700" : "bg-[#F7F8F0] border-gray-200"}`}>
              <p className={`text-sm mb-1 ${mutedText}`}>Last Login</p>
              <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {security.lastLogin}
              </p>
            </div>
          </div>
        </div>

        <div className={`border rounded-2xl p-6 shadow-sm ${panelBg}`}>
          <h3 className={`text-xl font-semibold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Quick Actions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleExportData}
              className="bg-[#355872] hover:bg-[#7AAACE] text-white px-5 py-4 rounded-2xl transition text-left"
            >
              <p className="font-semibold">Export Data</p>
              <p className="text-sm text-white/80 mt-1">Download your account summary and settings</p>
            </button>

            <button
              onClick={handleLogout}
              className={`px-5 py-4 rounded-2xl transition text-left border ${
                darkMode
                  ? "border-red-400 text-red-300 hover:bg-red-950/30"
                  : "border-red-200 text-red-500 hover:bg-red-50"
              }`}
            >
              <p className="font-semibold">Logout</p>
              <p className="text-sm mt-1 opacity-80">Sign out from your current session</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsPage;
