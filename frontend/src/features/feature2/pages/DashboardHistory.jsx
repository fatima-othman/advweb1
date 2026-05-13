import { useEffect, useMemo, useState } from 'react';
import EmptyState from '../../../components/EmptyState';
import InlineAlert from '../../../components/InlineAlert';
import LoadingSpinner from '../../../components/LoadingSpinner';
import PageMotion from '../../../components/PageMotion';
import { getTransactions } from '../services/feature2Service';
import '../styles/credits.css';

const formatDate = (value) => {
  if (!value) {
    return '-';
  }

  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatAmount = (value) => {
  const numberValue = Number(value || 0);
  return `$${numberValue.toFixed(2)}`;
};

const formatCredits = (value) => {
  const numberValue = Number(value || 0);
  if (numberValue > 0) {
    return `+${numberValue}`;
  }
  return String(numberValue);
};

const formatStatus = (value) => {
  if (!value) {
    return 'Unknown';
  }
  return String(value).replaceAll('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

const DashboardHistory = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadHistory = async () => {
      setLoading(true);
      setError('');

      try {
        const allTransactions = await getTransactions();
        if (isMounted) {
          setTransactions(allTransactions);
        }
      } catch (apiError) {
        if (isMounted) {
          setError(apiError?.message || 'Failed to load transaction history.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadHistory();

    return () => {
      isMounted = false;
    };
  }, []);

  const { payments, activity } = useMemo(() => {
    const paymentRows = transactions.filter((row) => Number(row.amount || 0) > 0 && Number(row.credits || 0) > 0);
    return {
      payments: paymentRows,
      activity: transactions,
    };
  }, [transactions]);

  return (
    <PageMotion>
      <main className="page-section credits-page">
        <div className="container credits-container">
          <section className="credits-section-head">
            <h2>Transaction History</h2>
            <p>View your complete payment and credit usage history</p>
          </section>

          <InlineAlert type="error" message={error} />

          {loading ? (
            <section className="card" style={{ padding: '1rem 1.3rem' }}>
              <LoadingSpinner label="Loading transaction history" />
            </section>
          ) : payments.length === 0 ? (
            <EmptyState
              title="No payment history yet"
              description="Your completed package purchases will show here once billing is connected."
            />
          ) : (
            <section className="card credits-table-card">
              <h3>Payment History</h3>
              <table className="credits-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Package</th>
                    <th>Amount</th>
                    <th>Credits</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((row) => (
                    <tr key={row.id}>
                      <td>{formatDate(row.created_at)}</td>
                      <td>{row.credit_package?.name || row.description || 'Credit Package'}</td>
                      <td>{formatAmount(row.amount)}</td>
                      <td>{formatCredits(row.credits)}</td>
                      <td><span className="status-pill">{formatStatus(row.status)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {loading ? null : activity.length === 0 ? (
            <EmptyState
              title="No credit usage yet"
              description="Generate your first strategy to start tracking credit deductions."
            />
          ) : (
            <section className="card credits-table-card">
              <h3>Credit Activity</h3>
              <table className="credits-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Action</th>
                    <th>Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {activity.map((row) => (
                    <tr key={`activity-${row.id}`}>
                      <td>{formatDate(row.created_at)}</td>
                      <td>{row.description || row.type || 'Transaction'}</td>
                      <td className="credits-col-right">{formatCredits(row.credits)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </div>
      </main>
    </PageMotion>
  );
};

export default DashboardHistory;

