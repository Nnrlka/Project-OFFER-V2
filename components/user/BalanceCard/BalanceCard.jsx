import React, { useState } from 'react';
import { FaWallet, FaPlus, FaArrowRight, FaCreditCard, FaBitcoin, FaRubleSign } from 'react-icons/fa';
import Button from '../../common/Button/Button';
import { formatPrice } from '../../../utils/formatters';
import './BalanceCard.css';

const BalanceCard = () => {
  const [balance] = useState(12500);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showWithdraw, setShowWithdraw] = useState(false);

  const paymentMethods = [
    { id: 'yoomoney', name: 'ЮMoney', icon: <FaWallet />, min: 100, fee: '1%' },
    { id: 'bank_card', name: 'Банковская карта', icon: <FaCreditCard />, min: 500, fee: '2%' },
    { id: 'crypto', name: 'Криптовалюта', icon: <FaBitcoin />, min: 1000, fee: '0.5%' },
  ];

  const handleWithdraw = (method) => {
    if (!withdrawAmount || Number(withdrawAmount) < method.min) {
      alert(`Минимальная сумма для вывода: ${method.min} ₽`);
      return;
    }
    
    if (Number(withdrawAmount) > balance) {
      alert('Недостаточно средств на балансе');
      return;
    }
    
    // TODO: Реализовать вывод средств
    console.log(`Withdraw ${withdrawAmount} ₽ via ${method.name}`);
    setShowWithdraw(false);
    setWithdrawAmount('');
  };

  const handleQuickAmount = (amount) => {
    setWithdrawAmount(amount.toString());
  };

  const quickAmounts = [100, 500, 1000, 5000, 10000];

  return (
    <div className="balance-card glass-effect">
      <div className="balance-header">
        <div className="balance-info">
          <h3 className="balance-title">
            <FaWallet /> Баланс
          </h3>
          <div className="balance-amount">
            {formatPrice(balance)}
          </div>
          <div className="balance-subtitle">
            Доступно для вывода: {formatPrice(balance * 0.9)}
          </div>
        </div>
        
        <div className="balance-actions">
          <Button
            variant="primary"
            icon={<FaPlus />}
            onClick={() => console.log('Пополнить')}
          >
            Пополнить
          </Button>
          <Button
            variant="outline"
            icon={<FaArrowRight />}
            onClick={() => setShowWithdraw(!showWithdraw)}
          >
            Вывести
          </Button>
        </div>
      </div>

      {/* Форма вывода */}
      {showWithdraw && (
        <div className="withdraw-form">
          <h4 className="form-title">Вывод средств</h4>
          
          <div className="amount-selector">
            <label>Сумма вывода (₽)</label>
            <div className="amount-input-group">
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Введите сумму"
                className="amount-input"
                min="1"
                max={balance}
              />
              <button 
                className="amount-max"
                onClick={() => setWithdrawAmount((balance * 0.9).toString())}
              >
                Макс
              </button>
            </div>
            
            <div className="quick-amounts">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  className={`quick-amount ${withdrawAmount === amount.toString() ? 'active' : ''}`}
                  onClick={() => handleQuickAmount(amount)}
                >
                  {amount.toLocaleString()} ₽
                </button>
              ))}
            </div>
          </div>

          <div className="payment-methods">
            <h5>Способ вывода</h5>
            <div className="methods-grid">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  className="method-card"
                  onClick={() => handleWithdraw(method)}
                  disabled={balance < method.min}
                >
                  <div className="method-icon">{method.icon}</div>
                  <div className="method-info">
                    <div className="method-name">{method.name}</div>
                    <div className="method-details">
                      <span>Мин: {method.min} ₽</span>
                      <span>Комиссия: {method.fee}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="withdraw-info">
            <p>⚡ Выводы обрабатываются в течение 1-24 часов</p>
            <p>🔐 Средства выводятся только на карты/счета, привязанные к вашему аккаунту</p>
            <p>📋 При выводе более 15,000 ₽ в месяц требуется верификация</p>
          </div>
        </div>
      )}

      <div className="balance-footer">
        <div className="footer-item">
          <span className="footer-label">Недельный лимит:</span>
          <span className="footer-value">50,000 ₽</span>
        </div>
        <div className="footer-item">
          <span className="footer-label">Выведено в этом месяце:</span>
          <span className="footer-value">15,000 ₽</span>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;