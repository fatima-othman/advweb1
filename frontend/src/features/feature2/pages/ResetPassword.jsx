import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { submitPasswordReset } from '../services/feature2Service';
import '../styles/feature2.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get('token') || '', [searchParams]);
  const emailFromQuery = useMemo(() => searchParams.get('email') || '', [searchParams]);

  const [formData, setFormData] = useState({
    email: emailFromQuery,
    token,
    password: '',
    password_confirmation: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!formData.token || !formData.email) {
      setError('Token and email are required in the reset link.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (formData.password !== formData.password_confirmation) {
      setError('Password confirmation does not match.');
      return;
    }

    setLoading(true);
    try {
      await submitPasswordReset(formData);
      setMessage('Password reset successfully. You can now login with your new password.');
      setFormData((prev) => ({ ...prev, password: '', password_confirmation: '' }));
    } catch (err) {
      setError(err.message || 'Could not reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-section auth-page">
      <div className="container auth-container">
        <section className="card auth-card" aria-labelledby="reset-heading">
          <h1 id="reset-heading">Reset Password</h1>
          <p className="auth-subtitle">Set a new secure password for your account.</p>
          {error ? <p className="form-alert">{error}</p> : null}
          {message ? <p className="feature2-success">{message}</p> : null}
          <form onSubmit={handleSubmit} noValidate>
            <label className="form-label" htmlFor="reset-email">Email</label>
            <input id="reset-email" name="email" className="input" value={formData.email} onChange={handleChange} />

            <label className="form-label" htmlFor="reset-password">New Password</label>
            <input
              id="reset-password"
              name="password"
              type="password"
              className="input"
              value={formData.password}
              onChange={handleChange}
            />

            <label className="form-label" htmlFor="reset-confirm">Confirm Password</label>
            <input
              id="reset-confirm"
              name="password_confirmation"
              type="password"
              className="input"
              value={formData.password_confirmation}
              onChange={handleChange}
            />

            <button type="submit" className="btn-primary auth-btn" disabled={loading}>
              {loading ? 'Updating...' : 'Reset Password'}
            </button>
          </form>
          <p className="auth-footnote"><Link to={ROUTES.login}>Back to login</Link></p>
        </section>
      </div>
    </main>
  );
};

export default ResetPassword;
