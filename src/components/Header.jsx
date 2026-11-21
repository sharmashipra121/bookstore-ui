import './Header.css';

function Header() {
    return (
        <header>
            <h1>Online Bookstore</h1>

            <nav>
                <a href="/">Home</a>
                <a href="/cart">Cart</a>
                <a href="/login">Login</a>
            </nav>
        </header>
    );
}

export default Header;
