import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <main className="page-section">
      <div className="container">
        <h1>Dashboard</h1>
        <p>Welcome back, {user?.name || 'User'}.</p>
      </div>
    </main>
  );
};

export default Dashboard;
