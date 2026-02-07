import React, { useState } from 'react';
import { FaSearch, FaFilter, FaEye, FaCheck, FaTimes, FaMoneyBill, FaComment } from 'react-icons/fa';
import Button from '../../common/Button/Button';
import Modal from '../../common/Modal/Modal';
import { formatDate } from '../../../utils/formatters';
import './DisputeManager.css';

const DisputeManager = () => {
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [filter, setFilter] = useState('all');

  const disputes = [
    {
      id: 'D-001',
      orderId: 'ORD-12345',
      buyer: { id: 'user1', username: 'Иван Иванов', email: 'ivan@example.com' },
      seller: { id: 'seller1', username: 'GameMaster', email: 'seller@example.com' },
      product: { title: 'Steam аккаунт CS:GO', price: 24999 },
      amount: 24999,
      reason: 'Товар не соответствует описанию',
      description: 'В описании указаны ножи, но в аккаунте их нет.',
      buyerEvidence: ['screenshot1.jpg'],
      sellerEvidence: ['proof.txt'],
      status: 'open',
      createdAt: '2024-01-15T14:30:00Z',
      updatedAt: '2024-01-15T14:30:00Z',
    },
    {
      id: 'D-002',
      orderId: 'ORD-12346',
      buyer: { id: 'user2', username: 'Петр Петров', email: 'petr@example.com' },
      seller: { id: 'seller2', username: 'SoftKeys', email: 'soft@example.com' },
      product: { title: 'Windows 11 Pro ключ', price: 2999 },
      amount: 2999,
      reason: 'Ключ не активируется',
      description: 'Ключ выдает ошибку при активации. Пробовал на нескольких ПК.',
      buyerEvidence: ['error_screenshot.png'],
      sellerEvidence: [],
      status: 'under_review',
      createdAt: '2024-01-14T10:15:00Z',
      updatedAt: '2024-01-14T11:30:00Z',
    },
  ];

  const filters = [
    { id: 'all', label: 'Все споры' },
    { id: 'open', label: 'Открытые' },
    { id: 'under_review', label: 'На рассмотрении' },
    { id: 'resolved', label: 'Решённые' },
  ];

  const filteredDisputes = disputes.filter(dispute => 
    filter === 'all' || dispute.status === filter
  );

  const handleResolveDispute = (disputeId, decision, comment) => {
    console.log(`Решение по спору ${disputeId}: ${decision}`, comment);
    // TODO: Отправить решение на сервер
    setShowDisputeModal(false);
  };

  const DisputeModal = () => (
    <Modal
      isOpen={showDisputeModal}
      onClose={() => setShowDisputeModal(false)}
      title={`Спор #${selectedDispute?.id}`}
      size="large"
    >
      {selectedDispute && (
        <div className="dispute-details-modal">
          {/* Информация о споре */}
          <div className="dispute-info-section">
            <h3>Информация о споре</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Заказ:</span>
                <span className="value">{selectedDispute.orderId}</span>
              </div>
              <div className="info-item">
                <span className="label">Товар:</span>
                <span className="value">{selectedDispute.product.title}</span>
              </div>
              <div className="info-item">
                <span className="label">Сумма:</span>
                <span className="value">{selectedDispute.amount.toLocaleString()} ₽</span>
              </div>
              <div className="info-item">
                <span className="label">Причина:</span>
                <span className="value">{selectedDispute.reason}</span>
              </div>
              <div className="info-item">
                <span className="label">Создан:</span>
                <span className="value">{formatDate(selectedDispute.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Стороны спора */}
          <div className="parties-section">
            <div className="party-card buyer">
              <h4>Покупатель</h4>
              <div className="party-info">
                <div className="party-name">{selectedDispute.buyer.username}</div>
                <div className="party-email">{selectedDispute.buyer.email}</div>
              </div>
            </div>
            
            <div className="party-card seller">
              <h4>Продавец</h4>
              <div className="party-info">
                <div className="party-name">{selectedDispute.seller.username}</div>
                <div className="party-email">{selectedDispute.seller.email}</div>
              </div>
            </div>
          </div>

          {/* Описание проблемы */}
          <div className="description-section">
            <h4>Описание проблемы от покупателя:</h4>
            <div className="description-content">
              {selectedDispute.description}
            </div>
          </div>

          {/* Доказательства */}
          <div className="evidence-section">
            <h4>Доказательства</h4>
            <div className="evidence-grid">
              {selectedDispute.buyerEvidence.length > 0 && (
                <div className="evidence-list">
                  <h5>От покупателя:</h5>
                  <div className="files-list">
                    {selectedDispute.buyerEvidence.map((file, index) => (
                      <div key={index} className="file-item">
                        <FaEye /> {file}
                        <Button size="small">Просмотреть</Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedDispute.sellerEvidence.length > 0 && (
                <div className="evidence-list">
                  <h5>От продавца:</h5>
                  <div className="files-list">
                    {selectedDispute.sellerEvidence.map((file, index) => (
                      <div key={index} className="file-item">
                        <FaEye /> {file}
                        <Button size="small">Просмотреть</Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Принятие решения */}
          <div className="resolution-section">
            <h4>Принятие решения</h4>
            <div className="resolution-options">
              <div className="option-group">
                <h5>Решение:</h5>
                <div className="option-buttons">
                  <Button
                    variant="success"
                    icon={<FaCheck />}
                    onClick={() => handleResolveDispute(selectedDispute.id, 'refund_buyer', '')}
                  >
                    Вернуть деньги покупателю
                  </Button>
                  <Button
                    variant="warning"
                    icon={<FaMoneyBill />}
                    onClick={() => handleResolveDispute(selectedDispute.id, 'partial_refund', '')}
                  >
                    Частичный возврат
                  </Button>
                  <Button
                    variant="danger"
                    icon={<FaTimes />}
                    onClick={() => handleResolveDispute(selectedDispute.id, 'close_no_refund', '')}
                  >
                    Отклонить спор
                  </Button>
                </div>
              </div>

              <div className="comment-group">
                <h5>Комментарий для сторон:</h5>
                <textarea
                  className="comment-textarea"
                  placeholder="Опишите причины принятого решения..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );

  return (
    <div className="dispute-manager">
      <div className="manager-header">
        <h2 className="section-title">Управление спорами</h2>
        
        <div className="header-controls">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Поиск по ID спора или заказа..." className="search-input" />
          </div>
          
          <div className="filter-buttons">
            {filters.map((filterItem) => (
              <button
                key={filterItem.id}
                className={`filter-btn ${filter === filterItem.id ? 'active' : ''}`}
                onClick={() => setFilter(filterItem.id)}
              >
                {filterItem.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="disputes-table">
        <div className="table-header">
          <div className="col-id">ID</div>
          <div className="col-order">Заказ</div>
          <div className="col-parties">Стороны</div>
          <div className="col-amount">Сумма</div>
          <div className="col-reason">Причина</div>
          <div className="col-status">Статус</div>
          <div className="col-date">Дата</div>
          <div className="col-actions">Действия</div>
        </div>

        {filteredDisputes.map((dispute) => (
          <div key={dispute.id} className="table-row">
            <div className="col-id">
              <span className="dispute-id">{dispute.id}</span>
            </div>
            
            <div className="col-order">
              <div className="order-info">
                <div className="order-id">{dispute.orderId}</div>
                <div className="product-name">{dispute.product.title}</div>
              </div>
            </div>
            
            <div className="col-parties">
              <div className="parties-info">
                <div className="party buyer">
                  <span className="party-label">П:</span>
                  {dispute.buyer.username}
                </div>
                <div className="party seller">
                  <span className="party-label">П:</span>
                  {dispute.seller.username}
                </div>
              </div>
            </div>
            
            <div className="col-amount">
              {dispute.amount.toLocaleString()} ₽
            </div>
            
            <div className="col-reason">
              <div className="reason-text" title={dispute.reason}>
                {dispute.reason}
              </div>
            </div>
            
            <div className="col-status">
              <span className={`status-badge status-${dispute.status}`}>
                {dispute.status === 'open' ? 'Открыт' : 
                 dispute.status === 'under_review' ? 'На рассмотрении' : 'Решён'}
              </span>
            </div>
            
            <div className="col-date">
              {formatDate(dispute.createdAt)}
            </div>
            
            <div className="col-actions">
              <div className="action-buttons">
                <Button
                  size="small"
                  icon={<FaEye />}
                  onClick={() => {
                    setSelectedDispute(dispute);
                    setShowDisputeModal(true);
                  }}
                  title="Просмотреть детали"
                />
                <Button
                  variant="outline"
                  size="small"
                  icon={<FaComment />}
                  onClick={() => console.log('Открыть чат спора')}
                  title="Открыть чат"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDisputeModal && <DisputeModal />}
    </div>
  );
};

export default DisputeManager;