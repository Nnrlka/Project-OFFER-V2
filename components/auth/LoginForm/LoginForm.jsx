import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Button from '../../common/Button/Button';
import { validateEmail } from '../../../utils/validation';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибку при вводе
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        navigate('/profile');
      } else {
        setErrors({ general: result.error || 'Ошибка входа' });
      }
    } catch (error) {
      setErrors({ general: 'Произошла ошибка. Попробуйте позже.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    const demoCredentials = {
      user: { email: 'user@demo.com', password: 'demouser123' },
      seller: { email: 'seller@demo.com', password: 'demoseller123' },
      admin: { email: 'admin@demo.com', password: 'demoadmin123' },
    };
    
    setFormData(demoCredentials[role]);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {errors.general && (
        <div className="error-message">
          {errors.general}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          <FaEnvelope /> Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`form-input ${errors.email ? 'error' : ''}`}
          placeholder="your@email.com"
          disabled={isLoading}
        />
        {errors.email && (
          <span className="error-text">{errors.email}</span>
        )}
      </div>

      <div className="form-group">
        <div className="password-header">
          <label htmlFor="password" className="form-label">
            <FaLock /> Пароль
          </label>
          <a href="/forgot-password" className="forgot-password">
            Забыли пароль?
          </a>
        </div>
        <div className="password-input-wrapper">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            className={`form-input ${errors.password ? 'error' : ''}`}
            placeholder="Введите пароль"
            disabled={isLoading}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && (
          <span className="error-text">{errors.password}</span>
        )}
      </div>

      <div className="remember-me">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="remember"
            className="checkbox"
          />
          <span className="checkmark"></span>
          Запомнить меня
        </label>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="large"
        isLoading={isLoading}
        className="submit-btn"
      >
        Войти
      </Button>

      {/* Демо вход для разработки */}
      <div className="demo-login">
        <p className="demo-label">Демо доступ:</p>
        <div className="demo-buttons">
          <button
            type="button"
            className="demo-btn"
            onClick={() => handleDemoLogin('user')}
          >
            Пользователь
          </button>
          <button
            type="button"
            className="demo-btn"
            onClick={() => handleDemoLogin('seller')}
          >
            Продавец
          </button>
          <button
            type="button"
            className="demo-btn"
            onClick={() => handleDemoLogin('admin')}
          >
            Админ
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;