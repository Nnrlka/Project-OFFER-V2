export const mockProducts = [
  {
    id: '1',
    title: 'Steam аккаунт CS:GO с ножами',
    description: 'Премиум аккаунт с редкими скинами и ножами. Полный доступ, можно сменить все данные.',
    price: 24999,
    category: 'Аккаунты',
    seller: {
      id: 'seller1',
      username: 'GameMaster',
      rating: 4.8,
      reviewsCount: 127,
    },
    images: ['https://via.placeholder.com/400x300'],
    stock: 5,
    createdAt: '2024-01-15T10:30:00Z',
    tags: ['steam', 'csgo', 'skins', 'knife'],
  },
  {
    id: '2',
    title: '1000 голды World of Warcraft',
    description: 'Быстрая доставка золота на ваш сервер. Гарантия безопасности.',
    price: 1500,
    category: 'Игровые предметы',
    seller: {
      id: 'seller2',
      username: 'WoWGold',
      rating: 4.9,
      reviewsCount: 342,
    },
    images: ['https://via.placeholder.com/400x300'],
    stock: 100,
    createdAt: '2024-01-16T14:20:00Z',
    tags: ['wow', 'gold', 'mmorpg'],
  },
  {
    id: '3',
    title: 'Windows 11 Pro лицензия',
    description: 'Оригинальный ключ активации Windows 11 Professional. Пожизненная гарантия.',
    price: 2999,
    category: 'Ключи',
    seller: {
      id: 'seller3',
      username: 'SoftKeys',
      rating: 4.7,
      reviewsCount: 89,
    },
    images: ['https://via.placeholder.com/400x300'],
    stock: 50,
    createdAt: '2024-01-14T09:15:00Z',
    tags: ['windows', 'software', 'license'],
  },
  {
    id: '4',
    title: 'Дизайн логотипа',
    description: 'Профессиональный дизайн логотипа для вашего бизнеса. 3 варианта на выбор.',
    price: 5000,
    category: 'Услуги',
    seller: {
      id: 'seller4',
      username: 'DesignPro',
      rating: 5.0,
      reviewsCount: 56,
    },
    images: ['https://via.placeholder.com/400x300'],
    stock: 10,
    createdAt: '2024-01-17T16:45:00Z',
    tags: ['design', 'logo', 'service'],
  },
];

export const mockUsers = [
  {
    id: 'user1',
    username: 'Иван',
    email: 'ivan@example.com',
    role: 'user',
    balance: 5000,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'seller1',
    username: 'GameMaster',
    email: 'seller@example.com',
    role: 'seller',
    balance: 150000,
    rating: 4.8,
    reviewsCount: 127,
    createdAt: '2023-12-01T00:00:00Z',
  },
];

export const mockOrders = [
  {
    id: 'order1',
    productId: '1',
    buyerId: 'user1',
    sellerId: 'seller1',
    price: 24999,
    status: 'completed',
    createdAt: '2024-01-15T11:00:00Z',
    completedAt: '2024-01-15T11:30:00Z',
  },
];

export const mockTickets = [
  {
    id: 'ticket1',
    userId: 'user1',
    title: 'Проблема с покупкой',
    description: 'Не могу завершить покупку, выдает ошибку',
    category: 'Техническая проблема',
    status: 'open',
    createdAt: '2024-01-16T10:00:00Z',
    messages: [
      {
        id: 'msg1',
        senderId: 'user1',
        text: 'Здравствуйте, у меня проблема с покупкой',
        timestamp: '2024-01-16T10:00:00Z',
      },
    ],
  },
];