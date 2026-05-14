import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DashboardSkeleton from '../../../components/DashboardSkeleton';
import EmptyState from '../../../components/EmptyState';
import PageMotion from '../../../components/PageMotion';
import { ROUTES } from '../../../config/routes';
import { useAuth } from '../../../context/AuthContext';
import '../styles/dashboard.css';

const MotionArticle = motion.article;
const MotionSection = motion.section;
const MotionDiv = motion.div;

const metrics = [
  { icon: 'DOC', value: '12', label: 'Generated Reports', note: '+3 this week' },
  { icon: 'CR', value: '45', label: 'Credits Remaining', note: 'out of 50' },
  { icon: 'SC', value: '89%', label: 'Average Score', note: '+5% vs last month' },
  { icon: 'DL', value: '28', label: 'Total Downloads', note: 'PDF exports' },
];

const reports = [
  {
    title: 'E-Commerce Growth Strategy',
    meta: '2026-04-10  •  Completed',
    score: '92%',
  },
  {
    title: 'Market Expansion Analysis',
    meta: '2026-04-08  •  Completed',
    score: '87%',
  },
  {
    title: 'Product Launch Strategy',
    meta: '2026-04-11  •  In Progress',
    score: null,
  },
];

const activityRows = [
  { label: 'This week', value: '3 reports generated' },
  { label: 'This month', value: '12 reports generated' },
  { label: 'All time', value: '47 reports generated' },
];

const Dashboard = () => {
  const { loading, user } = useAuth();

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <PageMotion>
      <main className="page-section dashboard-page">
        <div className="container">
          <section className="dashboard-headline">
            <h1>Welcome back, {user?.name?.split(' ')[0] || 'Demo'}</h1>
            <p>Your AI strategy dashboard</p>
          </section>

          <section className="dashboard-metrics">
            {metrics.map((item, index) => (
              <MotionArticle
                key={item.label}
                className="card metric-card"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                whileHover={{ y: -4 }}
              >
                <span className="metric-icon">{item.icon}</span>
                <p className="metric-value">{item.value}</p>
                <h2>{item.label}</h2>
                <span>{item.note}</span>
              </MotionArticle>
            ))}
          </section>

          <MotionSection className="dashboard-generate-banner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            <div>
              <h2>Generate New Strategy</h2>
              <p>Create a comprehensive business strategy report in minutes</p>
            </div>
            <MotionDiv whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Link to={ROUTES.dashboardCredits} className="btn-secondary banner-btn">
                + New Report
              </Link>
            </MotionDiv>
          </MotionSection>

          <section className="dashboard-reports">
            <div className="reports-head">
              <h2>Recent Reports</h2>
              <Link to={ROUTES.dashboardHistory}>View all</Link>
            </div>

            {reports.length === 0 ? (
              <EmptyState
                title="No reports yet"
                description="You have not generated any strategies yet. Start your first report to see results here."
                actionLabel="Create report"
                actionTo={ROUTES.dashboardCredits}
              />
            ) : (
              <div className="report-list">
                {reports.map((report, index) => (
                  <MotionArticle
                    key={report.title}
                    className="card report-item"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: 0.08 + index * 0.04 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="report-main">
                      <h3>{report.title}</h3>
                      <p>{report.meta}</p>
                    </div>

                    <div className="report-score">
                      {report.score ? (
                        <>
                          <strong>{report.score}</strong>
                          <small>Strategy Score</small>
                        </>
                      ) : (
                        <>
                          <span>--</span>
                          <small>In Progress</small>
                        </>
                      )}
                    </div>

                    <button type="button" className="report-open report-open-disabled" disabled>
                      Open
                    </button>
                  </MotionArticle>
                ))}
              </div>
            )}
          </section>

          <section className="card dashboard-activity">
            <h2>Activity Overview</h2>
            <div className="activity-list">
              {activityRows.map((row) => (
                <div key={row.label} className="activity-row">
                  <span>{row.label}</span>
                  <strong>{row.value}</strong>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </PageMotion>
  );
};

export default Dashboard;

