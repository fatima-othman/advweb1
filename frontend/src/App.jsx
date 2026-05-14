import { useEffect, useMemo, useState } from "react";
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import SectionTitle from "./components/SectionTitle";
import Breadcrumbs from "./components/Breadcrumbs";
import StatusBadge from "./components/StatusBadge";
import Toast from "./components/Toast";
import SearchHighlight from "./components/SearchHighlight";
import MiniBarChart from "./components/MiniBarChart";
import ComparisonCard from "./components/ComparisonCard";
import LoadingSkeleton from "./components/LoadingSkeleton";
import ProjectsPage from "./pages/Feature 5/ProjectsPage";
import BillingPage from "./pages/Feature 5/BillingPage";
import SettingsPage from "./pages/Feature 5/SettingsPage";
import DashboardLayout from "./layouts/DashboardLayout";
import TopActionBar from "./components/TopActionBar";
import DashboardPage from "./pages/Feature 5/DashboardPage";
import ReportHistoryPage from "./pages/Feature 5/ReportHistoryPage";



function App() {
  const [selectedReports, setSelectedReports] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectFilter, setProjectFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");
  const [reportSearch, setReportSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projectSort, setProjectSort] = useState("name-asc");
  const [reportSort, setReportSort] = useState("date-desc");
  const [toast, setToast] = useState(null);
  const [favoriteProjects, setFavoriteProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Report generated", message: "Q1 Growth Strategy was generated.", time: "2 min ago", isRead: false },
    { id: 2, title: "Project updated", message: "TechFlow SaaS details were updated.", time: "10 min ago", isRead: false },
    { id: 3, title: "New credit recharge", message: "50 credits were recharged successfully.", time: "1 hour ago", isRead: true },
    { id: 4, title: "Comparison completed", message: "Two reports were compared successfully.", time: "Today", isRead: true },
  ]);

  const [newProject, setNewProject] = useState({
    name: "",
    type: "",
    country: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (type, title, message = "") => {
    setToast({ type, title, message });
    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const addNotification = (title, message) => {
    setNotifications((prev) => [
      {
        id: Date.now(),
        title,
        message,
        time: "Just now",
        isRead: false,
      },
      ...prev,
    ]);
  };

  const addRecentItem = (item) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((entry) => !(entry.type === item.type && entry.title === item.title));
      return [item, ...filtered].slice(0, 5);
    });
  };

  const unreadNotifications = notifications.filter((n) => !n.isRead).length;

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  const stats = [
    {
      title: "CREDIT BALANCE",
      value: "45",
      sub: "Bonus Active",
      icon: "🪙",
      subColor: "text-green-600",
    },
    {
      title: "TOTAL REPORTS",
      value: "12",
      sub: "+3 this week",
      icon: "📄",
      subColor: "text-green-600",
    },
    {
      title: "AVERAGE SCORE",
      value: "89%",
      sub: "+5% vs last month",
      icon: "📈",
      subColor: "text-green-600",
    },
    {
      title: "TOTAL DOWNLOADS",
      value: "28",
      sub: "PDF exports",
      icon: "⬇️",
      subColor: "text-gray-500",
    },
  ];

  const dashboardChartData = [
    { label: "Jan", value: 68 },
    { label: "Feb", value: 74 },
    { label: "Mar", value: 81 },
    { label: "Apr", value: 89 },
  ];

  const reportTypeChart = [
    { label: "Growth", value: 89 },
    { label: "Pricing", value: 84 },
    { label: "Marketing", value: 91 },
    { label: "Branding", value: 86 },
  ];
  const [projects, setProjects] = useState([]);
  const [reports, setReports] = useState([]);

const fetchProjects = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/projects");
    setProjects(response.data);
  } catch (error) {
    console.log(error);
  }
};
const fetchReports = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/reports");
    setReports(response.data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchProjects();
  fetchReports();
}, []);
  

  
   

  const activities = [
    {
      color: "bg-blue-500",
      text: "Generated report for Sara’s Skincare Store",
      time: "2 hours ago",
    },
    {
      color: "bg-green-500",
      text: "Auto-recharged 50 credits via saved card",
      time: "2 hours ago",
    },
    {
      color: "bg-purple-500",
      text: "Generated report for TechFlow SaaS",
      time: "Apr 25",
    },
    {
      color: "bg-yellow-400",
      text: "Exported PDF - Rana’s Food Truck strategy",
      time: "Apr 22",
    },
  ];

  const selectedReportObjects = useMemo(
    () => reports.filter((report) => selectedReports.includes(report.id)),
    [selectedReports]
  );

  const canCompare =
    selectedReportObjects.length === 2 &&
    selectedReportObjects[0].projectId === selectedReportObjects[1].projectId;

  const topProject = useMemo(() => {
    const projectScores = projects.map((project) => {
      const related = reports.filter((r) => r.projectId === project.id);
      const avg =
        related.length > 0
          ? Math.round(related.reduce((sum, item) => sum + item.score, 0) / related.length)
          : 0;
      return { ...project, avg };
    });

    return projectScores.sort((a, b) => b.avg - a.avg)[0];
  }, [projects]);

  const weakestReport = useMemo(() => {
    return [...reports].sort((a, b) => a.score - b.score)[0];
  }, []);

  const totalActiveProjects = projects.filter((project) => project.reports > 0).length;

  const sortedFilteredReports = useMemo(() => {
    const filtered = reports.filter((report) => {
      const matchesSearch =
        report.name.toLowerCase().includes(reportSearch.toLowerCase()) ||
        report.project.toLowerCase().includes(reportSearch.toLowerCase());

      const matchesProject =
        projectFilter === "all" || report.projectId === Number(projectFilter);

      const matchesType = typeFilter === "all" || report.type === typeFilter;

      const matchesDate = dateFilter === "" || report.date === dateFilter;

      return matchesSearch && matchesProject && matchesType && matchesDate;
    });

    const sorted = [...filtered];

    switch (reportSort) {
      case "score-desc":
        sorted.sort((a, b) => b.score - a.score);
        break;
      case "score-asc":
        sorted.sort((a, b) => a.score - b.score);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "date-asc":
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "date-desc":
      default:
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
    }

    return sorted;
  }, [reports, reportSearch, projectFilter, typeFilter, dateFilter, reportSort]);

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((project) =>
      project.name.toLowerCase().includes(projectSearch.toLowerCase())
    );

    const favoriteFirst = [...filtered].sort((a, b) => {
      const aFav = favoriteProjects.includes(a.id) ? 1 : 0;
      const bFav = favoriteProjects.includes(b.id) ? 1 : 0;
      return bFav - aFav;
    });

    switch (projectSort) {
      case "name-desc":
        favoriteFirst.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "reports-desc":
        favoriteFirst.sort((a, b) => b.reports - a.reports);
        break;
      case "reports-asc":
        favoriteFirst.sort((a, b) => a.reports - b.reports);
        break;
      case "name-asc":
      default:
        favoriteFirst.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return favoriteFirst;
  }, [projects, projectSearch, projectSort, favoriteProjects]);

  const toggleReportSelection = (reportId, projectId) => {
    const isSelected = selectedReports.includes(reportId);

    if (isSelected) {
      setSelectedReports((prev) => prev.filter((id) => id !== reportId));
      return;
    }

    if (selectedReports.length === 0) {
      setSelectedReports([reportId]);
      return;
    }

    if (selectedReports.length === 1) {
      const firstReport = reports.find((r) => r.id === selectedReports[0]);
      if (firstReport.projectId !== projectId) {
        showToast("error", "Invalid comparison", "You can compare only 2 reports from the same project.");
        return;
      }
      setSelectedReports((prev) => [...prev, reportId]);
      addNotification("Comparison updated", "A second report was selected for comparison.");
      return;
    }

    showToast("error", "Selection limit", "You can select up to 2 reports only.");
  };

  const clearProjectFilters = () => {
    setProjectSearch("");
    setProjectSort("name-asc");
  };

  const clearReportFilters = () => {
    setReportSearch("");
    setProjectFilter("all");
    setTypeFilter("all");
    setDateFilter("");
    setReportSort("date-desc");
  };

  const pageBg = darkMode ? "bg-[#0B1220]" : "bg-[#F7F8F0]";
  const pageText = darkMode ? "text-gray-100" : "text-gray-800";
  const panelBg = darkMode ? "bg-[#111827] border-gray-700" : "bg-white border-gray-200";
  const mutedText = darkMode ? "text-gray-300" : "text-gray-500";

  const getReportStatus = (score) => {
    if (score >= 90) return { label: "Excellent", variant: "default" };
    if (score >= 80) return { label: "Good", variant: "warning" };
    return { label: "Needs Review", variant: "danger" };
  };

  const copyToClipboard = async (text, successTitle = "Copied", successMessage = "Copied to clipboard.") => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("success", successTitle, successMessage);
    } catch {
      showToast("error", "Copy failed", "Unable to copy right now.");
    }
  };

  const fakeShare = (title) => {
    showToast("success", "Share action", `${title} is ready to be shared.`);
  };

  const fakeDownload = (title) => {
    showToast("success", "Export started", `${title} export is ready for backend integration.`);
  };

  const NavButton = ({ to, label }) => {
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        className={`block w-full rounded-xl px-4 py-3 text-left transition ${
          isActive
            ? "bg-[#9CD5FF] text-[#355872] font-semibold"
            : darkMode
            ? "text-gray-300 hover:bg-gray-800"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        {label}
      </Link>
    );
  };

  

  
  const ProjectDetailsPage = () => {
    if (!selectedProject) {
      return (
        <div className={`border rounded-2xl p-10 text-center ${panelBg} ${mutedText}`}>
          No project selected yet.
        </div>
      );
    }

    const projectReports = reports.filter((report) => report.projectId === selectedProject.id);

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
        <Breadcrumbs items={["Dashboard", "Projects", selectedProject.name]} darkMode={darkMode} />

        <SectionTitle
          title={selectedProject.name}
          subtitle="Project details page — all reports under this specific project"
          darkMode={darkMode}
          action={
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => navigate("/projects")}
                className={`px-5 py-3 rounded-xl border transition ${
                  darkMode
                    ? "border-gray-600 text-gray-100 hover:bg-gray-800"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                ← Back to Projects
              </button>
              <button
                className="px-5 py-3 rounded-xl bg-[#355872] text-white hover:bg-[#7AAACE] transition"
                onClick={() => showToast("success", "Quick action", "New report action is ready for backend integration.")}
              >
                + New Report
              </button>
              <button
                onClick={() => fakeDownload(selectedProject.name)}
                className={`px-5 py-3 rounded-xl border transition ${
                  darkMode
                    ? "border-gray-600 text-gray-100 hover:bg-gray-800"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                Export PDF
              </button>
            </div>
          }
        />

        <div className={`border rounded-2xl p-6 shadow-sm mb-8 ${panelBg}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className={`rounded-2xl border p-5 ${darkMode ? "bg-[#0F172A] border-gray-700" : "bg-[#F7F8F0] border-gray-200"}`}>
              <p className={`text-sm mb-2 ${mutedText}`}>Project Type</p>
              <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {selectedProject.type}
              </h3>
            </div>

            <div className={`rounded-2xl border p-5 ${darkMode ? "bg-[#0F172A] border-gray-700" : "bg-[#F7F8F0] border-gray-200"}`}>
              <p className={`text-sm mb-2 ${mutedText}`}>Country</p>
              <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {selectedProject.country}
              </h3>
            </div>

            <div className={`rounded-2xl border p-5 ${darkMode ? "bg-[#0F172A] border-gray-700" : "bg-[#F7F8F0] border-gray-200"}`}>
              <p className={`text-sm mb-2 ${mutedText}`}>Total Reports</p>
              <h3 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {projectReports.length}
              </h3>
            </div>
          </div>
        </div>

        <div className={`border rounded-2xl shadow-sm overflow-hidden ${panelBg}`}>
          <div className={`grid grid-cols-6 gap-4 px-6 py-4 border-b text-sm font-semibold ${
            darkMode
              ? "border-gray-700 text-gray-300 bg-[#0F172A]"
              : "border-gray-200 text-gray-500 bg-[#F7F8F0]"
          }`}>
            <div>Report Name</div>
            <div>Type</div>
            <div>Date</div>
            <div>Sections</div>
            <div>Score</div>
            <div>Status</div>
          </div>

          {projectReports.map((report) => {
            const status = getReportStatus(report.score);

            return (
              <button
                key={report.id}
                onClick={() => {
                  setSelectedReport(report);
                  addRecentItem({
                    type: "report",
                    title: report.name,
                    subtitle: `${report.project} • ${report.type}`,
                  });
                  navigate("/report-details");
                }}
                className={`w-full grid grid-cols-6 gap-4 px-6 py-4 border-b last:border-b-0 items-center text-sm text-left transition ${
                  darkMode
                    ? "border-gray-700 hover:bg-[#0F172A]"
                    : "border-gray-100 hover:bg-[#F7F8F0]"
                }`}
              >
                <div className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>{report.name}</div>
                <div className={mutedText}>{report.type}</div>
                <div className={mutedText}>{report.date}</div>
                <div className={mutedText}>{report.sections}</div>
                <div className="text-[#355872] font-semibold">{report.score}%</div>
                <div>
                  <StatusBadge label={status.label} darkMode={darkMode} variant={status.variant} />
                </div>
              </button>
            );
          })}

          {projectReports.length === 0 && (
            <div className={`px-6 py-8 text-center ${mutedText}`}>
              No reports found for this project.
            </div>
          )}
        </div>
      </>
    );
  };

  const ReportDetailsPage = () => {
    if (!selectedReport) {
      return (
        <div className={`border rounded-2xl p-10 text-center ${panelBg} ${mutedText}`}>
          No report selected yet.
        </div>
      );
    }

    const reportUrl = `https://strategai.local/report/${selectedReport.id}`;

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
        <Breadcrumbs items={["Dashboard", "Report History", selectedReport.name]} darkMode={darkMode} />

        <SectionTitle
          title={selectedReport.name}
          subtitle={`${selectedReport.project} • ${selectedReport.type} • ${selectedReport.date}`}
          darkMode={darkMode}
          action={
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => navigate("/history")}
                className={`px-5 py-3 rounded-xl border transition ${
                  darkMode
                    ? "border-gray-600 text-gray-100 hover:bg-gray-800"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                ← Back to History
              </button>
              <button
                onClick={() => {
                  fakeDownload(selectedReport.name);
                  addNotification("Export PDF", `${selectedReport.name} export was triggered.`);
                }}
                className="px-5 py-3 rounded-xl bg-[#355872] text-white hover:bg-[#7AAACE] transition"
              >
                Export PDF
              </button>
              <button
                onClick={() => {
                  fakeShare(selectedReport.name);
                  addNotification("Share report", `${selectedReport.name} was prepared for sharing.`);
                }}
                className={`px-5 py-3 rounded-xl border transition ${
                  darkMode
                    ? "border-gray-600 text-gray-100 hover:bg-gray-800"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                Share
              </button>
              <button
                onClick={() => copyToClipboard(reportUrl, "Link copied", "Report link copied to clipboard.")}
                className={`px-5 py-3 rounded-xl border transition ${
                  darkMode
                    ? "border-gray-600 text-gray-100 hover:bg-gray-800"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                Copy Link
              </button>
            </div>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className={`border rounded-2xl p-6 shadow-sm ${panelBg}`}>
            <p className={`text-sm mb-2 ${mutedText}`}>Sections</p>
            <h3 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {selectedReport.sections}
            </h3>
          </div>

          <div className={`border rounded-2xl p-6 shadow-sm ${panelBg}`}>
            <p className={`text-sm mb-2 ${mutedText}`}>Overall Score</p>
            <h3 className="text-3xl font-bold text-[#355872]">
              {selectedReport.score}%
            </h3>
          </div>

          <div className={`border rounded-2xl p-6 shadow-sm ${panelBg}`}>
            <p className={`text-sm mb-2 ${mutedText}`}>Report Type</p>
            <h3 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              {selectedReport.type}
            </h3>
          </div>
        </div>

        <div className={`border rounded-2xl p-6 shadow-sm mb-8 ${panelBg}`}>
          <h3 className={`text-xl font-bold mb-5 ${darkMode ? "text-white" : "text-gray-900"}`}>
            SWOT Analysis
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { label: "Strengths", value: selectedReport.swot.strengths },
              { label: "Weaknesses", value: selectedReport.swot.weaknesses },
              { label: "Opportunities", value: selectedReport.swot.opportunities },
              { label: "Threats", value: selectedReport.swot.threats },
            ].map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl border p-5 ${
                  darkMode ? "bg-[#0F172A] border-gray-700" : "bg-[#F7F8F0] border-gray-200"
                }`}
              >
                <p className={`text-sm mb-2 ${mutedText}`}>{item.label}</p>
                <p className={darkMode ? "text-gray-100" : "text-gray-800"}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`border rounded-2xl p-6 shadow-sm mb-8 ${panelBg}`}>
          <h3 className={`text-xl font-bold mb-5 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Recommendations
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedReport.recommendations?.map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl border p-5 ${
                  darkMode ? "bg-[#0F172A] border-gray-700 text-gray-100" : "bg-[#F7F8F0] border-gray-200 text-gray-800"
                }`}
              >
                <p className="font-medium mb-2">Recommendation {index + 1}</p>
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`border rounded-2xl p-6 shadow-sm ${panelBg}`}>
          <h3 className={`text-xl font-bold mb-5 ${darkMode ? "text-white" : "text-gray-900"}`}>
            KPI Overview
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ComparisonCard title="Revenue KPI" value={selectedReport.kpis.revenue} darkMode={darkMode} />
            <ComparisonCard title="Marketing KPI" value={selectedReport.kpis.marketing} darkMode={darkMode} />
            <ComparisonCard title="Retention KPI" value={selectedReport.kpis.retention} darkMode={darkMode} />
          </div>
        </div>
      </>
    );
  };



  const ComparisonPage = () => {
    const [first, second] = selectedReportObjects;

    if (!canCompare) {
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
          <Breadcrumbs items={["Dashboard", "Comparison"]} darkMode={darkMode} />

          <SectionTitle
            title="Comparison View"
            subtitle="Select exactly 2 reports from the same project first"
            darkMode={darkMode}
          />
          <div className={`border rounded-2xl p-10 text-center ${panelBg} ${mutedText}`}>
            No valid comparison selected yet.
          </div>
        </>
      );
    }

    const revenueWinner =
      first.kpis.revenue === second.kpis.revenue
        ? null
        : first.kpis.revenue > second.kpis.revenue
        ? first.id
        : second.id;

    const marketingWinner =
      first.kpis.marketing === second.kpis.marketing
        ? null
        : first.kpis.marketing > second.kpis.marketing
        ? first.id
        : second.id;

    const retentionWinner =
      first.kpis.retention === second.kpis.retention
        ? null
        : first.kpis.retention > second.kpis.retention
        ? first.id
        : second.id;

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
        <Breadcrumbs items={["Dashboard", "Comparison"]} darkMode={darkMode} />

        <SectionTitle
          title="Comparison View"
          subtitle={`${first.project} — Side by side report comparison`}
          darkMode={darkMode}
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {[first, second].map((report) => (
            <div
              key={report.id}
              className={`border rounded-2xl p-6 shadow-sm transition hover:-translate-y-1 ${panelBg}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {report.name}
                </h3>
                <span className="px-3 py-1 rounded-full bg-[#9CD5FF] text-[#355872] text-sm font-medium">
                  {report.type}
                </span>
              </div>

              <div className={`space-y-2 text-sm mb-5 ${mutedText}`}>
                <p>Date: {report.date}</p>
                <p>Sections: {report.sections}</p>
                <p>Overall Score: {report.score}%</p>
              </div>

              <div className={`space-y-3 text-sm ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                <p><span className="font-semibold">Strengths:</span> {report.swot.strengths}</p>
                <p><span className="font-semibold">Weaknesses:</span> {report.swot.weaknesses}</p>
                <p><span className="font-semibold">Opportunities:</span> {report.swot.opportunities}</p>
                <p><span className="font-semibold">Threats:</span> {report.swot.threats}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`border rounded-2xl p-6 shadow-sm mb-8 ${panelBg}`}>
          <h3 className={`text-xl font-bold mb-5 ${darkMode ? "text-white" : "text-gray-900"}`}>
            KPI Comparison
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
            <ComparisonCard title={`${first.name} Revenue KPI`} value={first.kpis.revenue} darkMode={darkMode} highlight={revenueWinner === first.id} />
            <ComparisonCard title={`${second.name} Revenue KPI`} value={second.kpis.revenue} darkMode={darkMode} highlight={revenueWinner === second.id} />
            <ComparisonCard title={`${first.name} Marketing KPI`} value={first.kpis.marketing} darkMode={darkMode} highlight={marketingWinner === first.id} />
            <ComparisonCard title={`${second.name} Marketing KPI`} value={second.kpis.marketing} darkMode={darkMode} highlight={marketingWinner === second.id} />
            <ComparisonCard title={`${first.name} Retention KPI`} value={first.kpis.retention} darkMode={darkMode} highlight={retentionWinner === first.id} />
            <ComparisonCard title={`${second.name} Retention KPI`} value={second.kpis.retention} darkMode={darkMode} highlight={retentionWinner === second.id} />
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 text-sm ${mutedText}`}>
            <div className={`rounded-2xl p-4 ${darkMode ? "bg-[#0F172A]" : "bg-[#F7F8F0]"}`}>
              Revenue difference:{" "}
              <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {Math.abs(first.kpis.revenue - second.kpis.revenue)}%
              </span>
            </div>
            <div className={`rounded-2xl p-4 ${darkMode ? "bg-[#0F172A]" : "bg-[#F7F8F0]"}`}>
              Marketing difference:{" "}
              <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {Math.abs(first.kpis.marketing - second.kpis.marketing)}%
              </span>
            </div>
            <div className={`rounded-2xl p-4 ${darkMode ? "bg-[#0F172A]" : "bg-[#F7F8F0]"}`}>
              Retention difference:{" "}
              <span className={`font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                {Math.abs(first.kpis.retention - second.kpis.retention)}%
              </span>
            </div>
          </div>
        </div>
      </>
    );
  };




  return (
    <div className={`min-h-screen ${pageBg} ${pageText} transition-colors duration-300`}>
      <Toast toast={toast} onClose={() => setToast(null)} darkMode={darkMode} />

     <DashboardLayout
  darkMode={darkMode}
  mutedText={mutedText}
  showProfileMenu={showProfileMenu}
  setShowProfileMenu={setShowProfileMenu}
  setShowToast={setToast}
  navigate={navigate}
  NavButton={NavButton}
>
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />

    <Route
  path="/dashboard"
  element={
    <DashboardPage
      darkMode={darkMode}
      showNotifications={showNotifications}
      setShowNotifications={setShowNotifications}
      unreadNotifications={unreadNotifications}
      notifications={notifications}
      mutedText={mutedText}
      markAllNotificationsRead={markAllNotificationsRead}
      navigate={navigate}
      stats={stats}
      panelBg={panelBg}
      topProject={topProject}
      weakestReport={weakestReport}
      totalActiveProjects={totalActiveProjects}
      dashboardChartData={dashboardChartData}
      reportTypeChart={reportTypeChart}
      recentlyViewed={recentlyViewed}
      reports={reports}
      setSelectedReport={setSelectedReport}
      addRecentItem={addRecentItem}
      activities={activities}
    />
  }
/>

    <Route
      path="/projects"
      element={
        <ProjectsPage
          showProjectForm={showProjectForm}
          setShowProjectForm={setShowProjectForm}
          projectSearch={projectSearch}
          setProjectSearch={setProjectSearch}
          newProject={newProject}
          setNewProject={setNewProject}
          projects={projects}
          setProjects={setProjects}
          filteredProjects={filteredProjects}
          setSelectedProject={setSelectedProject}
          navigate={navigate}
          editingProject={editingProject}
          setEditingProject={setEditingProject}
          showDeleteConfirm={showDeleteConfirm}
          setShowDeleteConfirm={setShowDeleteConfirm}
          projectToDelete={projectToDelete}
          setProjectToDelete={setProjectToDelete}
          darkMode={darkMode}
          projectSort={projectSort}
          setProjectSort={setProjectSort}
          clearProjectFilters={clearProjectFilters}
          showToast={showToast}
          favoriteProjects={favoriteProjects}
          setFavoriteProjects={setFavoriteProjects}
          isLoading={isLoading}
          addRecentItem={addRecentItem}
          addNotification={addNotification}
        />
      }
    />

    <Route path="/project-details" element={<ProjectDetailsPage />} />
    <Route path="/report-details" element={<ReportDetailsPage />} />
    <Route
  path="/history"
  element={
    <ReportHistoryPage
      darkMode={darkMode}
      showNotifications={showNotifications}
      setShowNotifications={setShowNotifications}
      unreadNotifications={unreadNotifications}
      notifications={notifications}
      mutedText={mutedText}
      markAllNotificationsRead={markAllNotificationsRead}
      panelBg={panelBg}
      reports={reports}
      projects={projects}
      reportSearch={reportSearch}
      setReportSearch={setReportSearch}
      reportSort={reportSort}
      setReportSort={setReportSort}
      projectFilter={projectFilter}
      setProjectFilter={setProjectFilter}
      typeFilter={typeFilter}
      setTypeFilter={setTypeFilter}
      dateFilter={dateFilter}
      setDateFilter={setDateFilter}
      sortedFilteredReports={sortedFilteredReports}
      clearReportFilters={clearReportFilters}
      selectedReports={selectedReports}
      toggleReportSelection={toggleReportSelection}
      canCompare={canCompare}
      addNotification={addNotification}
      navigate={navigate}
      setSelectedReport={setSelectedReport}
      addRecentItem={addRecentItem}
      getReportStatus={getReportStatus}
    />
  }
/>
    <Route path="/comparison" element={<ComparisonPage />} />

    <Route
      path="/billing"
      element={
        <BillingPage
          TopActionBar={TopActionBar}
          darkMode={darkMode}
          panelBg={panelBg}
          mutedText={mutedText}
          addNotification={addNotification}
        />
      }
    />

    <Route
      path="/settings"
      element={
        <SettingsPage
          TopActionBar={TopActionBar}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          panelBg={panelBg}
          mutedText={mutedText}
          showToast={showToast}
          addNotification={addNotification}
          fakeDownload={fakeDownload}
        />
      }
    />
  </Routes>
</DashboardLayout>
    </div>
  );
}

export default App;