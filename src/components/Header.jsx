import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header>
            <h1>Online Bookstore</h1>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/login">Login</Link>
            </nav>
        </header>
    );
}

export default Header;
