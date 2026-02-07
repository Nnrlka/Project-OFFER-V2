import React from 'react';
import AdminPanelComponent from '../../components/admin/AdminPanel/AdminPanel';
import './AdminPanelPage.css';

const AdminPanelPage = () => {
  // Проверка прав администратора (в реальном приложении)
  const isAdmin = true; // TODO: Получить из контекста авторизации

  if (!isAdmin) {
    return (
      <div className="admin-access-denied page">
        <div className="container">
          <div className="access-denied-content">
            <h1 className="page-title">Доступ запрещен</h1>
            <p className="page-subtitle">
              У вас нет прав для доступа к панели администратора.
            </p>
            <div className="denied-icon">🔒</div>
            <p className="denied-text">
              Эта страница доступна только пользователям с правами администратора.
              Если вы считаете, что это ошибка, обратитесь в поддержку.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel-page">
      <AdminPanelComponent />
    </div>
  );
};

export default AdminPanelPage;