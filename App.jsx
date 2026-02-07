import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';
import './styles/global.css';
import './App.css';

// Lazy load страницы
const Home = React.lazy(() => import('./pages/Home/Home'));
const Marketplace = React.lazy(() => import('./pages/Marketplace/Marketplace'));
const Profile = React.lazy(() => import('./pages/Profile/Profile'));
const Auth = React.lazy(() => import('./pages/Auth/Auth'));
const SellerDashboard = React.lazy(() => import('./pages/SellerDashboard/SellerDashboardPage'));
const AdminPanel = React.lazy(() => import('./pages/AdminPanel/AdminPanelPage'));
const Support = React.lazy(() => import('./pages/Support/Support'));
const Rules = React.lazy(() => import('./pages/Rules/Rules'));
const Tutorial = React.lazy(() => import('./pages/Tutorial/Tutorial'));
const Checkout = React.lazy(() => import('./pages/Checkout/Checkout'));

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <div className="app">
              <Header />
              <main className="app-main">
                <Suspense fallback={
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: '400px' 
                  }}>
                    <LoadingSpinner size="large" />
                  </div>
                }>
                  <Routes>
                    {/* Публичные маршруты */}
                    <Route path="/" element={<Home />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/rules" element={<Rules />} />
                    <Route path="/tutorial" element={<Tutorial />} />
                    
                    {/* Защищенные маршруты (пока публичные) */}
                    <Route path="/checkout/:productId" element={<Checkout />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/seller" element={<SellerDashboard />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/support" element={<Support />} />
                    
                    {/* 404 - Redirect to home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;