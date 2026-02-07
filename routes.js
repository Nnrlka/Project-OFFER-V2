import React, { lazy, Suspense } from 'react';
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';

// Lazy loading страниц
const Home = lazy(() => import('./pages/Home/Home'));
const Marketplace = lazy(() => import('./pages/Marketplace/Marketplace'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Auth = lazy(() => import('./pages/Auth/Auth'));
const SellerDashboard = lazy(() => import('./pages/SellerDashboard/SellerDashboardPage'));
const AdminPanel = lazy(() => import('./pages/AdminPanel/AdminPanelPage'));
const Support = lazy(() => import('./pages/Support/Support'));
const Rules = lazy(() => import('./pages/Rules/Rules'));
const Tutorial = lazy(() => import('./pages/Tutorial/Tutorial'));
const Checkout = lazy(() => import('./pages/Checkout/Checkout'));

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
    <LoadingSpinner size="large" />
  </div>
);

const routes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/marketplace',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Marketplace />
      </Suspense>
    ),
  },
  {
    path: '/profile',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Profile />
      </Suspense>
    ),
  },
  {
    path: '/auth',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Auth />
      </Suspense>
    ),
  },
  {
    path: '/seller',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SellerDashboard />
      </Suspense>
    ),
  },
  {
    path: '/admin',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AdminPanel />
      </Suspense>
    ),
  },
  {
    path: '/support',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Support />
      </Suspense>
    ),
  },
  {
    path: '/rules',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Rules />
      </Suspense>
    ),
  },
  {
    path: '/tutorial',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Tutorial />
      </Suspense>
    ),
  },
  {
    path: '/checkout/:productId',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Checkout />
      </Suspense>
    ),
  },
];

export default routes;