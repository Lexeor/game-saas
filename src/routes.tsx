import { Routes, Route } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage.tsx';
import OrderPage from '@/pages/OrderPage.tsx';
import LoginPage from '@/pages/LoginPage.tsx';
import SignupPage from '@/pages/SignupPage.tsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/order/:gameId" element={<OrderPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}
