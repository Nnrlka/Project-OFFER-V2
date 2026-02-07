import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaEnvelope, FaWallet, FaShoppingCart, FaStar, FaCog, FaHistory, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa';
import Button from '../../components/common/Button/Button';
import BalanceCard from '../../components/user/BalanceCard/BalanceCard';
import ProfileCard from '../../components/user/ProfileCard/ProfileCard';
import './Profile.css';

const Profile = () => {
  const { user, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Mock данные пользователя
  const userStats = {
    totalOrders: 42,
    completedOrders: 38,
    totalSpent: 125000,
    favoriteCategory: 'Аккаунты',
    memberSince: '2023-01-15',
  };

  const tabs = [
    { id: 'overview', label: 'Обзор', icon: <FaUser /> },
    { id: 'orders', label: 'Заказы', icon: <FaShoppingCart /> },
    { id: 'balance', label: 'Баланс', icon: <FaWallet /> },
    { id: 'reviews', label: 'Отзывы', icon: <FaStar /> },
    { id: 'security', label: 'Безопасность', icon: <FaShieldAlt /> },
    { id: 'settings', label: 'Настройки', icon: <FaCog /> },
  ];

  const recentOrders = [
    { id: 'ORD-001', product: 'Steam аккаунт CS:GO', date: '2024-01-15', status: 'completed', amount: 24999 },
    { id: 'ORD-002', product: 'Windows 11 Pro ключ', date: '2024-01-10', status: 'completed', amount: 2999 },
    { id: 'ORD-003', product: '1000 голды WoW', date: '2024-01-05', status: 'processing', amount: 1500 },
  ];

  const handleLogout = () => {
    if (window.confirm('Вы уверены, что хотите выйти?')) {
      logout();
    }
  };

  const handleSaveProfile = (updatedData) => {
    updateUser(updatedData);
    setIsEditing(false);
  };

  return (
    <div className="profile-page page">
      <div className="container">
        <div className="profile-header">
          <h1 className="page-title">Мой профиль</h1>
          <div className="profile-actions">
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Отменить' : 'Редактировать'}
            </Button>
            <Button
              variant="danger"
              icon={<FaSignOutAlt />}
              onClick={handleLogout}
            >
              Выйти
            </Button>
          </div>
        </div>

        <div className="profile-layout">
          {/* Боковая панель */}
          <div className="profile-sidebar">
            <ProfileCard 
              user={user} 
              stats={userStats}
              isEditing={isEditing}
              onSave={handleSaveProfile}
            />
            
            <div className="sidebar-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Основной контент */}
          <div className="profile-content">
            {/* Вкладка Обзор */}
            {activeTab === 'overview' && (
              <div className="tab-content">
                <div className="overview-stats">
                  <div className="stat-card glass-effect">
                    <div className="stat-icon">
                      <FaShoppingCart />
                    </div>
                    <div className="stat-info">
                      <div className="stat-value">{userStats.totalOrders}</div>
                      <div className="stat-label">Всего заказов</div>
                    </div>
                  </div>
                  
                  <div className="stat-card glass-effect">
                    <div className="stat-icon">
                      <FaStar />
                    </div>
                    <div className="stat-info">
                      <div className="stat-value">{userStats.completedOrders}</div>
                      <div className="stat-label">Завершённых</div>
                    </div>
                  </div>
                  
                  <div className="stat-card glass-effect">
                    <div className="stat-icon">
                      <FaWallet />
                    </div>
                    <div className="stat-info">
                      <div className="stat-value">{userStats.totalSpent.toLocaleString()} ₽</div>
                      <div className="stat-label">Всего потрачено</div>
                    </div>
                  </div>
                </div>

                <div className="recent-orders">
                  <h3 className="section-title">Последние заказы</h3>
                  <div className="orders-table">
                    <div className="table-header">
                      <div className="col">Заказ</div>
                      <div className="col">Товар</div>
                      <div className="col">Дата</div>
                      <div className="col">Статус</div>
                      <div className="col">Сумма</div>
                    </div>
                    {recentOrders.map((order) => (
                      <div key={order.id} className="table-row">
                        <div className="col order-id">{order.id}</div>
                        <div className="col order-product">{order.product}</div>
                        <div className="col order-date">{order.date}</div>
                        <div className="col">
                          <span className={`status-badge status-${order.status}`}>
                            {order.status === 'completed' ? 'Завершён' : 'В обработке'}
                          </span>
                        </div>
                        <div className="col order-amount">{order.amount.toLocaleString()} ₽</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Вкладка Баланс */}
            {activeTab === 'balance' && (
              <div className="tab-content">
                <BalanceCard />
                
                <div className="transactions-history">
                  <h3 className="section-title">История операций</h3>
                  <div className="transactions-list">
                    <div className="transaction-item">
                      <div className="transaction-info">
                        <div className="transaction-type deposit">Пополнение</div>
                        <div className="transaction-date">2024-01-15 14:30</div>
                      </div>
                      <div className="transaction-amount positive">+10,000 ₽</div>
                    </div>
                    <div className="transaction-item">
                      <div className="transaction-info">
                        <div className="transaction-type purchase">Покупка</div>
                        <div className="transaction-date">2024-01-15 14:45</div>
                        <div className="transaction-description">Steam аккаунт CS:GO</div>
                      </div>
                      <div className="transaction-amount negative">-24,999 ₽</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Вкладка Настройки */}
            {activeTab === 'settings' && (
              <div className="tab-content">
                <div className="settings-section">
                  <h3 className="section-title">Настройки аккаунта</h3>
                  <div className="settings-form">
                    <div className="form-group">
                      <label>Язык интерфейса</label>
                      <select className="form-select">
                        <option value="ru">Русский</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Валюта</label>
                      <select className="form-select">
                        <option value="RUB">Рубли (₽)</option>
                        <option value="USD">Доллары ($)</option>
                        <option value="EUR">Евро (€)</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Уведомления</label>
                      <div className="checkboxes">
                        <label className="checkbox-label">
                          <input type="checkbox" defaultChecked />
                          <span className="checkmark"></span>
                          Email уведомления
                        </label>
                        <label className="checkbox-label">
                          <input type="checkbox" defaultChecked />
                          <span className="checkmark"></span>
                          Уведомления о заказах
                        </label>
                        <label className="checkbox-label">
                          <input type="checkbox" />
                          <span className="checkmark"></span>
                          Новости и акции
                        </label>
                      </div>
                    </div>
                    
                    <Button variant="primary">Сохранить настройки</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;