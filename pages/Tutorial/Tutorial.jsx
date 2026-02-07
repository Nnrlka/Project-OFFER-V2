import React, { useState } from 'react';
import { FaUser, FaStore, FaShieldAlt, FaWallet, FaQuestionCircle, FaVideo } from 'react-icons/fa';
import Button from '../../components/common/Button/Button';
import './Tutorial.css';

const Tutorial = () => {
  const [activeTab, setActiveTab] = useState('buyer');

  const tutorials = {
    buyer: [
      {
        title: 'Как сделать первую покупку',
        steps: [
          'Найдите нужный товар через поиск или категории',
          'Нажмите "Купить сейчас" или добавьте в корзину',
          'Подтвердите детали заказа и способ оплаты',
          'Оплатите заказ через безопасную платежную систему',
          'Получите товар и подтвердите получение',
          'Оставьте отзыв о продавце'
        ],
        video: 'https://www.youtube.com/embed/example',
        tips: [
          'Всегда проверяйте рейтинг продавца перед покупкой',
          'Читайте описание товара внимательно',
          'Деньги хранятся на гарантийном счете до вашего подтверждения'
        ]
      },
      {
        title: 'Что делать при проблемах',
        steps: [
          'Если товар не соответствует описанию - откройте спор',
          'В течение 48 часов после получения откройте спор в разделе "Заказы"',
          'Опишите проблему подробно и прикрепите доказательства',
          'Администратор рассмотрит спор в течение 24 часов',
          'При положительном решении средства вернутся на ваш баланс'
        ]
      }
    ],
    seller: [
      {
        title: 'Как начать продавать',
        steps: [
          'Пройдите верификацию продавца в профиле',
          'Сдайте тест на знание правил платформы',
          'Создайте карточку товара с подробным описанием',
          'Установите конкурентную цену',
          'Настройте способы доставки товара',
          'Активируйте товар в каталоге'
        ],
        tips: [
          'Первые 5 товаров проходят модерацию 24 часа',
          'Чем подробнее описание - тем выше конверсия',
          'Используйте качественные изображения товаров'
        ]
      },
      {
        title: 'Правила для продавцов',
        steps: [
          'Запрещена продажа запрещенных товаров',
          'Обязательно выполнять заказы в течение 24 часов',
          'Запрещено общение вне платформы до завершения сделки',
          'При спорных ситуациях администрация всегда на стороне покупателя',
          'За нарушения - штрафы и блокировка аккаунта'
        ]
      }
    ]
  };

  const tabs = [
    { id: 'buyer', label: 'Для покупателей', icon: <FaUser /> },
    { id: 'seller', label: 'Для продавцов', icon: <FaStore /> },
    { id: 'safety', label: 'Безопасность', icon: <FaShieldAlt /> },
    { id: 'payments', label: 'Платежи', icon: <FaWallet /> },
    { id: 'faq', label: 'FAQ', icon: <FaQuestionCircle /> },
  ];

  const faqItems = [
    {
      question: 'Сколько времени выводятся деньги?',
      answer: 'Вывод занимает от 1 до 24 часов в зависимости от способа.'
    },
    {
      question: 'Как стать проверенным продавцом?',
      answer: 'Продайте 10+ товаров с положительными отзывами.'
    },
    {
      question: 'Какая комиссия при продаже?',
      answer: 'Комиссия составляет 5% от суммы продажи.'
    }
  ];

  return (
    <div className="tutorial-page page">
      <div className="container">
        <div className="tutorial-header">
          <h1 className="page-title">Обучение</h1>
          <p className="page-subtitle">
            Всё что нужно знать для безопасных и успешных сделок
          </p>
        </div>

        <div className="tutorial-layout">
          {/* Боковая панель */}
          <div className="tutorial-sidebar">
            <div className="sidebar-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="quick-help">
              <h3>Нужна помощь?</h3>
              <Button
                variant="outline"
                icon={<FaQuestionCircle />}
                onClick={() => window.open('/support', '_blank')}
                className="help-btn"
              >
                Открыть тикет
              </Button>
              <Button
                variant="outline"
                icon={<FaVideo />}
                onClick={() => window.open('https://youtube.com', '_blank')}
              >
                Видео-уроки
              </Button>
            </div>
          </div>

          {/* Основной контент */}
          <div className="tutorial-content">
            {activeTab === 'buyer' && (
              <div className="tab-content">
                <h2 className="section-title">Руководство для покупателей</h2>
                
                {tutorials.buyer.map((tutorial, index) => (
                  <div key={index} className="tutorial-card">
                    <h3 className="tutorial-title">{tutorial.title}</h3>
                    
                    {tutorial.video && (
                      <div className="tutorial-video">
                        <iframe
                          src={tutorial.video}
                          title={tutorial.title}
                          frameBorder="0"
                          allowFullScreen
                        />
                      </div>
                    )}
                    
                    <div className="tutorial-steps">
                      <h4>Шаги:</h4>
                      <ol>
                        {tutorial.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    {tutorial.tips && (
                      <div className="tutorial-tips">
                        <h4>💡 Советы:</h4>
                        <ul>
                          {tutorial.tips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'seller' && (
              <div className="tab-content">
                <h2 className="section-title">Руководство для продавцов</h2>
                
                {tutorials.seller.map((tutorial, index) => (
                  <div key={index} className="tutorial-card">
                    <h3 className="tutorial-title">{tutorial.title}</h3>
                    
                    <div className="tutorial-steps">
                      <h4>Процесс:</h4>
                      <ol>
                        {tutorial.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    {tutorial.tips && (
                      <div className="tutorial-tips">
                        <h4>🚀 Рекомендации:</h4>
                        <ul>
                          {tutorial.tips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="tab-content">
                <h2 className="section-title">Часто задаваемые вопросы</h2>
                
                <div className="faq-list">
                  {faqItems.map((item, index) => (
                    <div key={index} className="faq-item">
                      <h3 className="faq-question">{item.question}</h3>
                      <p className="faq-answer">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Общая информация для всех вкладок */}
            <div className="tutorial-info">
              <div className="info-card">
                <h3>📞 Контакты поддержки</h3>
                <p>Email: support@offer.com</p>
                <p>Telegram: @offer_support</p>
                <p>Время ответа: 24/7</p>
              </div>
              
              <div className="info-card">
                <h3>⚖️ Гарантии</h3>
                <p>Деньги хранятся на гарантийном счете</p>
                <p>Возврат средств при спорах</p>
                <p>Защита от мошенников</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;