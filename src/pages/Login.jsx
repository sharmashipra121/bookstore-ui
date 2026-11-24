import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import { loginUser, setAuthCredentials } from '../services/AuthService';

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || '/';

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(current => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    try {
      setError('');
      setSuccess('');
      setLoading(true);

      const response = await loginUser({
        email: formData.email,
        password: formData.password
      });

      setAuthCredentials(formData.email, formData.password);
      setSuccess(response.message || 'Login Successful');
      onLoginSuccess();
      navigate(redirectTo, { replace: true });

    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h2>Login Here</h2>
        <p>Please login to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error">{error}</p>}

          {success && <p className="success">{success}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;
