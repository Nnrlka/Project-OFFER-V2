export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateUsername = (username) => {
  const re = /^[a-zA-Z0-9_]{3,20}$/;
  return re.test(username);
};

export const validateProduct = (product) => {
  const errors = {};
  
  if (!product.title || product.title.length < 3) {
    errors.title = 'Название должно быть не менее 3 символов';
  }
  
  if (!product.description || product.description.length < 10) {
    errors.description = 'Описание должно быть не менее 10 символов';
  }
  
  if (!product.price || product.price <= 0) {
    errors.price = 'Цена должна быть больше 0';
  }
  
  if (!product.category) {
    errors.category = 'Выберите категорию';
  }
  
  return errors;
};

export const validateTicket = (ticket) => {
  const errors = {};
  
  if (!ticket.title || ticket.title.length < 5) {
    errors.title = 'Заголовок должен быть не менее 5 символов';
  }
  
  if (!ticket.description || ticket.description.length < 20) {
    errors.description = 'Опишите проблему подробнее (минимум 20 символов)';
  }
  
  if (!ticket.category) {
    errors.category = 'Выберите категорию обращения';
  }
  
  return errors;
};