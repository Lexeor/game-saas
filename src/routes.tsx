import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage.tsx';
import OrderPage from '@/pages/OrderPage.tsx';
import LoginPage from '@/pages/LoginPage.tsx';
import ProtectedRoute from '@/components/ProtectedRoute.tsx';
import DashboardLayout from '@/layouts/DashboardLayout.tsx';
import ServersPage from '@/pages/dashboard/ServersPage.tsx';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/order/:gameId" element={<OrderPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Navigate to="/login" replace />} />

      {/* Protected dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Navigate to="/dashboard/servers" replace />} />
          <Route path="/dashboard/servers" element={<ServersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
