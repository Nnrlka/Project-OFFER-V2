import React, { useState } from 'react';
import { FaTimes, FaUser, FaEnvelope, FaLock, FaGoogle, FaGithub } from 'react-icons/fa';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import Button from '../../common/Button/Button';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login');

  if (!isOpen) return null;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLoginSuccess = () => {
    onClose();
  };

  const handleRegisterSuccess = () => {
    setActiveTab('login');
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // TODO: Implement social login
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-logo">
            <span className="logo-text">OFFER</span>
            <div className="logo-glow"></div>
          </div>
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabChange('login')}
          >
            <FaLock /> Вход
          </button>
          <button
            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => handleTabChange('register')}
          >
            <FaUser /> Регистрация
          </button>
        </div>

        {/* Social Login */}
        <div className="social-login">
          <p className="social-label">Войти через:</p>
          <div className="social-buttons">
            <Button
              variant="outline"
              icon={<FaGoogle />}
              onClick={() => handleSocialLogin('google')}
              className="social-btn google"
            >
              Google
            </Button>
            <Button
              variant="outline"
              icon={<FaGithub />}
              onClick={() => handleSocialLogin('github')}
              className="social-btn github"
            >
              GitHub
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="divider">
          <span>или</span>
        </div>

        {/* Content */}
        <div className="modal-content">
          {activeTab === 'login' ? (
            <LoginForm onSuccess={handleLoginSuccess} switchToRegister={() => handleTabChange('register')} />
          ) : (
            <RegisterForm onSuccess={handleRegisterSuccess} switchToLogin={() => handleTabChange('login')} />
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <p className="terms-text">
            Нажимая "Войти" или "Зарегистрироваться", вы соглашаетесь с{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              Условиями использования
            </a>{' '}
            и{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              Политикой конфиденциальности
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;