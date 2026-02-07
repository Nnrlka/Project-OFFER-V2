import React, { useState, useEffect } from 'react';
import {
  FaChartLine,
  FaBox,
  FaShoppingCart,
  FaMoneyBill,
  FaStar,
  FaUsers,
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
  FaFilter,
  FaDownload
} from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import Card from '../../common/Card/Card';
import Button from '../../common/Button/Button';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import { formatPrice, formatDate } from '../../../utils/formatters';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [timeRange, setTimeRange] = useState('month');

  // Mock данные для продавца
  useEffect(() => {
    const mockStats = {
      totalSales: 150000,
      totalOrders: 42,
      activeProducts: 18,
      averageRating: 4.8,
      pendingBalance: 25000,
      availableBalance: 75000,
      conversionRate: 3.2,
      refundRate: 1.5,
      salesGrowth: 15.3,
      orderGrowth: -2.1,
    };

    const mockOrders = [
      {
        id: 'ORD-001',
        product: 'Steam аккаунт CS:GO',
        buyer: 'Иван Петров',
        amount: 24999,
        status: 'completed',
        date: '2024-01-20T14:30:00Z',
      },
      {
        id: 'ORD-002',
        product: 'WoW Gold 1000',
        buyer: 'Алексей Смирнов',
        amount: 1500,
        status: 'processing',
        date: '2024-01-20T12:15:00Z',
      },
      {
        id: 'ORD-003',
        product: 'Windows 11 Pro ключ',
        buyer: 'Мария Иванова',
        amount: 2999,
        status: 'pending',
        date: '2024-01-20T10:45:00Z',
      },
      {
        id: 'ORD-004',
        product: 'Дизайн логотипа',
        buyer: 'ООО "ТехноПро"',
        amount: 5000,
        status: 'disputed',
        date: '2024-01-19T16:20:00Z',
      },
    ];

    const mockProducts = [
      {
        id: '1',
        title: 'Steam аккаунт CS:GO',
        sales: 24,
        revenue: 599976,
        stock: 3,
        rating: 4.9,
      },
      {
        id: '2',
        title: 'WoW Gold 1000',
        sales: 156,
        revenue: 234000,
        stock: 50,
        rating: 4.8,
      },
      {
        id: '3',
        title: 'Windows 11 Pro ключ',
        sales: 32,
        revenue: 95968,
        stock: 18,
        rating: 4.7,
      },
    ];

    setTimeout(() => {
      setStats(mockStats);
      setRecentOrders(mockOrders);
      setTopProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleWithdraw = () => {
    console.log('Withdraw initiated');
    // TODO: Реализовать вывод средств
  };

  const handleAddProduct = () => {
    console.log('Add product');
    // TODO: Переход на страницу добавления товара
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: { label: 'Завершен', className: 'status-completed' },
      processing: { label: 'В обработке', className: 'status-processing' },
      pending: { label: 'Ожидает', className: 'status-pending' },
      disputed: { label: 'Спор', className: 'status-disputed' },
    };

    const badge = badges[status] || badges.pending;
    return <span className={`status-badge ${badge.className}`}>{badge.label}</span>;
  };

  if (loading) {
    return (
      <div className="seller-dashboard-loading">
        <LoadingSpinner size="large" />
        <p>Загрузка данных...</p>
      </div>
    );
  }

  return (
    <div className="seller-dashboard">
      {/* Приветствие и быстрые действия */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1 className="dashboard-title">
            Добро пожаловать, {user?.username}!
          </h1>
          <p className="dashboard-subtitle">
            Вот обзор вашей деятельности за последний месяц
          </p>
        </div>
        <div className="header-actions">
          <Button
            variant="primary"
            icon={<FaMoneyBill />}
            onClick={handleWithdraw}
          >
            Вывод средств
          </Button>
          <Button
            variant="outline"
            icon={<FaBox />}
            onClick={handleAddProduct}
          >
            Добавить товар
          </Button>
        </div>
      </div>

      {/* Основная статистика */}
      <div className="stats-grid">
        <Card variant="primary" hoverable className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">
              <FaMoneyBill />
            </div>
            <div className="stat-details">
              <div className="stat-value">{formatPrice(stats.totalSales)}</div>
              <div className="stat-label">Общая выручка</div>
              <div className={`stat-change ${stats.salesGrowth >= 0 ? 'positive' : 'negative'}`}>
                {stats.salesGrowth >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                {Math.abs(stats.salesGrowth)}%
              </div>
            </div>
          </div>
        </Card>

        <Card variant="secondary" hoverable className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">
              <FaShoppingCart />
            </div>
            <div className="stat-details">
              <div className="stat-value">{stats.totalOrders}</div>
              <div className="stat-label">Всего заказов</div>
              <div className={`stat-change ${stats.orderGrowth >= 0 ? 'positive' : 'negative'}`}>
                {stats.orderGrowth >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                {Math.abs(stats.orderGrowth)}%
              </div>
            </div>
          </div>
        </Card>

        <Card variant="success" hoverable className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">
              <FaBox />
            </div>
            <div className="stat-details">
              <div className="stat-value">{stats.activeProducts}</div>
              <div className="stat-label">Активных товаров</div>
              <div className="stat-extra">
                {stats.conversionRate}% конверсия
              </div>
            </div>
          </div>
        </Card>

        <Card variant="info" hoverable className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">
              <FaStar />
            </div>
            <div className="stat-details">
              <div className="stat-value">{stats.averageRating}</div>
              <div className="stat-label">Средний рейтинг</div>
              <div className="stat-extra">
                На основе 127 отзывов
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Балансы */}
      <div className="balances-section">
        <Card className="balance-card">
          <div className="balance-header">
            <h3 className="balance-title">
              <FaMoneyBill /> Баланс
            </h3>
            <div className="time-range-selector">
              <Button
                size="small"
                variant={timeRange === 'week' ? 'primary' : 'outline'}
                onClick={() => setTimeRange('week')}
              >
                Неделя
              </Button>
              <Button
                size="small"
                variant={timeRange === 'month' ? 'primary' : 'outline'}
                onClick={() => setTimeRange('month')}
              >
                Месяц
              </Button>
              <Button
                size="small"
                variant={timeRange === 'year' ? 'primary' : 'outline'}
                onClick={() => setTimeRange('year')}
              >
                Год
              </Button>
            </div>
          </div>
          
          <div className="balance-details">
            <div className="balance-item available">
              <div className="balance-label">Доступно для вывода</div>
              <div className="balance-amount">{formatPrice(stats.availableBalance)}</div>
              <div className="balance-action">
                <Button size="small" onClick={handleWithdraw}>
                  Вывести
                </Button>
              </div>
            </div>
            
            <div className="balance-item pending">
              <div className="balance-label">На удержании</div>
              <div className="balance-amount">{formatPrice(stats.pendingBalance)}</div>
              <div className="balance-info">
                Доступно через 24 часа
              </div>
            </div>
            
            <div className="balance-item total">
              <div className="balance-label">Общий баланс</div>
              <div className="balance-amount">
                {formatPrice(stats.availableBalance + stats.pendingBalance)}
              </div>
              <div className="balance-trend">
                <FaChartLine /> +15% за месяц
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Недавние заказы и популярные товары */}
      <div className="dashboard-content">
        {/* Недавние заказы */}
        <Card className="recent-orders-card">
          <div className="card-header">
            <div className="card-header-content">
              <h3 className="card-title">
                <FaShoppingCart /> Недавние заказы
              </h3>
              <p className="card-subtitle">
                Последние 5 заказов
              </p>
            </div>
            <Button variant="outline" size="small" icon={<FaFilter />}>
              Фильтр
            </Button>
          </div>
          
          <div className="orders-table">
            <div className="table-header">
              <div className="table-col">ID заказа</div>
              <div className="table-col">Товар</div>
              <div className="table-col">Покупатель</div>
              <div className="table-col">Сумма</div>
              <div className="table-col">Статус</div>
              <div className="table-col">Дата</div>
            </div>
            
            <div className="table-body">
              {recentOrders.map((order) => (
                <div key={order.id} className="table-row">
                  <div className="table-col order-id">{order.id}</div>
                  <div className="table-col product-name">{order.product}</div>
                  <div className="table-col buyer-name">{order.buyer}</div>
                  <div className="table-col order-amount">{formatPrice(order.amount)}</div>
                  <div className="table-col order-status">
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="table-col order-date">{formatDate(order.date)}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card-footer">
            <Button variant="outline" size="small" icon={<FaDownload />}>
              Экспорт в CSV
            </Button>
            <Button variant="primary" size="small">
              Все заказы
            </Button>
          </div>
        </Card>

        {/* Популярные товары */}
        <Card className="top-products-card">
          <div className="card-header">
            <div className="card-header-content">
              <h3 className="card-title">
                <FaChartLine /> Популярные товары
              </h3>
              <p className="card-subtitle">
                Товары с наибольшей выручкой
              </p>
            </div>
          </div>
          
          <div className="products-list">
            {topProducts.map((product) => (
              <div key={product.id} className="product-item">
                <div className="product-info">
                  <h4 className="product-title">{product.title}</h4>
                  <div className="product-stats">
                    <span className="stat">
                      <FaShoppingCart /> {product.sales} продаж
                    </span>
                    <span className="stat">
                      <FaStar /> {product.rating}
                    </span>
                    <span className="stat">
                      <FaBox /> {product.stock} в наличии
                    </span>
                  </div>
                </div>
                <div className="product-revenue">
                  <div className="revenue-amount">{formatPrice(product.revenue)}</div>
                  <div className="revenue-label">Выручка</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="card-footer">
            <Button variant="outline" size="small">
              Управление товарами
            </Button>
            <Button variant="primary" size="small">
              Аналитика продаж
            </Button>
          </div>
        </Card>
      </div>

      {/* Быстрые действия */}
      <Card className="quick-actions-card">
        <h3 className="card-title">Быстрые действия</h3>
        <div className="quick-actions-grid">
          <Button variant="outline" className="quick-action" icon={<FaBox />}>
            Добавить товар
          </Button>
          <Button variant="outline" className="quick-action" icon={<FaCalendarAlt />}>
            График поставок
          </Button>
          <Button variant="outline" className="quick-action" icon={<FaUsers />}>
            Отзывы покупателей
          </Button>
          <Button variant="outline" className="quick-action" icon={<FaChartLine />}>
            Детальная аналитика
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SellerDashboard;