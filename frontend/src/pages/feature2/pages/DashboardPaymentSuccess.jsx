import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import InlineAlert from '../../../components/InlineAlert';
import LoadingSpinner from '../../../components/LoadingSpinner';
import PageMotion from '../../../components/PageMotion';
import { ROUTES } from '../../../config/routes';
import { confirmCheckoutSession } from '../services/feature2Service';
import '../styles/credits.css';

const DashboardPaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const confirmPayment = async () => {
      setLoading(true);
      setError('');

      try {
        const sessionId = searchParams.get('session_id');
        if (!sessionId) {
          throw new Error('Missing Stripe session id.');
        }

        await confirmCheckoutSession({ session_id: sessionId });
        if (isMounted) {
          setConfirmed(true);
        }
      } catch (apiError) {
        if (isMounted) {
          setError(apiError?.message || 'Could not confirm payment.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    confirmPayment();

    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  return (
    <PageMotion>
      <main className="page-section credits-page">
        <div className="container credits-container">
          <section className="card included-card" style={{ textAlign: 'center' }}>
            <h2>{loading ? 'Confirming Payment...' : 'Payment Confirmed'}</h2>
            {loading ? <LoadingSpinner label="Confirming payment" /> : null}
            <InlineAlert type="error" message={error} />
            {confirmed && !error ? <p>Your purchase is confirmed and credits were added to your account.</p> : null}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
              <Link to={ROUTES.dashboardCredits} className="btn-primary">Go to Credits</Link>
              <Link to={ROUTES.dashboardHistory} className="btn-secondary">View Payment History</Link>
            </div>
          </section>
        </div>
      </main>
    </PageMotion>
  );
};

export default DashboardPaymentSuccess;
