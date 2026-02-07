import React, { useState, useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import ProductCard from '../ProductCard/ProductCard';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import { mockProducts } from '../../../mockData';
import './ProductGrid.css';

const ProductGrid = ({ limit, category, sortBy = 'popular' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // TODO: Заменить на реальный API вызов
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredProducts = [...mockProducts];
        
        // Фильтрация по категории
        if (category && category !== 'Все') {
          filteredProducts = filteredProducts.filter(p => p.category === category);
        }
        
        // Сортировка
        switch (sortBy) {
          case 'newest':
            filteredProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
          case 'price_asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
            filteredProducts.sort((a, b) => b.seller.rating - a.seller.rating);
            break;
          case 'popular':
          default:
            filteredProducts.sort((a, b) => b.seller.reviewsCount - a.seller.reviewsCount);
        }
        
        // Лимит
        if (limit) {
          filteredProducts = filteredProducts.slice(0, limit);
        }
        
        setProducts(filteredProducts);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить товары. Попробуйте позже.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [category, sortBy, limit]);

  const handleAddToCart = (product) => {
    addToCart(product);
    // TODO: Показать уведомление об успешном добавлении
  };

  if (loading) {
    return (
      <div className="products-loading">
        <LoadingSpinner size="large" />
        <p>Загрузка товаров...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-error">
        <div className="error-icon">⚠️</div>
        <h3>Ошибка загрузки</h3>
        <p>{error}</p>
        <button 
          className="retry-btn"
          onClick={() => window.location.reload()}
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="products-empty">
        <div className="empty-icon">📦</div>
        <h3>Товары не найдены</h3>
        <p>Попробуйте изменить параметры поиска или фильтры</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="grid-item">
          <ProductCard 
            product={product} 
            onAddToCart={handleAddToCart}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;