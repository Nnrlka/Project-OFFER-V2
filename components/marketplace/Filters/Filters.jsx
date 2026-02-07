import React from 'react';
import { FaFilter, FaRubleSign, FaStar, FaTimes } from 'react-icons/fa';
import { CATEGORIES } from '../../../utils/constants';
import Button from '../../common/Button/Button';
import './Filters.css';

const Filters = ({ filters, onChange, onClear }) => {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value === '' ? '' : Math.max(0, Number(value)));
  };

  const handleRatingChange = (rating) => {
    handleChange('sellerRating', rating);
  };

  const ratingOptions = [5, 4, 3, 2, 1];

  return (
    <div className="filters-panel">
      <div className="filters-header">
        <h3 className="filters-title">
          <FaFilter /> Фильтры
        </h3>
        {Object.values(filters).some(val => val !== '' && val !== 0) && (
          <Button
            variant="text"
            size="small"
            icon={<FaTimes />}
            onClick={onClear}
            className="clear-filters-btn"
          >
            Сбросить
          </Button>
        )}
      </div>

      <div className="filters-content">
        {/* Категория */}
        <div className="filter-section">
          <h4 className="filter-title">Категория</h4>
          <div className="filter-options">
            <select
              value={filters.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="filter-select"
            >
              <option value="">Все категории</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Цена */}
        <div className="filter-section">
          <h4 className="filter-title">
            <FaRubleSign /> Цена
          </h4>
          <div className="price-filters">
            <div className="price-input-group">
              <label htmlFor="minPrice">От</label>
              <input
                id="minPrice"
                name="minPrice"
                type="number"
                value={filters.minPrice}
                onChange={handlePriceChange}
                placeholder="0"
                min="0"
                className="price-input"
              />
            </div>
            <div className="price-input-group">
              <label htmlFor="maxPrice">До</label>
              <input
                id="maxPrice"
                name="maxPrice"
                type="number"
                value={filters.maxPrice}
                onChange={handlePriceChange}
                placeholder="∞"
                min="0"
                className="price-input"
              />
            </div>
          </div>
        </div>

        {/* Рейтинг продавца */}
        <div className="filter-section">
          <h4 className="filter-title">
            <FaStar /> Рейтинг продавца
          </h4>
          <div className="rating-filters">
            {ratingOptions.map((rating) => (
              <button
                key={rating}
                className={`rating-option ${filters.sellerRating === rating ? 'selected' : ''}`}
                onClick={() => handleRatingChange(
                  filters.sellerRating === rating ? 0 : rating
                )}
              >
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`star ${i < rating ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-text">{rating}+</span>
              </button>
            ))}
          </div>
        </div>

        {/* Наличие */}
        <div className="filter-section">
          <h4 className="filter-title">Наличие</h4>
          <div className="availability-filters">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => handleChange('inStock', e.target.checked)}
                className="checkbox"
              />
              <span className="checkmark"></span>
              Только в наличии
            </label>
          </div>
        </div>

        {/* Быстрая доставка */}
        <div className="filter-section">
          <h4 className="filter-title">Доставка</h4>
          <div className="delivery-filters">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.fastDelivery}
                onChange={(e) => handleChange('fastDelivery', e.target.checked)}
                className="checkbox"
              />
              <span className="checkmark"></span>
              Мгновенная доставка
            </label>
          </div>
        </div>

        {/* Применить фильтры */}
        <div className="filter-actions">
          <Button
            variant="primary"
            onClick={() => console.log('Применить фильтры:', filters)}
            className="apply-filters-btn"
          >
            Применить фильтры
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filters;