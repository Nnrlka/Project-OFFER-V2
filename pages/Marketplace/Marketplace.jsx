import React, { useState } from 'react';
import { FaFilter, FaSort, FaFire, FaClock, FaStar } from 'react-icons/fa';
import SearchBar from '../../components/marketplace/SearchBar/SearchBar';
import ProductGrid from '../../components/marketplace/ProductGrid/ProductGrid';
import Filters from '../../components/marketplace/Filters/Filters';
import Button from '../../components/common/Button/Button';
import { mockProducts } from '../../mockData';
import { CATEGORIES } from '../../utils/constants';
import './Marketplace.css';

const Marketplace = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sellerRating: 0,
  });

  const sortOptions = [
    { id: 'popular', label: 'Популярные', icon: <FaFire /> },
    { id: 'newest', label: 'Сначала новые', icon: <FaClock /> },
    { id: 'price_asc', label: 'Цена по возрастанию', icon: <FaSort /> },
    { id: 'price_desc', label: 'Цена по убыванию', icon: <FaSort /> },
    { id: 'rating', label: 'По рейтингу', icon: <FaStar /> },
  ];

  const categories = ['Все', ...CATEGORIES];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      sellerRating: 0,
    });
  };

  return (
    <div className="marketplace-page page">
      <div className="container">
        {/* Хедер маркетплейса */}
        <div className="marketplace-header">
          <div className="header-content">
            <h1 className="page-title">Маркетплейс</h1>
            <p className="page-subtitle">
              Безопасные сделки с цифровыми товарами. Гарантия возврата средств.
            </p>
          </div>
          
          <div className="header-actions">
            <Button
              variant={showFilters ? 'primary' : 'outline'}
              icon={<FaFilter />}
              onClick={() => setShowFilters(!showFilters)}
              className="filter-toggle"
            >
              Фильтры
            </Button>
            
            <div className="sort-dropdown">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Поиск и категории */}
        <div className="marketplace-tools">
          <div className="search-container">
            <SearchBar placeholder="Искать товары, продавцов, категории..." />
          </div>
          
          <div className="categories-scroll">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-chip ${filters.category === category ? 'active' : ''}`}
                onClick={() => 
                  handleFilterChange({ ...filters, category: filters.category === category ? '' : category })
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Основной контент */}
        <div className="marketplace-content">
          {/* Фильтры для десктопа */}
          <div className={`sidebar-filters ${showFilters ? 'mobile-visible' : ''}`}>
            <Filters
              filters={filters}
              onChange={handleFilterChange}
              onClear={handleClearFilters}
            />
            
            <button
              className="close-filters mobile-only"
              onClick={() => setShowFilters(false)}
            >
              Закрыть
            </button>
          </div>

          {/* Список товаров */}
          <div className="products-section">
            <div className="products-header">
              <h2 className="products-count">
                Найдено {mockProducts.length} товаров
              </h2>
              <div className="view-toggle">
                <button className="view-btn active">Сетка</button>
                <button className="view-btn">Список</button>
              </div>
            </div>

            <ProductGrid products={mockProducts} />

            {/* Пагинация */}
            <div className="pagination">
              <button className="pagination-btn disabled">Назад</button>
              <button className="pagination-btn active">1</button>
              <button className="pagination-btn">2</button>
              <button className="pagination-btn">3</button>
              <span className="pagination-dots">...</span>
              <button className="pagination-btn">10</button>
              <button className="pagination-btn">Вперед</button>
            </div>
          </div>
        </div>

        {/* Баннер гарантии */}
        <div className="guarantee-banner glass-effect">
          <div className="banner-content">
            <h3>🔒 Гарантия безопасной сделки</h3>
            <p>
              Деньги хранятся на гарантийном счете до подтверждения получения товара.
              В случае спора — поддержка поможет вернуть средства.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;