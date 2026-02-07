import React, { useState, useEffect } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaBell,
  FaShieldAlt,
  FaGlobe,
  FaSave,
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaUpload,
  FaCheck,
  FaExclamationTriangle
} from 'react-icons/fa';
import { useAuth } from '../../../../context/AuthContext';
import Button from '../../common/Button/Button';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import { validateEmail, validatePassword } from '../../../../utils/auth';
import './SettingsForm.css';

const SettingsForm = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Profile state
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    phone: '',
    bio: '',
    website: '',
    location: '',
  });

  // Security state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
  });

  // Notifications state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    orderUpdates: true,
    securityAlerts: true,
    priceAlerts: false,
  });

  // Privacy state
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowMessages: 'everyone',
    showLastSeen: true,
    showBalance: false,
    showReviews: true,
  });

  // Errors state
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Загрузка данных пользователя
  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        website: user.website || '',
        location: user.location || '',
      });
      
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очистка ошибок
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurityData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Очистка ошибок
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handlePrivacyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrivacy(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, avatar: 'Пожалуйста, выберите изображение' }));
      return;
    }

    // Проверка размера файла (максимум 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, avatar: 'Размер файла не должен превышать 2MB' }));
      return;
    }

    // Предпросмотр аватарки
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Очистка ошибок
    if (errors.avatar) {
      setErrors(prev => ({ ...prev, avatar: '' }));
    }
  };

  const validateProfile = () => {
    const newErrors = {};

    if (!profileData.username.trim()) {
      newErrors.username = 'Имя пользователя обязательно';
    } else if (profileData.username.length < 3) {
      newErrors.username = 'Имя пользователя должно быть не менее 3 символов';
    } else if (profileData.username.length > 20) {
      newErrors.username = 'Имя пользователя не должно превышать 20 символов';
    }

    if (!profileData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!validateEmail(profileData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (profileData.phone && !/^[\d\s\-\+\(\)]+$/.test(profileData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона';
    }

    if (profileData.bio.length > 500) {
      newErrors.bio = 'Биография не должна превышать 500 символов';
    }

    if (profileData.website && !profileData.website.startsWith('http')) {
      newErrors.website = 'Введите корректный URL (начинается с http:// или https://)';
    }

    return newErrors;
  };

  const validateSecurity = () => {
    const newErrors = {};

    if (securityData.newPassword) {
      const passwordValidation = validatePassword(securityData.newPassword);
      
      if (!passwordValidation.isValid) {
        newErrors.newPassword = 'Пароль должен содержать:';
        if (!passwordValidation.minLength) newErrors.newPassword += ' минимум 8 символов,';
        if (!passwordValidation.hasUpperCase) newErrors.newPassword += ' заглавную букву,';
        if (!passwordValidation.hasLowerCase) newErrors.newPassword += ' строчную букву,';
        if (!passwordValidation.hasNumbers) newErrors.newPassword += ' цифру,';
        
        newErrors.newPassword = newErrors.newPassword.slice(0, -1); // Удаляем последнюю запятую
      }

      if (securityData.newPassword !== securityData.confirmPassword) {
        newErrors.confirmPassword = 'Пароли не совпадают';
      }

      if (!securityData.currentPassword) {
        newErrors.currentPassword = 'Введите текущий пароль';
      }
    }

    return newErrors;
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    
    const profileErrors = validateProfile();
    if (Object.keys(profileErrors).length > 0) {
      setErrors(profileErrors);
      return;
    }

    setSaving(true);
    setErrors({});

    try {
      // TODO: Реальная логика обновления профиля
      const result = await updateUser(profileData);
      
      if (result.success) {
        setSuccessMessage('Профиль успешно обновлен');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrors({ form: result.error || 'Ошибка при обновлении профиля' });
      }
    } catch (error) {
      setErrors({ form: error.message || 'Ошибка при обновлении профиля' });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSecurity = async (e) => {
    e.preventDefault();
    
    const securityErrors = validateSecurity();
    if (Object.keys(securityErrors).length > 0) {
      setErrors(securityErrors);
      return;
    }

    setSaving(true);
    setErrors({});

    try {
      // TODO: Реальная логика смены пароля
      console.log('Changing password...', securityData);
      
      // Симуляция успешного обновления
      setTimeout(() => {
        setSuccessMessage('Пароль успешно изменен');
        setSecurityData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
          twoFactorEnabled: securityData.twoFactorEnabled,
        });
        setSaving(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      }, 1000);
    } catch (error) {
      setErrors({ form: error.message || 'Ошибка при смене пароля' });
      setSaving(false);
    }
  };

  const handleSaveNotifications = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // TODO: Реальная логика сохранения настроек уведомлений
      console.log('Saving notifications...', notifications);
      
      setTimeout(() => {
        setSuccessMessage('Настройки уведомлений сохранены');
        setSaving(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      }, 1000);
    } catch (error) {
      setErrors({ form: error.message || 'Ошибка при сохранении настроек' });
      setSaving(false);
    }
  };

  const handleSavePrivacy = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // TODO: Реальная логика сохранения настроек приватности
      console.log('Saving privacy settings...', privacy);
      
      setTimeout(() => {
        setSuccessMessage('Настройки приватности сохранены');
        setSaving(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      }, 1000);
    } catch (error) {
      setErrors({ form: error.message || 'Ошибка при сохранении настроек' });
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Профиль', icon: <FaUser /> },
    { id: 'security', label: 'Безопасность', icon: <FaLock /> },
    { id: 'notifications', label: 'Уведомления', icon: <FaBell /> },
    { id: 'privacy', label: 'Приватность', icon: <FaShieldAlt /> },
  ];

  if (loading) {
    return (
      <div className="settings-loading">
        <LoadingSpinner size="large" />
        <p>Загрузка настроек...</p>
      </div>
    );
  }

  return (
    <div className="settings-form">
      {/* Заголовок */}
      <div className="settings-header">
        <h2 className="settings-title">Настройки аккаунта</h2>
        <p className="settings-subtitle">
          Управление настройками вашего аккаунта и профиля
        </p>
      </div>

      {/* Навигация по вкладкам */}
      <div className="settings-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Сообщения об успехе/ошибке */}
      {successMessage && (
        <div className="success-message">
          <FaCheck />
          <span>{successMessage}</span>
        </div>
      )}

      {errors.form && (
        <div className="error-message">
          <FaExclamationTriangle />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Контент вкладок */}
      <div className="settings-content">
        {/* Вкладка профиля */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="profile-form">
            <div className="form-section">
              <h3 className="section-title">
                <FaUser /> Основная информация
              </h3>
              
              <div className="avatar-section">
                <div className="avatar-container">
                  <div className="avatar-preview">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar" />
                    ) : (
                      <div className="avatar-placeholder">
                        {profileData.username?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  <div className="avatar-actions">
                    <label htmlFor="avatar-upload" className="avatar-upload-btn">
                      <FaUpload /> Сменить фото
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      style={{ display: 'none' }}
                    />
                    {avatarPreview && (
                      <Button
                        type="button"
                        size="small"
                        variant="outline"
                        onClick={() => setAvatarPreview(null)}
                      >
                        Удалить
                      </Button>
                    )}
                  </div>
                </div>
                {errors.avatar && <div className="error-text">{errors.avatar}</div>}
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="username">
                    <FaUser /> Имя пользователя *
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleProfileChange}
                    placeholder="Введите имя пользователя"
                    className={errors.username ? 'error' : ''}
                  />
                  {errors.username && <div className="error-text">{errors.username}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope /> Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    placeholder="Введите ваш email"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <div className="error-text">{errors.email}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <FaPhone /> Телефон
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    placeholder="+7 (999) 999-99-99"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <div className="error-text">{errors.phone}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="location">Местоположение</label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleProfileChange}
                    placeholder="Город, страна"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Дополнительная информация</h3>
              
              <div className="form-group">
                <label htmlFor="bio">Биография</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  placeholder="Расскажите о себе..."
                  rows={4}
                  maxLength={500}
                  className={errors.bio ? 'error' : ''}
                />
                <div className="textarea-info">
                  <span>{profileData.bio.length}/500 символов</span>
                  {errors.bio && <span className="error-text">{errors.bio}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="website">
                  <FaGlobe /> Веб-сайт
                </label>
                <input
                  id="website"
                  type="url"
                  name="website"
                  value={profileData.website}
                  onChange={handleProfileChange}
                  placeholder="https://example.com"
                  className={errors.website ? 'error' : ''}
                />
                {errors.website && <div className="error-text">{errors.website}</div>}
              </div>
            </div>

            <div className="form-actions">
              <Button
                type="submit"
                variant="primary"
                icon={<FaSave />}
                isLoading={saving}
              >
                Сохранить изменения
              </Button>
            </div>
          </form>
        )}

        {/* Вкладка безопасности */}
        {activeTab === 'security' && (
          <form onSubmit={handleSaveSecurity} className="security-form">
            <div className="form-section">
              <h3 className="section-title">
                <FaLock /> Смена пароля
              </h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="currentPassword">
                    Текущий пароль *
                  </label>
                  <div className="password-input">
                    <input
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      name="currentPassword"
                      value={securityData.currentPassword}
                      onChange={handleSecurityChange}
                      placeholder="Введите текущий пароль"
                      className={errors.currentPassword ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <div className="error-text">{errors.currentPassword}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">
                    Новый пароль
                  </label>
                  <div className="password-input">
                    <input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      value={securityData.newPassword}
                      onChange={handleSecurityChange}
                      placeholder="Введите новый пароль"
                      className={errors.newPassword ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <div className="error-text">{errors.newPassword}</div>
                  )}
                  <div className="password-hint">
                    Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    Подтверждение пароля
                  </label>
                  <div className="password-input">
                    <input
                      id="confirmPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={securityData.confirmPassword}
                      onChange={handleSecurityChange}
                      placeholder="Повторите новый пароль"
                      className={errors.confirmPassword ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="error-text">{errors.confirmPassword}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">
                <FaShieldAlt /> Дополнительная защита
              </h3>
              
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="twoFactorEnabled"
                    checked={securityData.twoFactorEnabled}
                    onChange={handleSecurityChange}
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">
                    Включить двухфакторную аутентификацию (2FA)
                  </span>
                </label>
                <p className="checkbox-description">
                  Повысьте безопасность вашего аккаунта с помощью кодов подтверждения из приложения
                </p>
              </div>
            </div>

            <div className="form-section danger-zone">
              <h3 className="section-title danger">Опасная зона</h3>
              
              <div className="danger-actions">
                <div className="danger-action">
                  <h4>Удаление аккаунта</h4>
                  <p>
                    Удаление аккаунта приведет к потере всех данных, включая историю заказов и баланс
                  </p>
                  <Button variant="danger" size="small">
                    Удалить аккаунт
                  </Button>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <Button
                type="submit"
                variant="primary"
                icon={<FaSave />}
                isLoading={saving}
              >
                Обновить безопасность
              </Button>
            </div>
          </form>
        )}

        {/* Вкладка уведомлений */}
        {activeTab === 'notifications' && (
          <form onSubmit={handleSaveNotifications} className="notifications-form">
            <div className="form-section">
              <h3 className="section-title">
                <FaBell /> Настройки уведомлений
              </h3>
              
              <div className="notifications-grid">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={notifications.emailNotifications}
                      onChange={handleNotificationChange}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">Email уведомления</span>
                  </label>
                  <p className="checkbox-description">
                    Получать важные уведомления на email
                  </p>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="pushNotifications"
                      checked={notifications.pushNotifications}
                      onChange={handleNotificationChange}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">Push уведомления</span>
                  </label>
                  <p className="checkbox-description">
                    Уведомления в браузере и на мобильных устройствах
                  </p>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="orderUpdates"
                      checked={notifications.orderUpdates}
                      onChange={handleNotificationChange}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">Обновления заказов</span>
                  </label>
                  <p className="checkbox-description">
                    Уведомления об изменении статуса ваших заказов
                  </p>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="securityAlerts"
                      checked={notifications.securityAlerts}
                      onChange={handleNotificationChange}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">Оповещения безопасности</span>
                  </label>
                  <p className="checkbox-description">
                    Уведомления о входе в аккаунт и подозрительной активности
                  </p>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="marketingEmails"
                      checked={notifications.marketingEmails}
                      onChange={handleNotificationChange}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">Маркетинговые рассылки</span>
                  </label>
                  <p className="checkbox-description">
                    Получать специальные предложения и новости платформы
                  </p>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="priceAlerts"
                      checked={notifications.priceAlerts}
                      onChange={handleNotificationChange}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">Оповещения о ценах</span>
                  </label>
                  <p className="checkbox-description">
                    Уведомления об изменении цен на отслеживаемые товары
                  </p>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <Button
                type="submit"
                variant="primary"
                icon={<FaSave />}
                isLoading={saving}
              >
                Сохранить настройки
              </Button>
            </div>
          </form>
        )}

        {/* Вкладка приватности */}
        {activeTab === 'privacy' && (
          <form onSubmit={handleSavePrivacy} className="privacy-form">
            <div className="form-section">
              <h3 className="section-title">
                <FaShieldAlt /> Настройки приватности
              </h3>
              
              <div className="privacy-grid">
                <div className="form-group">
                  <label htmlFor="profileVisibility">Видимость профиля</label>
                  <select
                    id="profileVisibility"
                    name="profileVisibility"
                    value={privacy.profileVisibility}
                    onChange={handlePrivacyChange}
                  >
                    <option value="public">Публичный (видят все)</option>
                    <option value="registered">Только зарегистрированные</option>
                    <option value="private">Приватный (только друзья)</option>
                    <option value="hidden">Скрытый</option>
                  </select>
                  <p className="select-description">
                    Кто может видеть ваш профиль и информацию
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="allowMessages">Кто может писать сообщения</label>
                  <select
                    id="allowMessages"
                    name="allowMessages"
                    value={privacy.allowMessages}
                    onChange={handlePrivacyChange}
                  >
                    <option value="everyone">Все пользователи</option>
                    <option value="registered">Только зарегистрированные</option>
                    <option value="friends">Только друзья</option>
                    <option value="nobody">Никто</option>
                  </select>
                  <p className="select-description">
                    Кто может отправлять вам личные сообщения
                  </p>
                </div>
              </div>

              <div className="privacy-checkboxes">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="showOnlineStatus"
                      checked={privacy.showOnlineStatus}
                      onChange={handlePrivacyChange}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">Показывать статус онлайн</span>
                  </label>
                  <p className="checkbox-description">
                    Отображать, когда вы находитесь на сайте
                  </p>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="showLastSeen"
                      checked={privacy.showLastSeen}
                      onChange={handlePrivacyChange}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">Показывать дату последнего входа</span>
                  </label>
                  <p className="checkbox-description">
                    Отображать, когда вы последний раз были на сайте
                  </p>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="showBalance"
                      checked={privacy.showBalance}
                      onChange={handlePrivacyChange}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">Показывать баланс</span>
                  </label>
                  <p className="checkbox-description">
                    Отображать сумму на вашем балансе другим пользователям
                  </p>
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="showReviews"
                      checked={privacy.showReviews}
                      onChange={handlePrivacyChange}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">Показывать отзывы</span>
                  </label>
                  <p className="checkbox-description">
                    Показывать отзывы о вас как о покупателе/продавце
                  </p>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <Button
                type="submit"
                variant="primary"
                icon={<FaSave />}
                isLoading={saving}
              >
                Сохранить настройки приватности
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SettingsForm;