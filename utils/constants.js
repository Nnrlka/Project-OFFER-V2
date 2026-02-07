export const ROLES = {
  USER: 'user',
  SELLER: 'seller',
  ADMIN: 'admin',
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  DISPUTED: 'disputed',
};

export const DISPUTE_STATUS = {
  OPEN: 'open',
  UNDER_REVIEW: 'under_review',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
};

export const PAYMENT_METHODS = [
  { id: 'yoomoney', name: 'ЮMoney', icon: '💳' },
  { id: 'bank_card', name: 'Банковская карта', icon: '💳' },
  { id: 'sbp', name: 'СБП', icon: '🏦' },
  { id: 'crypto', name: 'Криптовалюта', icon: '₿' },
];

export const CATEGORIES = [
  'Аккаунты',
  'Игровые предметы',
  'Ключи',
  'Цифровые товары',
  'Услуги',
  'Программное обеспечение',
  'Другое',
];

export const SUPPORT_CATEGORIES = [
  'Техническая проблема',
  'Вопрос по заказу',
  'Проблема с продавцом',
  'Возврат средств',
  'Другое',
];