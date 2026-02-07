import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaEye, FaTag } from 'react-icons/fa';
import { formatPrice, formatTimeAgo } from '../../../utils/formatters';
import Button from '../../common/Button/Button';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <Link to={`/marketplace/product/${product.id}`} className="product-card-link">
      <div className="product-card glass-effect">
        {/* Бейджи */}
        <div className="product-badges">
          {product.stock < 10 && (
            <span className="badge badge-warning">Осталось мало</span>
          )}
          {product.isNew && (
            <span className="badge badge-success">Новинка</span>
          )}
        </div>

        {/* Изображение */}
        <div className="product-image">
          <img
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.title}
            loading="lazy"
          />
          <div className="product-overlay">
            <Button
              variant="primary"
              size="small"
              icon={<FaEye />}
              className="view-button"
            >
              Подробнее
            </Button>
          </div>
        </div>

        {/* Контент */}
        <div className="product-content">
          <div className="product-header">
            <h3 className="product-title">{product.title}</h3>
            <div className="product-price">{formatPrice(product.price)}</div>
          </div>

          <p className="product-description">
            {product.description.length > 100
              ? `${product.description.substring(0, 100)}...`
              : product.description}
          </p>

          <div className="product-meta">
            <div className="product-category">
              <FaTag /> {product.category}
            </div>
            <div className="product-stock">
              В наличии: {product.stock} шт.
            </div>
          </div>

          {/* Продавец */}
          <div className="product-seller">
            <Link
              to={`/seller/${product.seller.id}`}
              className="seller-link"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="seller-avatar">
                {product.seller.username.charAt(0).toUpperCase()}
              </div>
              <div className="seller-info">
                <div className="seller-name">{product.seller.username}</div>
                <div className="seller-rating">
                  <FaStar /> {product.seller.rating.toFixed(1)}
                  <span className="rating-count">({product.seller.reviewsCount})</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Действия */}
          <div className="product-actions">
            <Button
              variant="primary"
              icon={<FaShoppingCart />}
              onClick={handleAddToCart}
              className="add-to-cart-btn"
            >
              В корзину
            </Button>
            <Button variant="outline" size="small">
              Купить сейчас
            </Button>
          </div>

          {/* Футер */}
          <div className="product-footer">
            <div className="product-tags">
              {product.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="product-date">
              {formatTimeAgo(product.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;