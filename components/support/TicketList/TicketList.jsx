import React, { useState, useEffect } from 'react';
import { FaEye, FaComment, FaCheck, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../common/Button/Button';
import { formatDate } from '../../../utils/formatters';
import './TicketList.css';

const TicketList = ({ filter = 'all' }) => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock данные
  useEffect(() => {
    const mockTickets = [
      {
        id: 'TICKET-001',
        title: 'Проблема с покупкой',
        category: 'Техническая проблема',
        status: 'open',
        priority: 'high',
        createdAt: '2024-01-15T14:30:00Z',
        updatedAt: '2024-01-15T14:30:00Z',
        lastMessage: 'Здравствуйте, не могу завершить покупку...',
        unreadMessages: 2,
      },
      {
        id: 'TICKET-002',
        title: 'Вопрос по заказу #12345',
        category: 'Вопрос по заказу',
        status: 'in_progress',
        priority: 'medium',
        createdAt: '2024-01-14T10:15:00Z',
        updatedAt: '2024-01-14T11:30:00Z',
        lastMessage: 'Спасибо за ответ! Буду ждать...',
        unreadMessages: 0,
      },
      {
        id: 'TICKET-003',
        title: 'Возврат средств',
        category: 'Возврат средств',
        status: 'resolved',
        priority: 'high',
        createdAt: '2024-01-10T16:45:00Z',
        updatedAt: '2024-01-12T09:20:00Z',
        lastMessage: 'Деньги вернулись, спасибо!',
        unreadMessages: 0,
      },
    ];

    // Фильтрация
    let filtered = mockTickets;
    if (filter !== 'all') {
      filtered = mockTickets.filter(ticket => ticket.status === filter);
    }

    setTickets(filtered);
    setLoading(false);
  }, [filter]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open':
        return <FaExclamationTriangle className="status-icon open" />;
      case 'in_progress':
        return <FaClock className="status-icon in-progress" />;
      case 'resolved':
        return <FaCheck className="status-icon resolved" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'open':
        return 'Открыт';
      case 'in_progress':
        return 'В работе';
      case 'resolved':
        return 'Решён';
      default:
        return status;
    }
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      low: { label: 'Низкий', class: 'priority-low' },
      medium: { label: 'Средний', class: 'priority-medium' },
      high: { label: 'Высокий', class: 'priority-high' },
      critical: { label: 'Критический', class: 'priority-critical' },
    };
    
    const badge = badges[priority] || badges.medium;
    return (
      <span className={`priority-badge ${badge.class}`}>
        {badge.label}
      </span>
    );
  };

  const handleViewTicket = (ticketId) => {
    console.log('View ticket:', ticketId);
    // TODO: Открыть детали тикета
  };

  const handleReply = (ticketId) => {
    console.log('Reply to ticket:', ticketId);
    // TODO: Открыть чат тикета
  };

  if (loading) {
    return (
      <div className="tickets-loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="tickets-empty">
        <div className="empty-icon">📭</div>
        <h3>Обращений нет</h3>
        <p>У вас пока нет обращений в поддержку</p>
      </div>
    );
  }

  return (
    <div className="ticket-list">
      {tickets.map((ticket) => (
        <div key={ticket.id} className="ticket-item">
          <div className="ticket-header">
            <div className="ticket-info">
              <div className="ticket-id">{ticket.id}</div>
              <div className="ticket-category">{ticket.category}</div>
              {getPriorityBadge(ticket.priority)}
            </div>
            
            <div className="ticket-status">
              {getStatusIcon(ticket.status)}
              <span className={`status-text status-${ticket.status}`}>
                {getStatusText(ticket.status)}
              </span>
            </div>
          </div>

          <div className="ticket-body">
            <h3 className="ticket-title">{ticket.title}</h3>
            <p className="ticket-preview">{ticket.lastMessage}</p>
            
            <div className="ticket-meta">
              <span className="ticket-date">
                Создан: {formatDate(ticket.createdAt)}
              </span>
              {ticket.unreadMessages > 0 && (
                <span className="unread-badge">
                  {ticket.unreadMessages} новое сообщение
                </span>
              )}
            </div>
          </div>

          <div className="ticket-actions">
            <Button
              size="small"
              icon={<FaEye />}
              onClick={() => handleViewTicket(ticket.id)}
            >
              Просмотр
            </Button>
            
            {ticket.status !== 'resolved' && (
              <Button
                variant="primary"
                size="small"
                icon={<FaComment />}
                onClick={() => handleReply(ticket.id)}
              >
                Ответить
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList;