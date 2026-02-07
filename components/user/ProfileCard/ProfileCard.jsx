import React, { useState } from 'react';
import { FaEdit, FaSave, FaTimes, FaCalendar, FaShoppingCart, FaStar } from 'react-icons/fa';
import Button from '../../common/Button/Button';
import { formatDate } from '../../../utils/formatters';
import './ProfileCard.css';

const ProfileCard = ({ user, stats, isEditing, onSave }) => {
  const [editData, setEditData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editData);
  };

  const handleCancel = () => {
    setEditData({
      username: user?.username || '',
      email: user?.email || '',
      avatar: user?.avatar || '',
    });
  };

  return (
    <div className="profile-card glass-effect">
      <div className="profile-header">
        <div className="avatar-container">
          <div className="avatar">
            {editData.avatar ? (
              <img src={editData.avatar} alt="Avatar" className="avatar-image" />
            ) : (
              <div className="avatar-placeholder">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          {isEditing && (
            <div className="avatar-upload">
              <input
                type="file"
                accept="image/*"
                id="avatar-upload"
                className="avatar-input"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setEditData(prev => ({ ...prev, avatar: reader.result }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <label htmlFor="avatar-upload" className="avatar-label">
                Изменить
              </label>
            </div>
          )}
        </div>

        <div className="profile-info">
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                name="username"
                value={editData.username}
                onChange={handleChange}
                className="edit-input"
                placeholder="Имя пользователя"
              />
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
                className="edit-input"
                placeholder="Email"
              />
            </div>
          ) : (
            <>
              <h2 className="profile-name">{user?.username || 'Пользователь'}</h2>
              <p className="profile-email">{user?.email || 'email@example.com'}</p>
              <div className="profile-role">
                <span className={`role-badge role-${user?.role || 'user'}`}>
                  {user?.role === 'admin' ? 'Администратор' : 
                   user?.role === 'seller' ? 'Продавец' : 'Пользователь'}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="edit-actions">
          <Button
            variant="primary"
            size="small"
            icon={<FaSave />}
            onClick={handleSave}
          >
            Сохранить
          </Button>
          <Button
            variant="outline"
            size="small"
            icon={<FaTimes />}
            onClick={handleCancel}
          >
            Отмена
          </Button>
        </div>
      )}

      <div className="profile-stats">
        <div className="stat-item">
          <div className="stat-icon">
            <FaShoppingCart />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats?.totalOrders || 0}</div>
            <div className="stat-label">Заказов</div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">
            <FaStar />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats?.completedOrders || 0}</div>
            <div className="stat-label">Завершено</div>
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-icon">
            <FaCalendar />
          </div>
          <div className="stat-content">
            <div className="stat-value">
              {stats?.memberSince ? formatDate(stats.memberSince).split(',')[0] : '—'}
            </div>
            <div className="stat-label">С нами</div>
          </div>
        </div>
      </div>

      <div className="profile-meta">
        <div className="meta-item">
          <span className="meta-label">ID пользователя:</span>
          <span className="meta-value">{user?.id || '—'}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Статус:</span>
          <span className="meta-value status-active">Активный</span>
        </div>
        {user?.role === 'seller' && (
          <div className="meta-item">
            <span className="meta-label">Рейтинг продавца:</span>
            <span className="meta-value rating-value">4.8 ★</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;