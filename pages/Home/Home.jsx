import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import './Home.css';

const Home = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Анимация появления элементов при скролле
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: '10K+', label: 'Активных пользователей' },
    { value: '50K+', label: 'Успешных сделок' },
    { value: '99.8%', label: 'Положительных отзывов' },
    { value: '24/7', label: 'Поддержка' },
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Мгновенные сделки',
      description: 'Автоматизированная доставка цифровых товаров'
    },
    {
      icon: '🛡️',
      title: 'Полная гарантия',
      description: 'Деньги хранятся на гарантийном счете'
    },
    {
      icon: '🔒',
      title: 'Анонимность',
      description: 'Конфиденциальность всех операций'
    },
    {
      icon: '📈',
      title: 'Выгодные цены',
      description: 'Конкурентные предложения от проверенных продавцов'
    },
  ];

  const popularProducts = [
    {
      id: 1,
      title: 'Steam аккаунт CS2',
      category: 'Игры',
      price: 24999,
      seller: 'Verified Seller',
      rating: 4.9
    },
    {
      id: 2,
      title: 'Windows 11 Pro',
      category: 'Софт',
      price: 2999,
      seller: 'Microsoft Partner',
      rating: 4.7
    },
    {
      id: 3,
      title: 'Discord Nitro год',
      category: 'Подписки',
      price: 3999,
      seller: 'DigitalGoods',
      rating: 4.8
    },
    {
      id: 4,
      title: 'Spotify Premium',
      category: 'Подписки',
      price: 999,
      seller: 'MusicHub',
      rating: 4.5
    },
  ];

  return (
    <div className="home-page">
      {/* Hero секция */}
      <section className="hero-section" ref={heroRef}>
        <div className="container">
          <div className="hero-content animate-on-scroll">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="badge-text">2026</span>
                <span className="badge-glow"></span>
              </div>
              <h1 className="hero-title">
                <span className="title-line">Цифровая площадка</span>
                <span className="title-line accent">будущего</span>
              </h1>
              <p className="hero-description">
                OFFER — платформа для безопасных сделок с цифровыми товарами. 
                Анонимность, скорость, гарантии. Продавайте и покупайте с уверенностью.
              </p>
              <div className="hero-actions">
                <Link to="/marketplace">
                  <Button variant="primary" size="large">
                    Начать покупки
                  </Button>
                </Link>
                <Link to="/tutorial">
                  <Button variant="secondary" size="large">
                    Как это работает?
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="floating-cards">
                <div className="card card-1 glass">
                  <div className="card-glow"></div>
                  <div className="card-content">
                    <div className="card-badge">🔥</div>
                    <h3>Steam аккаунт</h3>
                    <p>CS2 с эксклюзивами</p>
                    <div className="card-price">24,999 ₽</div>
                  </div>
                </div>
                <div className="card card-2 glass">
                  <div className="card-glow"></div>
                  <div className="card-content">
                    <div className="card-badge">⚡</div>
                    <h3>Windows 11 Pro</h3>
                    <p>Лицензионный ключ</p>
                    <div className="card-price">2,999 ₽</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid animate-on-scroll">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item glass">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-glow" style={{ animationDelay: `${index * 0.1}s` }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Почему OFFER?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card glass animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Популярные товары */}
      <section className="products-section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Популярные товары</h2>
            <Link to="/marketplace" className="view-all">
              Смотреть все →
            </Link>
          </div>
          <div className="products-grid">
            {popularProducts.map((product, index) => (
              <div 
                key={product.id}
                className="product-card glass animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="product-header">
                  <span className="product-category">{product.category}</span>
                  <div className="product-rating">⭐ {product.rating}</div>
                </div>
                <h3 className="product-title">{product.title}</h3>
                <div className="product-seller">Продавец: {product.seller}</div>
                <div className="product-footer">
                  <div className="product-price">{product.price.toLocaleString()} ₽</div>
                  <Button variant="primary" size="small">Купить</Button>
                </div>
                <div className="product-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content glass animate-on-scroll">
            <h2>Готовы начать?</h2>
            <p>Присоединяйтесь к сообществу профессионалов</p>
            <div className="cta-actions">
              <Link to="/auth?tab=register">
                <Button variant="primary" size="large">Зарегистрироваться</Button>
              </Link>
              <Link to="/tutorial">
                <Button variant="secondary" size="large">Узнать больше</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;