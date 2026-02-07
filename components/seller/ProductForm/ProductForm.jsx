import React, { useState } from 'react';
import Modal from '../../common/Modal/Modal';
import { FaImage, FaTag, FaDollarSign, FaList, FaSave } from 'react-icons/fa';
import Button from '../../common/Button/Button';
import { CATEGORIES } from '../../../utils/constants';
import { validateProduct } from '../../../utils/validation';
import './ProductForm.css';

const ProductForm = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    price: product?.price || '',
    category: product?.category || '',
    stock: product?.stock || 1,
    tags: product?.tags?.join(', ') || '',
    images: product?.images || [],
    isActive: product?.isActive ?? true,
    deliveryTime: product?.deliveryTime || 'instant',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);
    
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const removeImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateProduct(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // TODO: Заменить на реальный API вызов
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        createdAt: new Date().toISOString(),
        id: product?.id || `PRODUCT-${Date.now()}`
      };
      
      if (onSave) {
        onSave(productData);
      }
      
      if (onClose) {
        onClose();
      }
      
    } catch (error) {
      setErrors({ general: error.message || 'Ошибка при сохранении товара' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deliveryOptions = [
    { value: 'instant', label: 'Мгновенная доставка (автоматически)' },
    { value: 'manual', label: 'Ручная отправка (в течение 24 часов)' },
    { value: 'delayed', label: 'Отложенная (по договоренности)' },
  ];

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title={product ? 'Редактировать товар' : 'Добавить новый товар'}
      size="large"
    >
      <form onSubmit={handleSubmit} className="product-form">
        {errors.general && (
          <div className="error-message">
            {errors.general}
          </div>
        )}

        {/* Название и категория */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              <FaTag /> Название товара
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Например: Steam аккаунт CS:GO с ножами"
              maxLength={100}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
            <div className="char-counter">{formData.title.length}/100</div>
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">
              <FaList /> Категория
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`form-select ${errors.category ? 'error' : ''}`}
            >
              <option value="">Выберите категорию</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>
        </div>

        {/* Цена и количество */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price" className="form-label">
              <FaDollarSign /> Цена (₽)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className={`form-input ${errors.price ? 'error' : ''}`}
              placeholder="0"
              min="1"
              step="1"
            />
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="stock" className="form-label">
              Количество
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              className="form-input"
              placeholder="1"
              min="1"
            />
            <div className="input-hint">Сколько единиц товара доступно</div>
          </div>
        </div>

        {/* Описание */}
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
            placeholder="Опишите товар максимально подробно. Укажите все характеристики, условия использования, гарантии и т.д."
            rows={6}
          />
          {errors.description && (
            <span className="error-text">{errors.description}</span>
          )}
          <div className="char-counter">{formData.description.length}/2000</div>
        </div>

        {/* Теги */}
        <div className="form-group">
          <label htmlFor="tags" className="form-label">
            Теги (через запятую)
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={formData.tags}
            onChange={handleChange}
            className="form-input"
            placeholder="steam, csgo, аккаунт, скин, нож"
          />
          <div className="input-hint">
            Теги помогают покупателям находить ваш товар
          </div>
        </div>

        {/* Изображения */}
        <div className="form-group">
          <label className="form-label">
            <FaImage /> Изображения товара
          </label>
          <div className="image-upload">
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
            <label htmlFor="images" className="upload-label">
              Выберите изображения (до 5 файлов)
            </label>
            <div className="upload-hint">
              Рекомендуем загружать изображения в формате JPG/PNG, не более 5MB каждое
            </div>
          </div>

          {/* Предпросмотр изображений */}
          {formData.images.length > 0 && (
            <div className="image-preview">
              <h4>Загруженные изображения:</h4>
              <div className="preview-grid">
                {formData.images.map((image, index) => (
                  <div key={index} className="preview-item">
                    <img
                      src={image.preview || image}
                      alt={`Preview ${index + 1}`}
                      className="preview-image"
                    />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => removeImage(index)}
                      aria-label="Удалить изображение"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Способ доставки */}
        <div className="form-group">
          <label className="form-label">Способ доставки</label>
          <div className="radio-group">
            {deliveryOptions.map((option) => (
              <label key={option.value} className="radio-label">
                <input
                  type="radio"
                  name="deliveryTime"
                  value={option.value}
                  checked={formData.deliveryTime === option.value}
                  onChange={handleChange}
                  className="radio-input"
                />
                <span className="radio-custom"></span>
                {option.label}
              </label>
            ))}
          </div>
        </div>

        {/* Дополнительные настройки */}
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="checkbox"
            />
            <span className="checkmark"></span>
            <span className="checkbox-text">
              Сразу опубликовать товар
            </span>
          </label>
          <div className="checkbox-hint">
            Если не отмечено, товар будет сохранен как черновик
          </div>
        </div>

        {/* Подсказки для продавца */}
        <div className="seller-tips">
          <h4>💡 Советы для успешных продаж:</h4>
          <ul>
            <li>Используйте качественные и информативные изображения</li>
            <li>Подробно описывайте товар и все условия</li>
            <li>Устанавливайте конкурентные цены</li>
            <li>Указывайте реальные сроки доставки</li>
            <li>Отвечайте на вопросы покупателей быстро</li>
          </ul>
        </div>

        {/* Кнопки */}
        <div className="form-actions">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            variant="primary"
            icon={<FaSave />}
            isLoading={isSubmitting}
          >
            {product ? 'Сохранить изменения' : 'Создать товар'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductForm;