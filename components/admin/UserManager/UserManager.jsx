import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaFilter, 
  FaEdit, 
  FaTrash, 
  FaBan, 
  FaCheck,
  FaEye,
  FaUserShield,
  FaUserTimes,
  FaSort,
  FaSortUp,
  FaSortDown
} from 'react-icons/fa';
import { useAuth } from '../../../../context/AuthContext';
import Button from '../../common/Button/Button';
import Modal from '../../common/Modal/Modal';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import { formatDate, formatRole } from '../../../../utils/formatters';
import './UserManager.css';

const UserManager = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // Mock данные (в реальном приложении будет API запрос)
  useEffect(() => {
    const mockUsers = [
      {
        id: '1',
        email: 'user1@example.com',
        username: 'UserOne',
        role: 'user',
        balance: 5000,
        totalSpent: 15000,
        totalEarned: 0,
        emailVerified: true,
        isActive: true,
        createdAt: '2024-01-15T10:30:00Z',
        lastLogin: '2024-01-20T14:25:00Z',
      },
      {
        id: '2',
        email: 'seller1@example.com',
        username: 'ProfessionalSeller',
        role: 'seller',
        balance: 25000,
        totalSpent: 5000,
        totalEarned: 100000,
        emailVerified: true,
        isActive: true,
        createdAt: '2023-12-10T09:15:00Z',
        lastLogin: '2024-01-20T10:45:00Z',
        rating: 4.8,
        reviewsCount: 127,
      },
      {
        id: '3',
        email: 'admin@example.com',
        username: 'AdminMaster',
        role: 'admin',
        balance: 0,
        totalSpent: 0,
        totalEarned: 0,
        emailVerified: true,
        isActive: true,
        createdAt: '2023-11-01T00:00:00Z',
        lastLogin: '2024-01-20T16:30:00Z',
      },
      {
        id: '4',
        email: 'banned@example.com',
        username: 'BannedUser',
        role: 'user',
        balance: 0,
        totalSpent: 1000,
        totalEarned: 0,
        emailVerified: true,
        isActive: false,
        createdAt: '2024-01-05T12:20:00Z',
        lastLogin: '2024-01-10T09:30:00Z',
        banReason: 'Мошенничество',
      },
    ];

    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  // Фильтрация пользователей
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Сортировка
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'createdAt' || sortBy === 'lastLogin') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  // Обработчики действий
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleToggleActive = async (userId, isActive) => {
    // API вызов для изменения статуса
    console.log(`Toggle active for user ${userId}: ${isActive}`);
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, isActive: !isActive } : user
    ));
  };

  const handleChangeRole = async (userId, newRole) => {
    // API вызов для изменения роли
    console.log(`Change role for user ${userId} to ${newRole}`);
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  // Рендер сортировочной иконки
  const renderSortIcon = (column) => {
    if (sortBy !== column) return <FaSort />;
    return sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  // Рендер роли с цветом
  const renderRoleBadge = (role) => {
    const roleConfig = {
      user: { label: 'Пользователь', className: 'role-user' },
      seller: { label: 'Продавец', className: 'role-seller' },
      admin: { label: 'Администратор', className: 'role-admin' },
    };
    
    const config = roleConfig[role] || roleConfig.user;
    return <span className={`role-badge ${config.className}`}>{config.label}</span>;
  };

  // Рендер статуса
  const renderStatusBadge = (isActive) => {
    return isActive ? (
      <span className="status-badge active">
        <FaCheck /> Активен
      </span>
    ) : (
      <span className="status-badge inactive">
        <FaBan /> Заблокирован
      </span>
    );
  };

  if (loading) {
    return (
      <div className="user-manager-loading">
        <LoadingSpinner size="large" />
        <p>Загрузка пользователей...</p>
      </div>
    );
  }

  return (
    <div className="user-manager">
      {/* Заголовок и статистика */}
      <div className="user-manager-header">
        <div className="header-left">
          <h2 className="section-title">Управление пользователями</h2>
          <p className="section-subtitle">
            Всего пользователей: {users.length} • Активных: {users.filter(u => u.isActive).length}
          </p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value">{users.filter(u => u.role === 'user').length}</div>
            <div className="stat-label">Пользователей</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{users.filter(u => u.role === 'seller').length}</div>
            <div className="stat-label">Продавцов</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{users.filter(u => !u.isActive).length}</div>
            <div className="stat-label">Заблокировано</div>
          </div>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <div className="user-manager-controls">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Поиск по email или имени..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="roleFilter" className="filter-label">
              <FaFilter /> Роль:
            </label>
            <select
              id="roleFilter"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Все роли</option>
              <option value="user">Пользователь</option>
              <option value="seller">Продавец</option>
              <option value="admin">Администратор</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="statusFilter" className="filter-label">
              <FaFilter /> Статус:
            </label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Все</option>
              <option value="active">Активные</option>
              <option value="inactive">Заблокированные</option>
            </select>
          </div>
        </div>
      </div>

      {/* Таблица пользователей */}
      <div className="users-table-container">
        <div className="table-responsive">
          <table className="users-table">
            <thead>
              <tr>
                <th 
                  onClick={() => {
                    setSortBy('username');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                  className="sortable"
                >
                  <span className="th-content">
                    Пользователь {renderSortIcon('username')}
                  </span>
                </th>
                <th 
                  onClick={() => {
                    setSortBy('role');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                  className="sortable"
                >
                  <span className="th-content">
                    Роль {renderSortIcon('role')}
                  </span>
                </th>
                <th 
                  onClick={() => {
                    setSortBy('balance');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                  className="sortable"
                >
                  <span className="th-content">
                    Баланс {renderSortIcon('balance')}
                  </span>
                </th>
                <th 
                  onClick={() => {
                    setSortBy('createdAt');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                  className="sortable"
                >
                  <span className="th-content">
                    Дата регистрации {renderSortIcon('createdAt')}
                  </span>
                </th>
                <th 
                  onClick={() => {
                    setSortBy('isActive');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                  className="sortable"
                >
                  <span className="th-content">
                    Статус {renderSortIcon('isActive')}
                  </span>
                </th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.id}>
                  <td className="user-info-cell">
                    <div className="user-avatar">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                      <div className="user-name">{user.username}</div>
                      <div className="user-email">{user.email}</div>
                      {!user.emailVerified && (
                        <div className="user-email-warning">
                          Почта не подтверждена
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    {renderRoleBadge(user.role)}
                    {user.rating && (
                      <div className="user-rating">
                        Рейтинг: {user.rating} ⭐ ({user.reviewsCount} отзывов)
                      </div>
                    )}
                  </td>
                  <td className="balance-cell">
                    <div className="balance-amount">
                      {user.balance.toLocaleString()} ₽
                    </div>
                    <div className="balance-stats">
                      <span className="stat-item">
                        Потратил: {user.totalSpent.toLocaleString()} ₽
                      </span>
                      {user.totalEarned > 0 && (
                        <span className="stat-item">
                          Заработал: {user.totalEarned.toLocaleString()} ₽
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="date-cell">
                      <div>{formatDate(user.createdAt)}</div>
                      <div className="last-login">
                        Последний вход: {formatDate(user.lastLogin)}
                      </div>
                    </div>
                  </td>
                  <td>
                    {renderStatusBadge(user.isActive)}
                    {user.banReason && (
                      <div className="ban-reason">
                        Причина: {user.banReason}
                      </div>
                    )}
                  </td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <Button
                        size="small"
                        variant="outline"
                        icon={<FaEye />}
                        onClick={() => handleViewUser(user)}
                        title="Просмотр"
                      />
                      
                      <Button
                        size="small"
                        variant="outline"
                        icon={<FaEdit />}
                        onClick={() => handleEditUser(user)}
                        title="Редактировать"
                        disabled={user.id === currentUser?.id}
                      />
                      
                      {user.role !== 'admin' && (
                        <Button
                          size="small"
                          variant="outline"
                          icon={<FaUserShield />}
                          onClick={() => handleChangeRole(user.id, user.role === 'seller' ? 'user' : 'seller')}
                          title={user.role === 'seller' ? 'Снять продавца' : 'Назначить продавцом'}
                        />
                      )}
                      
                      <Button
                        size="small"
                        variant="outline"
                        icon={user.isActive ? <FaBan /> : <FaCheck />}
                        onClick={() => handleToggleActive(user.id, user.isActive)}
                        title={user.isActive ? 'Заблокировать' : 'Разблокировать'}
                        disabled={user.id === currentUser?.id}
                      />
                      
                      <Button
                        size="small"
                        variant="danger"
                        icon={<FaTrash />}
                        onClick={() => handleDeleteUser(user)}
                        title="Удалить"
                        disabled={user.id === currentUser?.id}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {sortedUsers.length === 0 && (
          <div className="no-results">
            <div className="no-results-icon">👥</div>
            <h3>Пользователи не найдены</h3>
            <p>Попробуйте изменить параметры поиска или фильтры</p>
          </div>
        )}
      </div>

      {/* Модальное окно просмотра пользователя */}
      <Modal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Просмотр пользователя"
        size="large"
      >
        {selectedUser && (
          <div className="user-detail-view">
            <div className="user-detail-header">
              <div className="user-avatar-large">
                {selectedUser.username.charAt(0).toUpperCase()}
              </div>
              <div className="user-detail-info">
                <h3>{selectedUser.username}</h3>
                <p>{selectedUser.email}</p>
                <div className="user-detail-badges">
                  {renderRoleBadge(selectedUser.role)}
                  {renderStatusBadge(selectedUser.isActive)}
                </div>
              </div>
            </div>
            
            <div className="user-detail-grid">
              <div className="detail-card">
                <h4>Баланс</h4>
                <div className="detail-value">{selectedUser.balance.toLocaleString()} ₽</div>
              </div>
              <div className="detail-card">
                <h4>Потрачено</h4>
                <div className="detail-value">{selectedUser.totalSpent.toLocaleString()} ₽</div>
              </div>
              <div className="detail-card">
                <h4>Заработано</h4>
                <div className="detail-value">{selectedUser.totalEarned.toLocaleString()} ₽</div>
              </div>
              <div className="detail-card">
                <h4>Email подтвержден</h4>
                <div className={`detail-value ${selectedUser.emailVerified ? 'success' : 'danger'}`}>
                  {selectedUser.emailVerified ? 'Да' : 'Нет'}
                </div>
              </div>
            </div>
            
            <div className="user-detail-info-section">
              <h4>Дата регистрации</h4>
              <p>{formatDate(selectedUser.createdAt)}</p>
              
              <h4>Последний вход</h4>
              <p>{formatDate(selectedUser.lastLogin)}</p>
              
              {selectedUser.banReason && (
                <>
                  <h4>Причина блокировки</h4>
                  <p className="ban-reason-text">{selectedUser.banReason}</p>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Модальное окно редактирования пользователя */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Редактирование пользователя"
      >
        {selectedUser && (
          <div className="user-edit-form">
            <div className="form-group">
              <label htmlFor="editUsername">Имя пользователя</label>
              <input
                id="editUsername"
                type="text"
                defaultValue={selectedUser.username}
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="editEmail">Email</label>
              <input
                id="editEmail"
                type="email"
                defaultValue={selectedUser.email}
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="editRole">Роль</label>
              <select
                id="editRole"
                defaultValue={selectedUser.role}
                className="form-control"
                disabled={selectedUser.id === currentUser?.id}
              >
                <option value="user">Пользователь</option>
                <option value="seller">Продавец</option>
                <option value="admin">Администратор</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="editBalance">Баланс</label>
              <input
                id="editBalance"
                type="number"
                defaultValue={selectedUser.balance}
                className="form-control"
              />
            </div>
            
            <div className="form-actions">
              <Button variant="primary">Сохранить</Button>
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                Отмена
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Модальное окно удаления пользователя */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Подтверждение удаления"
      >
        {selectedUser && (
          <div className="delete-confirmation">
            <div className="warning-icon">⚠️</div>
            <h3>Вы уверены, что хотите удалить пользователя?</h3>
            <p>
              Будет удален пользователь <strong>{selectedUser.username}</strong> ({selectedUser.email})
            </p>
            <p className="warning-text">
              Это действие нельзя отменить. Все данные пользователя будут удалены.
            </p>
            
            <div className="delete-actions">
              <Button variant="danger" icon={<FaTrash />}>
                Удалить пользователя
              </Button>
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Отмена
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManager;