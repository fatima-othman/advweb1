import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import ComparisonCard from '../components/ComparisonCard';
import SectionTitle from '../components/SectionTitle';
import StatusBadge from '../components/StatusBadge';
import Toast from '../components/Toast';
import TopActionBar from '../components/TopActionBar';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../services/api';
import DashboardLayout from '../layouts/DashboardLayout';
import BillingPage from './Feature 5/BillingPage';
import DashboardPage from './Feature 5/DashboardPage';
import ReportHistoryPage from './Feature 5/ReportHistoryPage';
import SettingsPage from './Feature 5/SettingsPage';
import { initialProjects } from '../data/projects';
import fallbackReports from '../data/reports';

const toFeature5Path = (path) => {
  if (!path || path === '/') return '/feature5/dashboard';
  if (path.startsWith('/feature5')) return path;
  return `/feature5${path}`;
};

const normalizeProject = (project) => ({
  ...project,
  type: project.type || project.business_type || 'Business',
  country: project.country || project.market || 'Local market',
  reports: project.reports ?? project.reports_count ?? 0,
  lastDate: project.lastDate || project.updated_at?.slice(0, 10) || project.created_at?.slice(0, 10) || 'No date',
});

const normalizeReport = (report) => {
  const project = report.project || {};
  const sections = Array.isArray(report.selected_sections)
    ? report.selected_sections
    : Object.keys(report.sections || {});

  return {
    ...report,
    name: report.name || report.title || `${project.name || 'Strategy'} Report`,
    projectId: report.projectId || report.project_id,
    project: report.project || project.name || 'Project',
    type: report.type || sections[0] || 'Strategy',
    date: report.date || report.created_at?.slice(0, 10) || 'No date',
    sections: report.sections_count || sections.length || 1,
    score: report.score || 89,
    swot: report.swot || {
      strengths: 'Strong business direction',
      weaknesses: 'Needs more detailed validation',
      opportunities: 'Room for growth in the target market',
      threats: 'Competitive pressure',
    },
    kpis: report.kpis || { revenue: 82, marketing: 88, retention: 79 },
    recommendations: report.recommendations || ['Review market fit', 'Improve acquisition channels', 'Track weekly KPIs'],
  };
};

function Feature5Root() {
  const { user } = useAuth();
  const location = useLocation();
  const navigateBase = useNavigate();
  const navigate = (path, options) => navigateBase(toFeature5Path(path), options);

  const [selectedReports, setSelectedReports] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectFilter, setProjectFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectSearch, setProjectSearch] = useState('');
  const [reportSearch, setReportSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projectSort, setProjectSort] = useState('name-asc');
  const [reportSort, setReportSort] = useState('date-desc');
  const [toast, setToast] = useState(null);
  const [favoriteProjects, setFavoriteProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [projects, setProjects] = useState(initialProjects.map(normalizeProject));
  const [reports, setReports] = useState(fallbackReports.map(normalizeReport));
  const [newProject, setNewProject] = useState({ name: '', type: '', country: '' });
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Report generated', message: 'Q1 Growth Strategy was generated.', time: '2 min ago', isRead: false },
    { id: 2, title: 'Project updated', message: 'Project details were updated.', time: '10 min ago', isRead: false },
  ]);

  useEffect(() => {
    const load = async () => {
      try {
        const [projectResponse, reportResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/projects`),
          fetch(`${API_BASE_URL}/reports`),
        ]);

        if (projectResponse.ok) {
          const data = await projectResponse.json();
          setProjects(data.map(normalizeProject));
        }

        if (reportResponse.ok) {
          const data = await reportResponse.json();
          setReports(data.map(normalizeReport));
        }
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const showToast = (type, title, message = '') => {
    setToast({ type, title, message });
    setTimeout(() => setToast(null), 2500);
  };

  const addNotification = (title, message) => {
    setNotifications((prev) => [
      { id: Date.now(), title, message, time: 'Just now', isRead: false },
      ...prev,
    ]);
  };

  const addRecentItem = (item) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((entry) => !(entry.type === item.type && entry.title === item.title));
      return [item, ...filtered].slice(0, 5);
    });
  };

  const unreadNotifications = notifications.filter((item) => !item.isRead).length;
  const markAllNotificationsRead = () => setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
  const selectedReportObjects = reports.filter((report) => selectedReports.includes(report.id));
  const canCompare = selectedReportObjects.length === 2 && selectedReportObjects[0].projectId === selectedReportObjects[1].projectId;

  const topProject = useMemo(() => projects[0], [projects]);
  const weakestReport = useMemo(() => [...reports].sort((a, b) => a.score - b.score)[0], [reports]);
  const totalActiveProjects = projects.filter((project) => project.reports > 0).length;

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((project) => project.name.toLowerCase().includes(projectSearch.toLowerCase()));
    return [...filtered].sort((a, b) => (projectSort === 'name-desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)));
  }, [projects, projectSearch, projectSort]);

  const clearProjectFilters = () => {
    setProjectSearch('');
    setProjectSort('name-asc');
  };

  const clearReportFilters = () => {
    setReportSearch('');
    setProjectFilter('all');
    setTypeFilter('all');
    setDateFilter('');
    setReportSort('date-desc');
  };

  const toggleReportSelection = (reportId, projectId) => {
    setSelectedReports((prev) => {
      if (prev.includes(reportId)) return prev.filter((id) => id !== reportId);
      if (prev.length === 0) return [reportId];
      const firstReport = reports.find((report) => report.id === prev[0]);
      if (prev.length === 1 && firstReport?.projectId === projectId) return [...prev, reportId];
      showToast('error', 'Invalid comparison', 'You can compare only 2 reports from the same project.');
      return prev;
    });
  };

  const getReportStatus = (score) => {
    if (score >= 90) return { label: 'Excellent', variant: 'default' };
    if (score >= 80) return { label: 'Good', variant: 'warning' };
    return { label: 'Needs Review', variant: 'danger' };
  };

  const panelBg = darkMode ? 'bg-[#111827] border-gray-700' : 'bg-white border-gray-200';
  const mutedText = darkMode ? 'text-gray-300' : 'text-gray-500';
  const pageBg = darkMode ? 'bg-[#0B1220]' : 'bg-[#F7F8F0]';
  const pageText = darkMode ? 'text-gray-100' : 'text-gray-800';

  const NavButton = ({ to, label }) => {
    const target = toFeature5Path(to);
    const isActive = location.pathname === target;

    return (
      <Link
        to={target}
        className={`block w-full rounded-xl px-4 py-3 text-left transition ${
          isActive ? 'bg-[#9CD5FF] text-[#355872] font-semibold' : darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        {label}
      </Link>
    );
  };

  const ProjectDetailsPage = () => (
    <>
      <Breadcrumbs items={['Dashboard', 'Projects', selectedProject?.name || 'Project']} darkMode={darkMode} />
      <SectionTitle title={selectedProject?.name || 'Project Details'} subtitle="Reports under this project" darkMode={darkMode} />
      <div className={`border rounded-2xl p-6 shadow-sm ${panelBg}`}>
        {(reports.filter((report) => report.projectId === selectedProject?.id)).map((report) => (
          <button
            key={report.id}
            onClick={() => {
              setSelectedReport(report);
              navigate('/report-details');
            }}
            className="w-full text-left border-b last:border-b-0 py-4"
          >
            <span className="font-semibold">{report.name}</span>
            <span className={`ml-3 ${mutedText}`}>{report.score}%</span>
          </button>
        ))}
      </div>
    </>
  );

  const ReportDetailsPage = () => {
    if (!selectedReport) return <div className={`border rounded-2xl p-10 text-center ${panelBg} ${mutedText}`}>No report selected yet.</div>;

    return (
      <>
        <Breadcrumbs items={['Dashboard', 'Report History', selectedReport.name]} darkMode={darkMode} />
        <SectionTitle title={selectedReport.name} subtitle={`${selectedReport.project?.name || selectedReport.project} • ${selectedReport.date}`} darkMode={darkMode} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <ComparisonCard title="Revenue KPI" value={selectedReport.kpis.revenue} darkMode={darkMode} />
          <ComparisonCard title="Marketing KPI" value={selectedReport.kpis.marketing} darkMode={darkMode} />
          <ComparisonCard title="Retention KPI" value={selectedReport.kpis.retention} darkMode={darkMode} />
        </div>
      </>
    );
  };

  const ComparisonPage = () => (
    <>
      <Breadcrumbs items={['Dashboard', 'Comparison']} darkMode={darkMode} />
      <SectionTitle title="Comparison View" subtitle="Select exactly two reports from the same project" darkMode={darkMode} />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {selectedReportObjects.map((report) => (
          <div key={report.id} className={`border rounded-2xl p-6 shadow-sm ${panelBg}`}>
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{report.name}</h3>
            <StatusBadge label={getReportStatus(report.score).label} darkMode={darkMode} variant={getReportStatus(report.score).variant} />
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className={`min-h-screen ${pageBg} ${pageText} transition-colors duration-300`}>
      <Toast toast={toast} onClose={() => setToast(null)} darkMode={darkMode} />
      <DashboardLayout darkMode={darkMode} mutedText={mutedText} showProfileMenu={showProfileMenu} setShowProfileMenu={setShowProfileMenu} setShowToast={setToast} navigate={navigate} NavButton={NavButton}>
        <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage userName={user?.name || user?.email || 'there'} darkMode={darkMode} showNotifications={showNotifications} setShowNotifications={setShowNotifications} unreadNotifications={unreadNotifications} notifications={notifications} mutedText={mutedText} markAllNotificationsRead={markAllNotificationsRead} navigate={navigate} stats={[{ title: 'CREDIT BALANCE', value: '45', sub: 'Bonus Active', icon: 'CR', subColor: 'text-green-600' }, { title: 'TOTAL REPORTS', value: reports.length, sub: '+3 this week', icon: 'RP', subColor: 'text-green-600' }, { title: 'AVERAGE SCORE', value: '89%', sub: '+5% vs last month', icon: 'SC', subColor: 'text-green-600' }, { title: 'TOTAL DOWNLOADS', value: '28', sub: 'PDF exports', icon: 'DL', subColor: 'text-gray-500' }]} panelBg={panelBg} topProject={topProject} weakestReport={weakestReport} totalActiveProjects={totalActiveProjects} dashboardChartData={[{ label: 'Jan', value: 68 }, { label: 'Feb', value: 74 }, { label: 'Mar', value: 81 }, { label: 'Apr', value: 89 }]} reportTypeChart={[{ label: 'Growth', value: 89 }, { label: 'Pricing', value: 84 }, { label: 'Marketing', value: 91 }]} recentlyViewed={recentlyViewed} reports={reports} setSelectedReport={setSelectedReport} addRecentItem={addRecentItem} activities={[]} />} />
          <Route path="projects" element={<Navigate to="/dashboard/projects" replace />} />
          <Route path="project-details" element={<ProjectDetailsPage />} />
          <Route path="report-details" element={<ReportDetailsPage />} />
          <Route path="history" element={<ReportHistoryPage darkMode={darkMode} showNotifications={showNotifications} setShowNotifications={setShowNotifications} unreadNotifications={unreadNotifications} notifications={notifications} mutedText={mutedText} markAllNotificationsRead={markAllNotificationsRead} panelBg={panelBg} projects={projects} reportSearch={reportSearch} setReportSearch={setReportSearch} reportSort={reportSort} setReportSort={setReportSort} projectFilter={projectFilter} setProjectFilter={setProjectFilter} typeFilter={typeFilter} setTypeFilter={setTypeFilter} dateFilter={dateFilter} setDateFilter={setDateFilter} clearReportFilters={clearReportFilters} selectedReports={selectedReports} toggleReportSelection={toggleReportSelection} canCompare={canCompare} addNotification={addNotification} navigate={navigate} setSelectedReport={setSelectedReport} addRecentItem={addRecentItem} getReportStatus={getReportStatus} />} />
          <Route path="comparison" element={<ComparisonPage />} />
          <Route path="billing" element={<BillingPage TopActionBar={TopActionBar} darkMode={darkMode} panelBg={panelBg} mutedText={mutedText} addNotification={addNotification} />} />
          <Route path="settings" element={<SettingsPage TopActionBar={TopActionBar} darkMode={darkMode} setDarkMode={setDarkMode} panelBg={panelBg} mutedText={mutedText} showToast={showToast} addNotification={addNotification} fakeDownload={(title) => showToast('success', 'Export started', `${title} export is ready.`)} />} />
        </Routes>
      </DashboardLayout>
    </div>
  );
}

export default Feature5Root;
