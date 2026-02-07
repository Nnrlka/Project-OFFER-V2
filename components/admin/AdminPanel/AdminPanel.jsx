import React, { useState } from 'react';
import { FaUsers, FaBox, FaMoneyBill, FaShieldAlt, FaChartBar, FaCog, FaBan, FaCheck, FaEye } from 'react-icons/fa';
import Button from '../../common/Button/Button';
import Modal from '../../common/Modal/Modal';
import './AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDisputeModal, setShowDisputeModal] = useState(false);

  const stats = {
    totalUsers: 10234,
    totalSellers: 567,
    totalProducts: 12345,
    totalTransactions: 89234,
    totalRevenue: 12500000,
    disputesOpen: 23,
  };

  const tabs = [
    { id: 'dashboard', label: 'Дашборд', icon: <FaChartBar /> },
    { id: 'users', label: 'Пользователи', icon: <FaUsers /> },
    { id: 'sellers', label: 'Продавцы', icon: <FaShieldAlt /> },
    { id: 'products', label: 'Товары', icon: <FaBox /> },
    { id: 'transactions', label: 'Транзакции', icon: <FaMoneyBill /> },
    { id: 'disputes', label: 'Споры', icon: <FaShieldAlt /> },
    { id: 'settings', label: 'Настройки', icon: <FaCog /> },
  ];

  const recentUsers = [
    { id: 1, username: 'user1', email: 'user1@example.com', role: 'user', status: 'active', joined: '2024-01-15' },
    { id: 2, username: 'seller1', email: 'seller@example.com', role: 'seller', status: 'active', joined: '2024-01-10' },
    { id: 3, username: 'user3', email: 'user3@example.com', role: 'user', status: 'banned', joined: '2024-01-05' },
  ];

  const recentDisputes = [
    { id: 'D-001', orderId: 'ORD-123', buyer: 'user1', seller: 'seller1', status: 'open', amount: 24999, createdAt: '2024-01-15' },
    { id: 'D-002', orderId: 'ORD-124', buyer: 'user2', seller: 'seller2', status: 'under_review', amount: 1500, createdAt: '2024-01-14' },
  ];

  const handleUserAction = (userId, action) => {
    console.log(`${action} пользователя ${userId}`);
    // TODO: Реализовать действия с пользователями
  };

  const handleDisputeAction = (disputeId, action) => {
    console.log(`${action} спора ${disputeId}`);
    // TODO: Реализовать действия со спорами
  };

  const UserModal = () => (
    <Modal
      isOpen={showUserModal}
      onClose={() => setShowUserModal(false)}
      title="Управление пользователем"
      size="medium"
    >
      <div className="user-modal">
        {selectedUser && (
          <>
            <div className="user-info">
              <div className="info-row">
                <span className="label">ID:</span>
                <span className="value">{selectedUser.id}</span>
              </div>
              <div className="info-row">
                <span className="label">Имя:</span>
                <span className="value">{selectedUser.username}</span>
              </div>
              <div className="info-row">
                <span className="label">Email:</span>
                <span className="value">{selectedUser.email}</span>
              </div>
              <div className="info-row">
                <span className="label">Роль:</span>
                <select className="role-select" defaultValue={selectedUser.role}>
                  <option value="user">Пользователь</option>
                  <option value="seller">Продавец</option>
                  <option value="admin">Администратор</option>
                </select>
              </div>
            </div>

            <div className="user-actions">
              <Button variant="primary" onClick={() => handleUserAction(selectedUser.id, 'update')}>
                Сохранить изменения
              </Button>
              {selectedUser.status === 'active' ? (
                <Button variant="danger" onClick={() => handleUserAction(selectedUser.id, 'ban')}>
                  Заблокировать
                </Button>
              ) : (
                <Button variant="success" onClick={() => handleUserAction(selectedUser.id, 'unban')}>
                  Разблокировать
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  );

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1 className="panel-title">Панель администратора</h1>
        <div className="admin-actions">
          <Button variant="outline">Экспорт данных</Button>
          <Button variant="primary">Обновить кэш</Button>
        </div>
      </div>

      <div className="admin-layout">
        {/* Боковая панель */}
        <div className="admin-sidebar">
          <nav className="admin-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="admin-stats">
            <div className="stat-item">
              <span className="stat-label">Онлайн:</span>
              <span className="stat-value">1,234</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Споры:</span>
              <span className="stat-value warning">{stats.disputesOpen}</span>
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="admin-content">
          {/* Вкладка Дашборд */}
          {activeTab === 'dashboard' && (
            <div className="tab-content">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaUsers />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{stats.totalUsers.toLocaleString()}</div>
                    <div className="stat-label">Пользователей</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <FaShieldAlt />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{stats.totalSellers}</div>
                    <div className="stat-label">Продавцов</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <FaBox />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{stats.totalProducts.toLocaleString()}</div>
                    <div className="stat-label">Товаров</div>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <FaMoneyBill />
                  </div>
                  <div className="stat-info">
                    <div className="stat-value">{stats.totalRevenue.toLocaleString()} ₽</div>
                    <div className="stat-label">Выручка</div>
                  </div>
                </div>
              </div>

              <div className="dashboard-sections">
                <div className="section">
                  <h3 className="section-title">Последние пользователи</h3>
                  <div className="users-table">
                    <div className="table-header">
                      <div>ID</div>
                      <div>Имя</div>
                      <div>Роль</div>
                      <div>Статус</div>
                      <div>Действия</div>
                    </div>
                    {recentUsers.map((user) => (
                      <div key={user.id} className="table-row">
                        <div>{user.id}</div>
                        <div>{user.username}</div>
                        <div>
                          <span className={`role-badge role-${user.role}`}>
                            {user.role}
                          </span>
                        </div>
                        <div>
                          <span className={`status-badge status-${user.status}`}>
                            {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                          </span>
                        </div>
                        <div className="actions">
                          <Button
                            size="small"
                            icon={<FaEye />}
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserModal(true);
                            }}
                          />
                          {user.status === 'active' ? (
                            <Button
                              variant="danger"
                              size="small"
                              icon={<FaBan />}
                              onClick={() => handleUserAction(user.id, 'ban')}
                            />
                          ) : (
                            <Button
                              variant="success"
                              size="small"
                              icon={<FaCheck />}
                              onClick={() => handleUserAction(user.id, 'unban')}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="section">
                  <h3 className="section-title">Активные споры</h3>
                  <div className="disputes-list">
                    {recentDisputes.map((dispute) => (
                      <div key={dispute.id} className="dispute-item">
                        <div className="dispute-header">
                          <span className="dispute-id">{dispute.id}</span>
                          <span className={`status-badge status-${dispute.status}`}>
                            {dispute.status === 'open' ? 'Открыт' : 'На рассмотрении'}
                          </span>
                        </div>
                        <div className="dispute-info">
                          <div>Заказ: {dispute.orderId}</div>
                          <div>Покупатель: {dispute.buyer}</div>
                          <div>Продавец: {dispute.seller}</div>
                          <div>Сумма: {dispute.amount.toLocaleString()} ₽</div>
                        </div>
                        <div className="dispute-actions">
                          <Button
                            size="small"
                            onClick={() => handleDisputeAction(dispute.id, 'view')}
                          >
                            Просмотр
                          </Button>
                          <Button
                            variant="primary"
                            size="small"
                            onClick={() => {
                              // TODO: Открыть модалку спора
                              setShowDisputeModal(true);
                            }}
                          >
                            Рассмотреть
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Вкладка Пользователи */}
          {activeTab === 'users' && (
            <div className="tab-content">
              <div className="tab-header">
                <h2 className="section-title">Управление пользователями</h2>
                <div className="search-box">
                  <input type="text" placeholder="Поиск пользователей..." className="search-input" />
                  <Button variant="primary">Найти</Button>
                </div>
              </div>

              <div className="users-table full">
                <div className="table-header">
                  <div>ID</div>
                  <div>Имя</div>
                  <div>Email</div>
                  <div>Роль</div>
                  <div>Дата регистрации</div>
                  <div>Статус</div>
                  <div>Действия</div>
                </div>
                {recentUsers.map((user) => (
                  <div key={user.id} className="table-row">
                    <div>{user.id}</div>
                    <div>{user.username}</div>
                    <div>{user.email}</div>
                    <div>
                      <span className={`role-badge role-${user.role}`}>
                        {user.role}
                      </span>
                    </div>
                    <div>{user.joined}</div>
                    <div>
                      <span className={`status-badge status-${user.status}`}>
                        {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                      </span>
                    </div>
                    <div className="actions">
                      <Button
                        size="small"
                        icon={<FaEye />}
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserModal(true);
                        }}
                      />
                      <Button
                        variant="outline"
                        size="small"
                        onClick={() => handleUserAction(user.id, 'reset_password')}
                      >
                        Сброс пароля
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Вкладка Настройки */}
          {activeTab === 'settings' && (
            <div className="tab-content">
              <h2 className="section-title">Настройки системы</h2>
              
              <div className="settings-form">
                <div className="form-group">
                  <label>Комиссия платформы (%)</label>
                  <input type="number" className="form-input" defaultValue="5" min="0" max="100" />
                </div>

                <div className="form-group">
                  <label>Минимальная сумма вывода (₽)</label>
                  <input type="number" className="form-input" defaultValue="100" min="1" />
                </div>

                <div className="form-group">
                  <label>Лимит на вывод в месяц (₽)</label>
                  <input type="number" className="form-input" defaultValue="15000" min="1" />
                </div>

                <div className="form-group">
                  <label>Время на открытие спора (часы)</label>
                  <input type="number" className="form-input" defaultValue="48" min="1" />
                </div>

                <div className="form-group">
                  <label>Модерация новых товаров</label>
                  <select className="form-select">
                    <option value="auto">Автоматическая</option>
                    <option value="manual">Ручная</option>
                  </select>
                </div>

                <div className="form-actions">
                  <Button variant="primary">Сохранить настройки</Button>
                  <Button variant="outline">Сбросить к умолчаниям</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Модальные окна */}
      {showUserModal && <UserModal />}
      
      {showDisputeModal && (
        <Modal
          isOpen={showDisputeModal}
          onClose={() => setShowDisputeModal(false)}
          title="Рассмотрение спора"
          size="large"
        >
          <div className="dispute-modal">
            <div className="dispute-details">
              <h3>Детали спора</h3>
              <p>Здесь будет форма для рассмотрения спора...</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminPanel;