import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaStore, 
  FaUser, 
  FaShieldAlt, 
  FaQuestionCircle, 
  FaCog,
  FaChevronLeft,
  FaChevronRight,
  FaChartLine,
  FaBox,
  FaMoneyBill,
  FaUsers,
  FaTicketAlt,
  FaBook,
  FaGraduationCap,
  FaShoppingCart
} from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ collapsed = false, onToggle }) => {
  const location = useLocation();
  const { user, isSeller, isAdmin } = useAuth();
  const [activeItem, setActiveItem] = useState(location.pathname);

  // Основные ссылки для всех пользователей
  const mainLinks = [
    { path: '/', label: 'Главная', icon: <FaHome /> },
    { path: '/marketplace', label: 'Маркетплейс', icon: <FaStore /> },
    { path: '/profile', label: 'Профиль', icon: <FaUser /> },
    { path: '/support', label: 'Поддержка', icon: <FaQuestionCircle /> },
    { path: '/rules', label: 'Правила', icon: <FaBook /> },
    { path: '/tutorial', label: 'Обучение', icon: <FaGraduationCap /> },
  ];

  // Ссылки для продавцов
  const sellerLinks = [
    { path: '/seller', label: 'Панель продавца', icon: <FaChartLine /> },
    { path: '/seller/products', label: 'Мои товары', icon: <FaBox /> },
    { path: '/seller/orders', label: 'Заказы', icon: <FaShoppingCart /> },
    { path: '/seller/finance', label: 'Финансы', icon: <FaMoneyBill /> },
    { path: '/seller/reviews', label: 'Отзывы', icon: <FaUsers /> },
  ];

  // Ссылки для администраторов
  const adminLinks = [
    { path: '/admin', label: 'Панель админа', icon: <FaShieldAlt /> },
    { path: '/admin/users', label: 'Пользователи', icon: <FaUsers /> },
    { path: '/admin/products', label: 'Товары', icon: <FaBox /> },
    { path: '/admin/orders', label: 'Заказы', icon: <FaShoppingCart /> },
    { path: '/admin/disputes', label: 'Споры', icon: <FaTicketAlt /> },
    { path: '/admin/settings', label: 'Настройки', icon: <FaCog /> },
  ];

  const handleItemClick = (path) => {
    setActiveItem(path);
  };

  const renderLinks = (links, title = null) => (
    <>
      {title && !collapsed && (
        <div className="sidebar-section-title">
          {title}
        </div>
      )}
      {links.map((link) => {
        const isActive = activeItem === link.path || 
                        (link.path !== '/' && activeItem.startsWith(link.path));
        
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`sidebar-item ${isActive ? 'active' : ''}`}
            onClick={() => handleItemClick(link.path)}
            title={collapsed ? link.label : undefined}
          >
            <div className="sidebar-icon">
              {link.icon}
            </div>
            {!collapsed && (
              <span className="sidebar-label">{link.label}</span>
            )}
            {isActive && !collapsed && (
              <div className="active-indicator"></div>
            )}
          </Link>
        );
      })}
    </>
  );

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Кнопка сворачивания */}
      <button 
        className="sidebar-toggle"
        onClick={onToggle}
        title={collapsed ? 'Развернуть' : 'Свернуть'}
      >
        {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      {/* Профиль пользователя */}
      <div className="sidebar-profile">
        <div className="profile-avatar">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.username} />
          ) : (
            <div className="avatar-placeholder">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
        </div>
        
        {!collapsed && user && (
          <div className="profile-info">
            <div className="profile-name">{user.username}</div>
            <div className="profile-role">
              <span className={`role-badge role-${user.role}`}>
                {user.role === 'admin' ? 'Администратор' : 
                 user.role === 'seller' ? 'Продавец' : 'Пользователь'}
              </span>
            </div>
            {user.balance !== undefined && (
              <div className="profile-balance">
                Баланс: <strong>{user.balance.toLocaleString()} ₽</strong>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Основная навигация */}
      <nav className="sidebar-nav">
        {renderLinks(mainLinks)}
        
        {/* Разделитель */}
        {!collapsed && (isSeller || isAdmin) && (
          <div className="sidebar-divider"></div>
        )}

        {/* Для продавцов */}
        {isSeller && renderLinks(sellerLinks, 'Продавец')}
        
        {/* Для администраторов */}
        {isAdmin && renderLinks(adminLinks, 'Администратор')}
      </nav>

      {/* Футер сайдбара */}
      {!collapsed && (
        <div className="sidebar-footer">
          <div className="sidebar-stats">
            <div className="stat-item">
              <div className="stat-value">10,000+</div>
              <div className="stat-label">пользователей</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">99.8%</div>
              <div className="stat-label">положительных отзывов</div>
            </div>
          </div>
          
          <div className="sidebar-copyright">
            © {new Date().getFullYear()} OFFER
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;