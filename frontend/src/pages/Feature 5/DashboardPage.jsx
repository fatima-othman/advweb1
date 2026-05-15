import TopActionBar from "../../components/TopActionBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import SectionTitle from "../../components/SectionTitle";
import MiniBarChart from "../../components/MiniBarChart";
function DashboardPage({
  darkMode,
  showNotifications,
  setShowNotifications,
  unreadNotifications,
  notifications,
  mutedText,
  markAllNotificationsRead,
  navigate,
  stats,
  panelBg,
  topProject,
  weakestReport,
  totalActiveProjects,
  dashboardChartData,
  reportTypeChart,
  recentlyViewed,
  reports,
  setSelectedReport,
  addRecentItem,
  activities,
  userName = "there",
}) {
  return (
    <>
     <TopActionBar
  darkMode={darkMode}
  showNotifications={showNotifications}
  setShowNotifications={setShowNotifications}
  unreadNotifications={unreadNotifications}
  notifications={notifications}
  mutedText={mutedText}
  markAllNotificationsRead={markAllNotificationsRead}
/>
      <Breadcrumbs items={["Dashboard"]} darkMode={darkMode} />

      <SectionTitle
        title={`Welcome back, ${userName}!`}


        subtitle="Here’s a summary of your strategy activity"
        darkMode={darkMode}
        action={
          <button
            onClick={() => navigate("/projects")}
            className="bg-[#355872] hover:bg-[#7AAACE] text-white px-5 py-3 rounded-xl shadow-sm transition hover:scale-[1.02]"
          >
            + New Project
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`rounded-2xl border p-6 shadow-sm transition hover:-translate-y-1 ${panelBg}`}
          >
            <div className="text-xl mb-4">{item.icon}</div>
            <p className="text-xs font-semibold tracking-wide uppercase mb-2 text-gray-400">
              {item.title}
            </p>
            <h3 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{item.value}</h3>
            <p className={`text-sm mt-2 ${item.subColor}`}>{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className={`rounded-2xl border p-6 shadow-sm ${panelBg}`}>
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Smart Insights
          </h3>
          <div className={`space-y-4 text-sm ${mutedText}`}>
            <div>
              <p className="mb-1">Top Project</p>
              <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {topProject?.name} ({topProject?.avg || 0}%)
              </p>
            </div>
            <div>
              <p className="mb-1">Needs Attention</p>
              <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {weakestReport?.name} ({weakestReport?.score || 0}%)
              </p>
            </div>
            <div>
              <p className="mb-1">Active Projects</p>
              <p className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {totalActiveProjects} active projects
              </p>
            </div>
          </div>
        </div>

        <MiniBarChart title="Monthly Performance" data={dashboardChartData} darkMode={darkMode} />
        <MiniBarChart title="Report Type Scores" data={reportTypeChart} darkMode={darkMode} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <section className={`rounded-2xl border p-6 shadow-sm ${panelBg}`}>
          <h3 className={`text-lg font-semibold mb-5 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Recently Viewed
          </h3>

          {recentlyViewed.length === 0 ? (
            <div className={`rounded-2xl p-6 text-center ${darkMode ? "bg-[#0F172A] text-gray-300" : "bg-[#F7F8F0] text-gray-500"}`}>
              No items viewed yet.
            </div>
          ) : (
            <div className="space-y-3">
              {recentlyViewed.map((item, index) => (
                <div
                  key={`${item.type}-${item.title}-${index}`}
                  className={`rounded-2xl border p-4 ${
                    darkMode ? "bg-[#0F172A] border-gray-700" : "bg-[#F7F8F0] border-gray-200"
                  }`}
                >
                  <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>{item.title}</p>
                  <p className={`text-sm mt-1 ${mutedText}`}>{item.subtitle}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className={`rounded-2xl border p-6 shadow-sm ${panelBg}`}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Last Report Generated
              </h3>
              <p className={`text-sm ${mutedText}`}>
                Quick access to your most recent strategy
              </p>
            </div>
            <button
              onClick={() => navigate("/history")}
              className={`px-4 py-2 rounded-xl border text-sm transition ${
                darkMode
                  ? "border-gray-600 text-gray-100 hover:bg-gray-800"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              View All
            </button>
          </div>

          <div className={`rounded-2xl border p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${
            darkMode ? "bg-[#0F172A] border-gray-700" : "bg-[#F7F8F0] border-gray-200"
          }`}>
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl bg-[#355872] text-white flex items-center justify-center text-2xl">
                📊
              </div>
              <div>
                <h4 className={`font-semibold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>
                  Sara’s Skincare Store
                </h4>
                <div className={`flex flex-wrap gap-3 text-sm mt-2 ${mutedText}`}>
                  <span>E-commerce</span>
                  <span>Arabic</span>
                  <span>7 sections</span>
                </div>
                <div className={`flex flex-wrap gap-3 text-sm mt-2 ${mutedText}`}>
                  <span>📅 Apr 27, 2025</span>
                  <span>💰 $400/mo</span>
                  <span>📍 Saudi Arabia</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedReport(reports[0]);
                addRecentItem({
                  type: "report",
                  title: reports[0].name,
                  subtitle: `${reports[0].project} • ${reports[0].type}`,
                });
                navigate("/report-details");
              }}
              className="bg-[#355872] hover:bg-[#7AAACE] text-white px-5 py-3 rounded-xl transition"
            >
              View Report →
            </button>
          </div>
        </section>
      </div>

      <section className={`rounded-2xl border p-6 shadow-sm ${panelBg}`}>
        <h3 className={`text-lg font-semibold mb-5 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Recent Activity
        </h3>

        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className={`flex items-center justify-between pb-4 last:border-b-0 ${
                darkMode ? "border-b border-gray-700" : "border-b border-gray-100"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`h-3 w-3 rounded-full ${activity.color}`}></span>
                <p className={`text-sm md:text-base ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                  {activity.text}
                </p>
              </div>
              <span className={`text-sm whitespace-nowrap ${mutedText}`}>
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
   );
}

export default DashboardPage;
