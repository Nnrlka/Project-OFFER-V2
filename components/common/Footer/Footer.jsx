import React from 'react';
import { Link } from 'react-router-dom';
import { FaTelegram, FaVk, FaGithub, FaEnvelope, FaShieldAlt, FaLock } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/marketplace', label: 'Маркетплейс' },
    { path: '/rules', label: 'Правила' },
    { path: '/tutorial', label: 'Обучение' },
    { path: '/support', label: 'Поддержка' },
  ];

  const legalLinks = [
    { path: '/terms', label: 'Пользовательское соглашение' },
    { path: '/privacy', label: 'Политика конфиденциальности' },
    { path: '/cookie', label: 'Политика cookie' },
    { path: '/refund', label: 'Политика возвратов' },
  ];

  const socialLinks = [
    { icon: <FaTelegram />, label: 'Telegram', url: 'https://t.me/offer_marketplace' },
    { icon: <FaVk />, label: 'ВКонтакте', url: 'https://vk.com/offer_marketplace' },
    { icon: <FaGithub />, label: 'GitHub', url: 'https://github.com/offer-marketplace' },
    { icon: <FaEnvelope />, label: 'Email', url: 'mailto:support@offer.com' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        {/* Основной контент футера */}
        <div className="footer-main">
          {/* Бренд и описание */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">OFFER</span>
              <div className="logo-glow"></div>
            </div>
            <p className="footer-description">
              Современный маркетплейс цифровых товаров с гарантией безопасных сделок.
              Присоединяйтесь к сообществу, которому доверяют.
            </p>
            <div className="security-badges">
              <div className="badge">
                <FaLock /> Безопасные сделки
              </div>
              <div className="badge">
                <FaShieldAlt /> Гарантия возврата
              </div>
            </div>
          </div>

          {/* Быстрые ссылки */}
          <div className="footer-section">
            <h3 className="footer-title">Быстрые ссылки</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Юридическая информация */}
          <div className="footer-section">
            <h3 className="footer-title">Юридическая информация</h3>
            <ul className="footer-links">
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты и социальные сети */}
          <div className="footer-section">
            <h3 className="footer-title">Свяжитесь с нами</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-label">Поддержка:</span>
                <a href="mailto:support@offer.com" className="contact-value">
                  support@offer.com
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Для бизнеса:</span>
                <a href="mailto:partners@offer.com" className="contact-value">
                  partners@offer.com
                </a>
              </div>
            </div>
            
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className="footer-bottom">
          <div className="copyright">
            © {currentYear} OFFER Marketplace. Все права защищены.
          </div>
          
          <div className="footer-disclaimer">
            OFFER выступает посредником между покупателем и продавцом.
            Мы не являемся стороной сделки.
          </div>
          
          <div className="payment-methods">
            <div className="payment-text">Принимаем:</div>
            <div className="payment-icons">
              <span className="payment-icon">💳</span>
              <span className="payment-icon">₿</span>
              <span className="payment-icon">ЮMoney</span>
              <span className="payment-icon">СБП</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;