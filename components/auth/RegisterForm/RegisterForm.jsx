import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa';
import Button from '../../common/Button/Button';
import { validateEmail, validatePassword, validateUsername } from '../../../utils/validation';
import './RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    receiveNews: true,
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
    
    if (!formData.username.trim()) {
      newErrors.username = 'Имя пользователя обязательно';
    } else if (!validateUsername(formData.username)) {
      newErrors.username = 'Имя пользователя должно быть от 3 до 20 символов (только буквы, цифры и _)';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Пароль должен быть не менее 8 символов';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Подтвердите пароль';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Необходимо согласие с правилами';
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
      // TODO: Заменить на реальный API вызов
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Симуляция успешной регистрации
      console.log('Registration data:', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        agreeToTerms: formData.agreeToTerms,
        receiveNews: formData.receiveNews,
      });
      
      // После успешной регистрации
      navigate('/auth?tab=login', { 
        state: { 
          registrationSuccess: true,
          email: formData.email 
        } 
      });
      
    } catch (error) {
      setErrors({ 
        general: error.message || 'Ошибка регистрации. Попробуйте позже.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = () => {
    const password = formData.password;
    if (!password) return { score: 0, label: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const labels = ['Слабый', 'Средний', 'Хороший', 'Отличный'];
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#6366f1'];
    
    return {
      score,
      label: labels[score - 1] || '',
      color: colors[score - 1] || '#ef4444',
      width: `${(score / 4) * 100}%`
    };
  };

  const strength = passwordStrength();

  return (
    <form onSubmit={handleSubmit} className="register-form">
      {errors.general && (
        <div className="error-message">
          {errors.general}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="username" className="form-label">
          <FaUser /> Имя пользователя
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          className={`form-input ${errors.username ? 'error' : ''}`}
          placeholder="Ваш никнейм"
          disabled={isLoading}
        />
        {errors.username && (
          <span className="error-text">{errors.username}</span>
        )}
      </div>

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
        <label htmlFor="password" className="form-label">
          <FaLock /> Пароль
        </label>
        <div className="password-input-wrapper">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            className={`form-input ${errors.password ? 'error' : ''}`}
            placeholder="Не менее 8 символов"
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
        
        {/* Индикатор сложности пароля */}
        {formData.password && (
          <div className="password-strength">
            <div className="strength-bar">
              <div 
                className="strength-fill" 
                style={{ 
                  width: strength.width,
                  backgroundColor: strength.color 
                }}
              ></div>
            </div>
            <div className="strength-label">
              Сложность: <span style={{ color: strength.color }}>
                {strength.label}
              </span>
            </div>
          </div>
        )}
        
        {errors.password && (
          <span className="error-text">{errors.password}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword" className="form-label">
          <FaCheck /> Подтвердите пароль
        </label>
        <div className="password-input-wrapper">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
            placeholder="Повторите пароль"
            disabled={isLoading}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={isLoading}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="error-text">{errors.confirmPassword}</span>
        )}
      </div>

      <div className="form-group checkboxes">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="checkbox"
            disabled={isLoading}
          />
          <span className={`checkmark ${errors.agreeToTerms ? 'error' : ''}`}></span>
          <span className="checkbox-text">
            Я соглашаюсь с{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              пользовательским соглашением
            </a>{' '}
            и{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              политикой конфиденциальности
            </a>
          </span>
        </label>
        {errors.agreeToTerms && (
          <span className="error-text">{errors.agreeToTerms}</span>
        )}

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="receiveNews"
            checked={formData.receiveNews}
            onChange={handleChange}
            className="checkbox"
            disabled={isLoading}
          />
          <span className="checkmark"></span>
          <span className="checkbox-text">
            Получать новости и специальные предложения
          </span>
        </label>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="large"
        isLoading={isLoading}
        className="submit-btn"
      >
        Зарегистрироваться
      </Button>

      <div className="registration-info">
        <p className="info-text">
          После регистрации вы получите письмо для подтверждения email.
          Без подтверждения некоторые функции будут недоступны.
        </p>
        
        <p className="info-text">
          Регистрируясь как продавец, вы соглашаетесь пройти верификацию
          и соблюдать правила маркетплейса.
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;