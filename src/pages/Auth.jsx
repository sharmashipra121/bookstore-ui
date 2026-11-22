import { Link, useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import './Auth.css';

function Auth({ onLoginSuccess }) {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-tabs">
          <Link
            to="/login"
            className={isLogin ? 'active' : ''}
          >
            Login
          </Link>

          <Link
            to="/register"
            className={!isLogin ? 'active' : ''}
          >
            Register
          </Link>
        </div>

        {isLogin
            ? <Login onLoginSuccess={onLoginSuccess} />
            : <Register />
        }

      </div>
    </div>
  );
}

export default Auth;
