import { Link } from 'react-router-dom';
import './Header.css';

function Header({ isLoggedIn, onLogout }) {
    return (
        <header>
            <h1>Online Bookstore</h1>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
                {isLoggedIn ? (
                    <button onClick={onLogout}>
                        Logout
                    </button>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </nav>
        </header>
    );
}

export default Header;
