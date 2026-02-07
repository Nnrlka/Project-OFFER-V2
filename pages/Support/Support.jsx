import React, { useState } from 'react';
import { FaTicketAlt, FaSearch, FaFilter, FaPlus } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import TicketForm from '../../components/support/TicketForm/TicketForm';
import TicketList from '../../components/support/TicketList/TicketList';
import Button from '../../components/common/Button/Button';
import './Support.css';

const Support = () => {
  const { user } = useAuth();
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Все обращения' },
    { id: 'open', label: 'Открытые' },
    { id: 'in_progress', label: 'В работе' },
    { id: 'resolved', label: 'Решённые' },
  ];

  const handleCreateTicket = (ticketData) => {
    console.log('Creating ticket:', ticketData);
    setShowNewTicket(false);
    // TODO: Отправить на сервер
  };

  return (
    <div className="support-page page">
      <div className="container">
        <div className="support-header">
          <div className="header-left">
            <h1 className="page-title">
              <FaTicketAlt /> Поддержка
            </h1>
            <p className="page-subtitle">
              Получите помощь по любым вопросам
            </p>
          </div>
          
          <div className="header-right">
            <Button
              variant="primary"
              icon={<FaPlus />}
              onClick={() => setShowNewTicket(true)}
            >
              Новое обращение
            </Button>
          </div>
        </div>

        <div className="support-content">
          {/* Фильтры */}
          <div className="support-filters">
            <div className="filter-buttons">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            
            <div className="search-box">
              <FaSearch />
              <input 
                type="text" 
                placeholder="Поиск по тикетам..." 
                className="search-input"
              />
            </div>
          </div>

          {/* Основной контент */}
          <div className="support-main">
            <div className="tickets-section">
              <h2 className="section-title">Мои обращения</h2>
              <TicketList filter={activeFilter} />
            </div>
            
            <div className="faq-section">
              <h2 className="section-title">Частые вопросы</h2>
              <div className="faq-list">
                <div className="faq-item">
                  <h3>Как вернуть деньги?</h3>
                  <p>Откройте спор в течение 48 часов после получения товара.</p>
                </div>
                <div className="faq-item">
                  <h3>Сколько выводятся средства?</h3>
                  <p>1-24 часа в зависимости от способа вывода.</p>
                </div>
                <div className="faq-item">
                  <h3>Как стать продавцом?</h3>
                  <p>Пройти верификацию в профиле и сдать тест на знание правил.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно создания тикета */}
      {showNewTicket && (
        <div className="modal-overlay">
          <div className="modal-content">
            <TicketForm 
              onSubmit={handleCreateTicket}
              onClose={() => setShowNewTicket(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;