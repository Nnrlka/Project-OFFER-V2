import React, { useState, useRef, useEffect } from 'react';
import {
  FaPaperPlane,
  FaPaperclip,
  FaUser,
  FaUserShield,
  FaClock,
  FaCheck,
  FaCheckDouble,
  FaReply,
  FaEdit,
  FaTrash,
  FaSmile,
  FaImage
} from 'react-icons/fa';
import { useAuth } from '../../../../context/AuthContext';
import Button from '../../common/Button/Button';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import { formatDate, formatTimeAgo } from '../../../../utils/formatters';
import './TicketChat.css';

const TicketChat = ({ ticketId, onClose }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Mock данные для тикета
  useEffect(() => {
    const mockMessages = [
      {
        id: 'msg1',
        senderId: 'user1',
        senderName: 'Иван Петров',
        senderRole: 'user',
        senderAvatar: 'IP',
        text: 'Здравствуйте, у меня проблема с покупкой товара #12345',
        timestamp: '2024-01-20T10:30:00Z',
        isRead: true,
        isEdited: false,
      },
      {
        id: 'msg2',
        senderId: 'support1',
        senderName: 'Поддержка OFFER',
        senderRole: 'admin',
        senderAvatar: 'S',
        text: 'Здравствуйте, Иван! Расскажите подробнее о проблеме. Какая именно ошибка возникает при покупке?',
        timestamp: '2024-01-20T10:35:00Z',
        isRead: true,
        isEdited: false,
      },
      {
        id: 'msg3',
        senderId: 'user1',
        senderName: 'Иван Петров',
        senderRole: 'user',
        senderAvatar: 'IP',
        text: 'При нажатии на кнопку "Купить" выдает ошибку "Payment failed". Пытался уже 3 раза',
        timestamp: '2024-01-20T10:40:00Z',
        isRead: true,
        isEdited: true,
        attachments: ['screenshot.png'],
      },
      {
        id: 'msg4',
        senderId: 'support1',
        senderName: 'Поддержка OFFER',
        senderRole: 'admin',
        senderAvatar: 'S',
        text: 'Понял. Проверим ваш аккаунт. Возможно, проблема с верификацией платежа. Попробуйте использовать другой способ оплаты или проверьте баланс карты.',
        timestamp: '2024-01-20T10:45:00Z',
        isRead: true,
        isEdited: false,
      },
      {
        id: 'msg5',
        senderId: 'support1',
        senderName: 'Поддержка OFFER',
        senderRole: 'admin',
        senderAvatar: 'S',
        text: 'Также можете попробовать очистить кэш браузера или использовать инкогнито режим.',
        timestamp: '2024-01-20T10:46:00Z',
        isRead: false,
        isEdited: false,
      },
    ];

    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
      
      // Симуляция типинга поддержки
      setTimeout(() => setIsTyping(true), 1000);
      setTimeout(() => setIsTyping(false), 3000);
    }, 1000);
  }, [ticketId]);

  // Автоскролл к новым сообщениям
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() && attachments.length === 0) return;

    const newMsg = {
      id: `msg${Date.now()}`,
      senderId: user.id,
      senderName: user.username,
      senderRole: user.role,
      senderAvatar: user.username?.charAt(0).toUpperCase() || 'U',
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
      isRead: false,
      isEdited: false,
      attachments: attachments.map(file => file.name),
      replyTo: replyingTo,
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
    setAttachments([]);
    setReplyingTo(null);
    
    // Симуляция ответа поддержки
    if (user.role !== 'admin') {
      setTimeout(() => {
        const supportMsg = {
          id: `msg${Date.now() + 1}`,
          senderId: 'support1',
          senderName: 'Поддержка OFFER',
          senderRole: 'admin',
          senderAvatar: 'S',
          text: 'Получили ваше сообщение. Обрабатываем запрос...',
          timestamp: new Date().toISOString(),
          isRead: false,
          isEdited: false,
        };
        setMessages(prev => [...prev, supportMsg]);
      }, 2000);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain'];
      
      if (file.size > maxSize) {
        alert(`Файл ${file.name} слишком большой (максимум 5MB)`);
        return false;
      }
      
      if (!allowedTypes.includes(file.type)) {
        alert(`Тип файла ${file.name} не поддерживается`);
        return false;
      }
      
      return true;
    });
    
    setAttachments(prev => [...prev, ...validFiles]);
  };

  const handleRemoveAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleReply = (message) => {
    setReplyingTo(message);
    setEditingMessage(null);
  };

  const handleEdit = (message) => {
    setEditingMessage(message);
    setNewMessage(message.text);
    setReplyingTo(null);
  };

  const handleDelete = (messageId) => {
    if (window.confirm('Удалить это сообщение?')) {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    }
  };

  const renderSenderBadge = (role) => {
    const badges = {
      user: { label: 'Пользователь', className: 'badge-user' },
      seller: { label: 'Продавец', className: 'badge-seller' },
      admin: { label: 'Поддержка', className: 'badge-admin' },
    };
    
    const badge = badges[role] || badges.user;
    return <span className={`sender-badge ${badge.className}`}>{badge.label}</span>;
  };

  const renderMessageStatus = (isRead, senderId) => {
    if (senderId !== user.id) return null;
    
    return isRead ? (
      <span className="message-status read" title="Прочитано">
        <FaCheckDouble />
      </span>
    ) : (
      <span className="message-status sent" title="Отправлено">
        <FaCheck />
      </span>
    );
  };

  if (loading) {
    return (
      <div className="ticket-chat-loading">
        <LoadingSpinner size="large" />
        <p>Загрузка чата...</p>
      </div>
    );
  }

  return (
    <div className="ticket-chat">
      {/* Заголовок чата */}
      <div className="chat-header">
        <div className="chat-header-left">
          <Button
            size="small"
            variant="outline"
            onClick={onClose}
          >
            ← Назад
          </Button>
          <div className="chat-title">
            <h3>Тикет #{ticketId}</h3>
            <span className="chat-subtitle">Обсуждение проблемы</span>
          </div>
        </div>
        <div className="chat-header-right">
          <span className="chat-status open">Открыт</span>
          <Button size="small" variant="outline">
            Закрыть тикет
          </Button>
        </div>
      </div>

      {/* Контейнер сообщений */}
      <div className="chat-messages" ref={chatContainerRef}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-container ${
              message.senderId === user.id ? 'outgoing' : 'incoming'
            }`}
          >
            {/* Ответ на сообщение */}
            {message.replyTo && (
              <div className="message-reply">
                <div className="reply-content">
                  <strong>{message.replyTo.senderName}</strong>
                  <p>{message.replyTo.text}</p>
                </div>
              </div>
            )}

            {/* Основное сообщение */}
            <div className="message">
              {/* Аватар отправителя */}
              {message.senderId !== user.id && (
                <div className="message-avatar">
                  <div className="avatar-circle">
                    {message.senderAvatar}
                  </div>
                </div>
              )}

              {/* Содержимое сообщения */}
              <div className="message-content">
                {/* Заголовок сообщения */}
                <div className="message-header">
                  <span className="sender-name">{message.senderName}</span>
                  {renderSenderBadge(message.senderRole)}
                  <span className="message-time">
                    <FaClock /> {formatTimeAgo(message.timestamp)}
                  </span>
                  {message.isEdited && (
                    <span className="message-edited">(ред.)</span>
                  )}
                </div>

                {/* Текст сообщения */}
                <div className="message-text">
                  {message.text}
                  
                  {/* Вложения */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="message-attachments">
                      {message.attachments.map((attachment, index) => (
                        <div key={index} className="attachment">
                          <FaPaperclip />
                          <span>{attachment}</span>
                          <Button size="tiny" variant="outline">
                            Скачать
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Футер сообщения */}
                <div className="message-footer">
                  {renderMessageStatus(message.isRead, message.senderId)}
                  
                  {/* Действия для своих сообщений */}
                  {message.senderId === user.id && (
                    <div className="message-actions">
                      <button
                        className="action-btn"
                        onClick={() => handleReply(message)}
                        title="Ответить"
                      >
                        <FaReply />
                      </button>
                      <button
                        className="action-btn"
                        onClick={() => handleEdit(message)}
                        title="Редактировать"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDelete(message.id)}
                        title="Удалить"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Аватар для исходящих сообщений */}
              {message.senderId === user.id && (
                <div className="message-avatar outgoing">
                  <div className="avatar-circle user">
                    {user.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Индикатор набора текста */}
        {isTyping && (
          <div className="typing-indicator">
            <div className="typing-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <span>Поддержка печатает...</span>
          </div>
        )}
      </div>

      {/* Форма ввода сообщения */}
      <form className="chat-input-form" onSubmit={handleSendMessage}>
        {/* Ответ на сообщение */}
        {replyingTo && (
          <div className="reply-preview">
            <div className="reply-preview-content">
              <strong>Ответ на: {replyingTo.senderName}</strong>
              <p>{replyingTo.text}</p>
            </div>
            <Button
              size="tiny"
              variant="outline"
              onClick={() => setReplyingTo(null)}
            >
              ×
            </Button>
          </div>
        )}

        {/* Редактирование сообщения */}
        {editingMessage && (
          <div className="edit-preview">
            <div className="edit-preview-content">
              <strong>Редактирование сообщения</strong>
            </div>
            <Button
              size="tiny"
              variant="outline"
              onClick={() => {
                setEditingMessage(null);
                setNewMessage('');
              }}
            >
              Отмена
            </Button>
          </div>
        )}

        {/* Вложения */}
        {attachments.length > 0 && (
          <div className="attachments-preview">
            {attachments.map((file, index) => (
              <div key={index} className="attachment-preview">
                <FaPaperclip />
                <span>{file.name}</span>
                <button
                  type="button"
                  className="remove-attachment"
                  onClick={() => handleRemoveAttachment(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Поле ввода */}
        <div className="input-container">
          <div className="input-tools">
            <button
              type="button"
              className="tool-btn"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              title="Эмодзи"
            >
              <FaSmile />
            </button>
            <button
              type="button"
              className="tool-btn"
              onClick={() => fileInputRef.current?.click()}
              title="Прикрепить файл"
            >
              <FaPaperclip />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              className="tool-btn"
              title="Прикрепить изображение"
            >
              <FaImage />
            </button>
          </div>

          <textarea
            className="message-input"
            placeholder="Введите ваше сообщение..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />

          <Button
            type="submit"
            variant="primary"
            icon={<FaPaperPlane />}
            disabled={!newMessage.trim() && attachments.length === 0}
          >
            Отправить
          </Button>
        </div>

        {/* Подсказки */}
        <div className="input-hints">
          <span className="hint">
            Нажмите Enter для отправки, Shift+Enter для новой строки
          </span>
          <span className="hint">
            Максимальный размер файла: 5MB
          </span>
        </div>
      </form>

      {/* Picker эмодзи (упрощенный) */}
      {showEmojiPicker && (
        <div className="emoji-picker">
          <div className="emoji-picker-header">
            <span>Выберите эмодзи</span>
            <button
              type="button"
              className="close-picker"
              onClick={() => setShowEmojiPicker(false)}
            >
              ×
            </button>
          </div>
          <div className="emoji-grid">
            {['😀', '😂', '😊', '😍', '😎', '👍', '👏', '🎉', '🔥', '💯'].map(
              (emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className="emoji-btn"
                  onClick={() => {
                    setNewMessage(prev => prev + emoji);
                    setShowEmojiPicker(false);
                  }}
                >
                  {emoji}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketChat;