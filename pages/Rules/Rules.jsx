import React from 'react';
import './Rules.css';

const Rules = () => {
  const sections = [
    {
      title: 'Общие положения',
      items: [
        'OFFER выступает посредником между покупателем и продавцом.',
        'Мы не являемся стороной сделки и не несем ответственности за качество товаров.',
        'Все пользователи обязаны соблюдать правила платформы.'
      ]
    },
    {
      title: 'Для покупателей',
      items: [
        'Перед покупкой внимательно читайте описание товара.',
        'Деньги хранятся на гарантийном счете до подтверждения получения.',
        'В случае проблем - открывайте спор в течение 48 часов.'
      ]
    },
    {
      title: 'Для продавцов',
      items: [
        'Требуется верификация для получения статуса продавца.',
        'Обязательное прохождение теста на знание правил.',
        'Запрещена продажа запрещенных товаров и услуг.'
      ]
    }
  ];

  return (
    <div className="rules-page page">
      <div className="container">
        <h1 className="page-title">Правила платформы</h1>
        
        <div className="rules-content">
          {sections.map((section, index) => (
            <div key={index} className="rules-section">
              <h2>{section.title}</h2>
              <ul>
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rules;