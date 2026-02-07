import React, { useState } from 'react';
import { FaEye, FaCheck, FaTimes, FaExclamationTriangle, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import Button from '../../common/Button/Button';
import { formatDate, formatPrice } from '../../../utils/formatters';
import './SalesTable.css';

const SalesTable = ({ limit, orders = [] }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  // Mock данные продаж
  const salesData = orders.length > 0 ? orders : [
    {
      id: 'ORD-001',
      product: 'Steam аккаунт CS:GO',
      buyer: 'Иван Иванов',
      price: 24999,
      fee: 1249.95,
      netAmount: 23749.05,
      status: 'completed',
      date: '2024-01-15T14:30:00Z',
      deliveryTime: '5 минут',
    },
    {
      id: 'ORD-002',
      product: 'Windows 11 Pro ключ',
      buyer: 'Петр Петров',
      price: 2999,
      fee: 149.95,
      netAmount: 2849.05,
      status: 'pending',
      date: '2024-01-14T10:15:00Z',
      deliveryTime: 'Ожидание',
    },
    {
      id: 'ORD-003',
      product: '1000 голды WoW',
      buyer: 'Сергей Сергеев',
      price: 1500,
      fee: 75,
      netAmount: 1425,
      status: 'disputed',
      date: '2024-01-13T16:45:00Z',
      deliveryTime: '15 минут',
    },
  ];

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FaCheck className="status-icon completed" />;
      case 'pending':
        return <FaExclamationTriangle className="status-icon pending" />;
      case 'disputed':
        return <FaTimes className="status-icon disputed" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Завершён';
      case 'pending':
        return 'В ожидании';
      case 'disputed':
        return 'Спор';
      default:
        return status;
    }
  };

  const handleViewDetails = (orderId) => {
    console.log('Просмотр деталей заказа:', orderId);
    // TODO: Открыть модалку с деталями заказа
  };

  const handleDeliver = (orderId) => {
    console.log('Доставить товар для заказа:', orderId);
    // TODO: Реализовать доставку товара
  };

  return (
    <div className="sales-table">
      <div className="table-header">
        <div className="header-row">
          <div className="col-id">
            <button className="sort-btn" onClick={() => handleSort('id')}>
              ID заказа
              {sortBy === 'id' && (
                sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />
              )}
            </button>
          </div>
          <div className="col-product">Товар</div>
          <div className="col-buyer">Покупатель</div>
          <div className="col-price">
            <button className="sort-btn" onClick={() => handleSort('price')}>
              Сумма
              {sortBy === 'price' && (
                sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />
              )}
            </button>
          </div>
          <div className="col-fee">Комиссия</div>
          <div className="col-net">К выплате</div>
          <div className="col-status">
            <button className="sort-btn" onClick={() => handleSort('status')}>
              Статус
              {sortBy === 'status' && (
                sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />
              )}
            </button>
          </div>
          <div className="col-date">
            <button className="sort-btn" onClick={() => handleSort('date')}>
              Дата
              {sortBy === 'date' && (
                sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />
              )}
            </button>
          </div>
          <div className="col-actions">Действия</div>
        </div>
      </div>

      <div className="table-body">
        {salesData.map((sale) => (
          <div key={sale.id} className="table-row">
            <div className="col-id">
              <span className="order-id">{sale.id}</span>
            </div>
            
            <div className="col-product">
              <div className="product-info">
                <div className="product-name">{sale.product}</div>
                <div className="delivery-time">{sale.deliveryTime}</div>
              </div>
            </div>
            
            <div className="col-buyer">
              <span className="buyer-name">{sale.buyer}</span>
            </div>
            
            <div className="col-price">
              <div className="price-amount">{formatPrice(sale.price)}</div>
            </div>
            
            <div className="col-fee">
              <div className="fee-amount">-{formatPrice(sale.fee)}</div>
              <div className="fee-percent">(5%)</div>
            </div>
            
            <div className="col-net">
              <div className="net-amount">{formatPrice(sale.netAmount)}</div>
            </div>
            
            <div className="col-status">
              <div className="status-info">
                {getStatusIcon(sale.status)}
                <span className={`status-text status-${sale.status}`}>
                  {getStatusText(sale.status)}
                </span>
              </div>
            </div>
            
            <div className="col-date">
              <div className="date-info">
                {formatDate(sale.date)}
              </div>
            </div>
            
            <div className="col-actions">
              <div className="action-buttons">
                <Button
                  size="small"
                  icon={<FaEye />}
                  onClick={() => handleViewDetails(sale.id)}
                  title="Просмотреть детали"
                />
                
                {sale.status === 'pending' && (
                  <Button
                    variant="primary"
                    size="small"
                    onClick={() => handleDeliver(sale.id)}
                    title="Доставить товар"
                  >
                    Доставить
                  </Button>
                )}
                
                {sale.status === 'disputed' && (
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => console.log('Открыть спор')}
                    title="Открыть спор"
                  >
                    Спор
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="table-footer">
        <div className="summary-row">
          <div className="summary-label">Итого:</div>
          <div className="summary-amount">{formatPrice(salesData.reduce((sum, sale) => sum + sale.price, 0))}</div>
          <div className="summary-fee">-{formatPrice(salesData.reduce((sum, sale) => sum + sale.fee, 0))}</div>
          <div className="summary-net">{formatPrice(salesData.reduce((sum, sale) => sum + sale.netAmount, 0))}</div>
          <div className="summary-empty"></div>
          <div className="summary-empty"></div>
          <div className="summary-empty"></div>
        </div>
      </div>
    </div>
  );
};

export default SalesTable;