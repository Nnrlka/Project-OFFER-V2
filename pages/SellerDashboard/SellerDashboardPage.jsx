import React, { useState } from 'react';
import { FaChartLine, FaBox, FaMoneyBillWave, FaUsers, FaPlus, FaCog, FaBell } from 'react-icons/fa';
import Button from '../../components/common/Button/Button';
import ProductForm from '../../components/seller/ProductForm/ProductForm';
import SalesTable from '../../components/seller/SalesTable/SalesTable';
import './SellerDashboardPage.css';

const SellerDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);

  const stats = {
    totalSales: 42,
    totalRevenue: 125000,
    activeProducts: 8,
    pendingOrders: 3,
    rating: 4.8,
    thisMonth: 25000
  };

  const tabs = [
    { id: 'dashboard', label: 'Дашборд', icon: <FaChartLine /> },
    { id: 'products', label: 'Товары', icon: <FaBox /> },
    { id: 'sales', label: 'Продажи', icon: <FaMoneyBillWave /> },
    { id: 'reviews', label: 'Отзывы', icon: <FaUsers /> },
    { id: 'settings', label: 'Настройки', icon: <FaCog /> },
  ];

  return (
    <div className="seller-dashboard-page page">
      <div className="container">
        {/* Хедер панели продавца */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1 className="page-title">Панель продавца</h1>
            <p className="page-subtitle">
              Управление товарами, заказами и финансами
            </p>
          </div>
          
          <div className="header-right">
            <Button
              variant="primary"
              icon={<FaPlus />}
              onClick={() => setShowProductForm(true)}
            >
              Добавить товар
            </Button>
            <Button variant="outline" icon={<FaBell />}>
              Уведомления
            </Button>
          </div>
        </div>

        <div className="dashboard-layout">
          {/* Боковая панель */}
          <div className="dashboard-sidebar">
            <div className="seller-info-card">
              <div className="seller-avatar">S</div>
              <div className="seller-info">
                <h3>GameMaster</h3>
                <p className="seller-email">seller@example.com</p>
                <div className="seller-rating">
                  <span className="rating-stars">★★★★★</span>
                  <span className="rating-value">4.8 (127)</span>
                </div>
              </div>
            </div>

            <nav className="dashboard-nav">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>

            <div className="sidebar-footer">
              <div className="seller-status">
                <div className="status-indicator active"></div>
                <span>Статус: Активен</span>
              </div>
              <div className="seller-balance">
                Баланс: <strong>12,500 ₽</strong>
              </div>
            </div>
          </div>

          {/* Основной контент */}
          <div className="dashboard-content">
            {/* Вкладка Дашборд */}
            {activeTab === 'dashboard' && (
              <div className="tab-content">
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-header">
                      <div className="stat-icon">
                        <FaMoneyBillWave />
                      </div>
                      <h3>Общая выручка</h3>
                    </div>
                    <div className="stat-value">{stats.totalRevenue.toLocaleString()} ₽</div>
                    <div className="stat-trend positive">+15% за месяц</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-header">
                      <div className="stat-icon">
                        <FaBox />
                      </div>
                      <h3>Активные товары</h3>
                    </div>
                    <div className="stat-value">{stats.activeProducts}</div>
                    <div className="stat-trend">3 на модерации</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-header">
                      <div className="stat-icon">
                        <FaChartLine />
                      </div>
                      <h3>Продаж за месяц</h3>
                    </div>
                    <div className="stat-value">{stats.thisMonth.toLocaleString()} ₽</div>
                    <div className="stat-trend positive">+8 заказов</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-header">
                      <div className="stat-icon">
                        <FaUsers />
                      </div>
                      <h3>Рейтинг</h3>
                    </div>
                    <div className="stat-value">{stats.rating}</div>
                    <div className="stat-trend">127 отзывов</div>
                  </div>
                </div>

                <div className="dashboard-sections">
                  <div className="section">
                    <h3 className="section-title">Недавние заказы</h3>
                    <SalesTable limit={5} />
                  </div>

                  <div className="section">
                    <h3 className="section-title">Статистика</h3>
                    <div className="chart-placeholder">
                      📊 График продаж за 30 дней
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Вкладка Товары */}
            {activeTab === 'products' && (
              <div className="tab-content">
                <div className="products-header">
                  <h2 className="section-title">Мои товары</h2>
                  <div className="products-filter">
                    <select className="filter-select">
                      <option>Все товары</option>
                      <option>Активные</option>
                      <option>На модерации</option>
                      <option>Архивные</option>
                    </select>
                  </div>
                </div>

                <div className="products-list">
                  <div className="product-item">
                    <div className="product-preview">
                      <div className="product-image">🖼️</div>
                      <div className="product-info">
                        <h4>Steam аккаунт CS:GO с ножами</h4>
                        <p>Цена: 24,999 ₽ • В наличии: 5</p>
                        <div className="product-status active">Активен</div>
                      </div>
                    </div>
                    <div className="product-actions">
                      <Button size="small">Редактировать</Button>
                      <Button variant="outline" size="small">
                        Статистика
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Вкладка Настройки */}
            {activeTab === 'settings' && (
              <div className="tab-content">
                <h2 className="section-title">Настройки продавца</h2>
                
                <div className="settings-form">
                  <div className="form-group">
                    <label>Метод выплат</label>
                    <select className="form-select">
                      <option>ЮMoney</option>
                      <option>Банковская карта</option>
                      <option>Криптовалюта</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Автоматические ответы</label>
                    <textarea 
                      className="form-textarea" 
                      placeholder="Шаблон ответа покупателям..."
                      rows={4}
                    />
                  </div>

                  <div className="form-group">
                    <label>Уведомления</label>
                    <div className="checkboxes">
                      <label className="checkbox-label">
                        <input type="checkbox" defaultChecked />
                        <span className="checkmark"></span>
                        Новые заказы
                      </label>
                      <label className="checkbox-label">
                        <input type="checkbox" defaultChecked />
                        <span className="checkmark"></span>
                        Новые отзывы
                      </label>
                      <label className="checkbox-label">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        Еженедельная статистика
                      </label>
                    </div>
                  </div>

                  <Button variant="primary">Сохранить настройки</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Модальное окно добавления товара */}
      {showProductForm && (
        <ProductForm onClose={() => setShowProductForm(false)} />
      )}
    </div>
  );
};

export default SellerDashboardPage;