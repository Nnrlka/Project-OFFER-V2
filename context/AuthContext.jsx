import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Создаем контекст ПЕРВЫМ
const AuthContext = createContext(undefined);

// 2. Создаем провайдер
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Имитация проверки токена
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ id: '1', email: 'demo@user.com', username: 'DemoUser', role: 'user', balance: 1000 });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Заглушка для логина
        localStorage.setItem('token', 'demo-token');
        setUser({ id: '1', email, username: email.split('@')[0], role: 'user', balance: 1000 });
        navigate('/profile');
        return { success: true };
    };

    const register = async (userData) => {
        console.log('Registration data:', userData);
        return { success: true };
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Кастомный хук для использования контекста
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// 4. Упрощенный компонент ProtectedRoute (можно добавить позже)
export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/auth');
        }
    }, [loading, isAuthenticated, navigate]);

    if (loading) return <div>Загрузка...</div>;
    return isAuthenticated ? children : null;
};