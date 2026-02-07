import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';
import LoginForm from '../../components/auth/LoginForm/LoginForm';
import RegisterForm from '../../components/auth/RegisterForm/RegisterForm';
import Button from '../../components/common/Button/Button';
import './Auth.css';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);

  // Определяем активную вкладку из query параметров
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'register' || tab === 'login') {
      setActiveTab(tab);
    }
  }, [location]);

  const tabs = [
    { id: 'login', label: 'Вход', icon: <FaUser /> },
    { id: 'register', label: 'Регистрация', icon: <FaShieldAlt /> },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/auth?tab=${tabId}`, { replace: true });
  };

  const handleSocialAuth = (provider) => {
    // TODO: Реализовать социальную авторизацию
    console.log(`Social auth with ${provider}`);
  };

  return (
    <div className="auth-page page">
      <div className="container">
        <div className="auth-container">
          {/* Левая часть - информация */}
          <div className="auth-info">
            <div className="auth-brand">
              <h1 className="auth-title">OFFER</h1>
              <p className="auth-subtitle">Современный маркетплейс</p>
            </div>
            
            <div className="auth-features">
              <div className="feature">
                <div className="feature-icon">🔒</div>
                <div className="feature-content">
                  <h3>Безопасные сделки</h3>
                  <p>Гарантия возврата средств при спорах</p>
                </div>
              </div>
              
              <div className="feature">
                <div className="feature-icon">⚡</div>
                <div className="feature-content">
                  <h3>Мгновенные выплаты</h3>
                  <p>Вывод средств на любые карты</p>
                </div>
              </div>
              
              <div className="feature">
                <div className="feature-icon">👑</div>
                <div className="feature-content">
                  <h3>Проверенные продавцы</h3>
                  <p>Система рейтингов и отзывов</p>
                </div>
              </div>
            </div>
            
            <div className="auth-stats">
              <div className="stat">
                <div className="stat-number">10,000+</div>
                <div className="stat-label">пользователей</div>
              </div>
              <div className="stat">
                <div className="stat-number">99.8%</div>
                <div className="stat-label">положительных отзывов</div>
              </div>
            </div>
          </div>

          {/* Правая часть - формы */}
          <div className="auth-forms">
            <div className="auth-card glass-effect">
              {/* Вкладки */}
              <div className="auth-tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`auth-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Контент форм */}
              <div className="auth-content">
                {activeTab === 'login' ? (
                  <LoginForm />
                ) : (
                  <RegisterForm />
                )}
              </div>

              {/* Разделитель */}
              <div className="auth-divider">
                <span>или</span>
              </div>

              {/* Социальная авторизация */}
              <div className="social-auth">
                <h4>Войти через</h4>
                <div className="social-buttons">
                  <Button
                    variant="outline"
                    onClick={() => handleSocialAuth('google')}
                    className="social-btn"
                  >
                    <img 
                      src="https://www.google.com/favicon.ico" 
                      alt="Google"
                      className="social-icon"
                    />
                    Google
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleSocialAuth('vk')}
                    className="social-btn"
                  >
                    <img 
                      src="https://vk.com/favicon.ico" 
                      alt="VK"
                      className="social-icon"
                    />
                    VK
                  </Button>
                </div>
              </div>

              {/* Ссылки */}
              <div className="auth-links">
                <a href="/forgot-password" className="auth-link">
                  Забыли пароль?
                </a>
                <a href="/rules" className="auth-link">
                  Правила использования
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;