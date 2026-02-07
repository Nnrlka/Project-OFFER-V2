import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'danger'
  size = 'medium',     // 'small' | 'medium' | 'large'
  isLoading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props 
}) => {
  return (
    <button
      className={`
        btn 
        btn--${variant} 
        btn--${size}
        ${isLoading ? 'btn--loading' : ''}
        ${fullWidth ? 'btn--full-width' : ''}
        ${disabled ? 'btn--disabled' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Основной контент */}
      <span className="btn__content">
        {children}
      </span>
      
      {/* Эффект заполнения при наведении (только для primary) */}
      {variant === 'primary' && (
        <span className="btn__hover-fill"></span>
      )}
      
      {/* Свечение (для primary и secondary) */}
      {(variant === 'primary' || variant === 'secondary') && (
        <span className="btn__glow"></span>
      )}
      
      {/* Лоадер */}
      {isLoading && (
        <span className="btn__loader">
          <span className="btn__loader-dot"></span>
          <span className="btn__loader-dot"></span>
          <span className="btn__loader-dot"></span>
        </span>
      )}
    </button>
  );
};

export default Button;