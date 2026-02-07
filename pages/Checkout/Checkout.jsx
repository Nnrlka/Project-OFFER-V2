import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaLock, FaCreditCard, FaArrowLeft, FaCheck } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Button from '../../components/common/Button/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner/LoadingSpinner';
import { fetchProduct, createOrder } from '../../utils/api';
import { formatPrice } from '../../utils/formatters';
import './Checkout.css';

const Checkout = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { clearCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutData, setCheckoutData] = useState({
    quantity: 1,
    deliveryMethod: 'auto',
    paymentMethod: 'yoomoney',
    agreeToTerms: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth?tab=login', { 
        state: { from: `/checkout/${productId}` } 
      });
      return;
    }

    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProduct(productId);
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId, isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCheckoutData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCheckout = async () => {
    if (!checkoutData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    setIsProcessing(true);
    
    try {
      const orderData = {
        productId: product.id,
        sellerId: product.seller_id,
        quantity: parseInt(checkoutData.quantity),
        totalAmount: product.price * parseInt(checkoutData.quantity),
        deliveryMethod: checkoutData.deliveryMethod,
        paymentMethod: checkoutData.paymentMethod,
      };

      const result = await createOrder(orderData);
      
      if (result.success) {
        // Очищаем корзину
        clearCart();
        
        // Перенаправляем на страницу успеха
        navigate(`/order-success/${result.orderId}`);
      } else {
        setError(result.message || 'Checkout failed');
      }
    } catch (err) {
      setError(err.message || 'Checkout failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="checkout-loading">
        <LoadingSpinner size="large" />
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="checkout-error">
        <h2>Error</h2>
        <p>{error}</p>
        <Button onClick={() => navigate('/marketplace')}>
          Back to Marketplace
        </Button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="checkout-not-found">
        <h2>Product not found</h2>
        <Button onClick={() => navigate('/marketplace')}>
          Browse Products
        </Button>
      </div>
    );
  }

  const totalAmount = product.price * checkoutData.quantity;
  const platformFee = totalAmount * 0.05; // 5% комиссия
  const finalAmount = totalAmount + platformFee;

  return (
    <div className="checkout-page page">
      <div className="container">
        <div className="checkout-header">
          <button 
            className="back-button"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> Back
          </button>
          <h1 className="page-title">Checkout</h1>
        </div>

        <div className="checkout-layout">
          {/* Левая часть - детали заказа */}
          <div className="checkout-details">
            <div className="product-summary">
              <div className="product-image">
                <img 
                  src={product.images?.[0] || '/placeholder.jpg'} 
                  alt={product.title}
                />
              </div>
              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-seller">Seller: {product.seller_username}</p>
                <div className="product-price">
                  {formatPrice(product.price)} each
                </div>
              </div>
            </div>

            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                max={product.stock}
                value={checkoutData.quantity}
                onChange={handleInputChange}
                className="quantity-input"
              />
              <span className="stock-info">
                Available: {product.stock} units
              </span>
            </div>

            <div className="delivery-method">
              <h4>Delivery Method</h4>
              <div className="delivery-options">
                <label className="delivery-option">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="auto"
                    checked={checkoutData.deliveryMethod === 'auto'}
                    onChange={handleInputChange}
                  />
                  <span className="option-label">Automatic Delivery</span>
                  <span className="option-description">
                    Instant delivery after payment
                  </span>
                </label>
                
                <label className="delivery-option">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="manual"
                    checked={checkoutData.deliveryMethod === 'manual'}
                    onChange={handleInputChange}
                  />
                  <span className="option-label">Manual Delivery</span>
                  <span className="option-description">
                    Seller will deliver within 24 hours
                  </span>
                </label>
              </div>
            </div>

            <div className="terms-agreement">
              <label className="terms-checkbox">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={checkoutData.agreeToTerms}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                <span className="terms-text">
                  I agree to the{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>
          </div>

          {/* Правая часть - итоги и оплата */}
          <div className="checkout-summary">
            <div className="summary-card">
              <h3 className="summary-title">Order Summary</h3>
              
              <div className="summary-items">
                <div className="summary-item">
                  <span>Product Price ({checkoutData.quantity}×)</span>
                  <span>{formatPrice(product.price * checkoutData.quantity)}</span>
                </div>
                
                <div className="summary-item">
                  <span>Platform Fee (5%)</span>
                  <span>{formatPrice(platformFee)}</span>
                </div>
                
                <div className="summary-item total">
                  <span>Total Amount</span>
                  <span className="total-amount">{formatPrice(finalAmount)}</span>
                </div>
              </div>

              <div className="payment-methods">
                <h4>Payment Method</h4>
                <div className="payment-options">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="yoomoney"
                      checked={checkoutData.paymentMethod === 'yoomoney'}
                      onChange={handleInputChange}
                    />
                    <span className="option-icon">💳</span>
                    <span className="option-label">YooMoney</span>
                  </label>
                  
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_card"
                      checked={checkoutData.paymentMethod === 'bank_card'}
                      onChange={handleInputChange}
                    />
                    <span className="option-icon">🏦</span>
                    <span className="option-label">Bank Card</span>
                  </label>
                </div>
              </div>

              <div className="security-info">
                <FaLock />
                <span>Secure payment · Money-back guarantee</span>
              </div>

              <Button
                variant="primary"
                size="large"
                icon={<FaCreditCard />}
                onClick={handleCheckout}
                isLoading={isProcessing}
                disabled={!checkoutData.agreeToTerms || isProcessing}
                className="checkout-button"
              >
                {isProcessing ? 'Processing...' : `Pay ${formatPrice(finalAmount)}`}
              </Button>

              <p className="guarantee-text">
                Your payment is secured. Money is held in escrow until you confirm delivery.
              </p>
            </div>

            <div className="user-balance">
              <h4>Your Balance</h4>
              <div className="balance-amount">
                {formatPrice(user?.balance || 0)}
              </div>
              <Button
                variant="outline"
                size="small"
                onClick={() => navigate('/profile?tab=balance')}
              >
                Add Funds
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;