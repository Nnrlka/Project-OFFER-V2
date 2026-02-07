import React, { useState } from 'react';
import { FaPaperclip, FaPaperPlane, FaTag, FaHeading } from 'react-icons/fa';
import Button from '../../common/Button/Button';
import { SUPPORT_CATEGORIES } from '../../../utils/constants';
import { validateTicket } from '../../../utils/validation';
import './TicketForm.css';

const TicketForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    category: initialData?.category || '',
    description: initialData?.description || '',
    priority: initialData?.priority || 'medium',
    attachments: initialData?.attachments || [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attachmentFiles, setAttachmentFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachmentFiles(prev => [...prev, ...files]);
    
    // Создаем предпросмотр файлов
    const newAttachments = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    }));
    
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));
  };

  const removeAttachment = (index) => {
    setAttachmentFiles(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateTicket(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // TODO: Заменить на реальный API вызов
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const ticketData = {
        ...formData,
        attachments: attachmentFiles,
        createdAt: new Date().toISOString(),
        status: 'open',
        id: `TICKET-${Date.now()}`
      };
      
      if (onSubmit) {
        onSubmit(ticketData);
      }
      
      // Очистка формы после успешной отправки
      setFormData({
        title: '',
        category: '',
        description: '',
        priority: 'medium',
        attachments: [],
      });
      setAttachmentFiles([]);
      setErrors({});
      
      alert('Тикет успешно создан! Мы ответим в течение 24 часов.');
      
    } catch (error) {
      setErrors({ general: error.message || 'Ошибка при создании тикета' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      {errors.general && (
        <div className="error-message">
          {errors.general}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="title" className="form-label">
          <FaHeading /> Заголовок проблемы
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className={`form-input ${errors.title ? 'error' : ''}`}
          placeholder="Кратко опишите проблему"
          maxLength={100}
        />
        {errors.title && (
          <span className="error-text">{errors.title}</span>
        )}
        <div className="char-counter">
          {formData.title.length}/100 символов
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category" className="form-label">
            <FaTag /> Категория
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`form-select ${errors.category ? 'error' : ''}`}
          >
            <option value="">Выберите категорию</option>
            {SUPPORT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="error-text">{errors.category}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="priority" className="form-label">
            Приоритет
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-select"
          >
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
            <option value="critical">Критический</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Подробное описание
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`form-textarea ${errors.description ? 'error' : ''}`}
          placeholder="Опишите проблему максимально подробно. Укажите номера заказов, имена пользователей, даты и время."
          rows={8}
        />
        {errors.description && (
          <span className="error-text">{errors.description}</span>
        )}
        <div className="char-counter">
          {formData.description.length}/2000 символов
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          <FaPaperclip /> Прикрепленные файлы
        </label>
        <div className="file-upload">
          <input
            type="file"
            id="attachments"
            multiple
            onChange={handleFileChange}
            className="file-input"
            accept=".jpg,.jpeg,.png,.pdf,.txt,.doc,.docx"
          />
          <label htmlFor="attachments" className="file-label">
            Выберите файлы (макс. 5 файлов по 5MB)
          </label>
          <span className="file-hint">
            Поддерживаются: JPG, PNG, PDF, TXT, DOC
          </span>
        </div>

        {/* Список прикрепленных файлов */}
        {formData.attachments.length > 0 && (
          <div className="attachments-list">
            <h4>Прикрепленные файлы:</h4>
            <div className="attachments-grid">
              {formData.attachments.map((file, index) => (
                <div key={index} className="attachment-item">
                  <div className="attachment-info">
                    <div className="attachment-name">{file.name}</div>
                    <div className="attachment-size">{formatFileSize(file.size)}</div>
                  </div>
                  <button
                    type="button"
                    className="attachment-remove"
                    onClick={() => removeAttachment(index)}
                    aria-label="Удалить файл"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="form-tips">
        <h4>📝 Советы для быстрого решения:</h4>
        <ul>
          <li>Указывайте номера заказов, если проблема связана с покупкой</li>
          <li>При проблемах с оплатой прикрепите скриншот ошибки</li>
          <li>Для спорных ситуаций укажите имя продавца/покупателя</li>
          <li>Ответ придет на email, указанный в вашем профиле</li>
        </ul>
      </div>

      <div className="form-actions">
        <Button
          type="submit"
          variant="primary"
          size="large"
          icon={<FaPaperPlane />}
          isLoading={isSubmitting}
          className="submit-btn"
        >
          Отправить обращение
        </Button>
      </div>
    </form>
  );
};

export default TicketForm;