import api from './api';

// Сохранение токенов
export const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

// Получение токенов
export const getTokens = () => {
  return {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  };
};

// Очистка токенов
export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// Проверка авторизации
export const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

// Получение данных пользователя из токена
export const getUserFromToken = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role || 'user',
      username: payload.username,
    };
  } catch {
    return null;
  }
};

// Обновление токенов
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');

    const response = await api.post('/auth/refresh', { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    
    setTokens(accessToken, newRefreshToken);
    return accessToken;
  } catch (error) {
    clearTokens();
    throw error;
  }
};

// Защита маршрутов по ролям
export const hasRole = (requiredRole, userRole) => {
  if (userRole === 'admin') return true;
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }
  return userRole === requiredRole;
};

// Проверка разрешений
export const checkPermission = (permission, user) => {
  const permissions = {
    user: ['view_products', 'purchase', 'create_ticket'],
    seller: ['add_products', 'manage_products', 'view_sales', 'withdraw_funds'],
    admin: ['manage_users', 'manage_disputes', 'view_analytics', 'manage_settings'],
  };

  const userPermissions = permissions[user?.role] || permissions.user;
  return userPermissions.includes(permission);
};

// Валидация email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Валидация пароля
export const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  
  return {
    isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers,
    minLength,
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
  };
};

// Форматирование роли для отображения
export const formatRole = (role) => {
  const roles = {
    user: 'Пользователь',
    seller: 'Продавец',
    admin: 'Администратор',
  };
  return roles[role] || role;
};

// Логирование действий пользователя
export const logUserAction = (action, metadata = {}) => {
  const user = getUserFromToken();
  const logEntry = {
    timestamp: new Date().toISOString(),
    userId: user?.id,
    userEmail: user?.email,
    action,
    ...metadata,
  };
  
  // В продакшене отправляем на сервер
  if (process.env.NODE_ENV === 'production') {
    console.log('User action logged:', logEntry);
    // api.post('/logs/user', logEntry);
  }
  
  return logEntry;
};