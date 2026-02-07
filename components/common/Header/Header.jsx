import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart, FaBell, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/marketplace', label: 'Маркетплейс' },
    { path: '/rules', label: 'Правила' },
    { path: '/tutorial', label: 'Обучение' },
    { path: '/support', label: 'Поддержка' },
  ];

  if (user?.role === 'seller') {
    navItems.push({ path: '/seller', label: 'Панель продавца' });
  }

  if (user?.role === 'admin') {
    navItems.push({ path: '/admin', label: 'Админ' });
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="container">
          <div className="header-inner">
            {/* Логотип */}
            <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
              <div className="logo-mark">
                <div className="logo-dot"></div>
                <div className="logo-dot"></div>
                <div className="logo-dot"></div>
              </div>
              <span className="logo-text">OFFER</span>
              <div className="logo-glow"></div>
            </Link>

            {/* Навигация */}
            <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
              <div className="nav-search">
                <form onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Поиск товаров..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" className="search-btn">
                    <FaSearch />
                  </button>
                </form>
              </div>

              <div className="nav-links">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="nav-link-text">{item.label}</span>
                    <span className="nav-link-indicator"></span>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Действия пользователя */}
            <div className="header-actions">
              <button className="icon-btn search-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <FaSearch />
              </button>

              <Link to="/marketplace?cart" className="icon-btn cart-btn">
                <FaShoppingCart />
                <span className="cart-badge">3</span>
              </Link>

              <button className="icon-btn notification-btn">
                <FaBell />
                <span className="notification-dot"></span>
              </button>

              {isAuthenticated ? (
                <div className="user-dropdown">
                  <button className="user-btn">
                    <FaUser />
                    <span className="user-name">{user.username}</span>
                  </button>
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item">Профиль</Link>
                    <Link to="/profile/balance" className="dropdown-item">Баланс</Link>
                    <Link to="/profile/settings" className="dropdown-item">Настройки</Link>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout" onClick={logout}>
                      Выйти
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/auth?tab=login" className="auth-btn">
                  <FaUser />
                  <span>Войти</span>
                </Link>
              )}

              <button 
                className="menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Меню"
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay для мобильного меню */}
      {isMenuOpen && (
        <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />
      )}
    </>
  );
};

export default Header;