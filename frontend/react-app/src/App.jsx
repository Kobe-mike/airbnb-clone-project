import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import BookingPage from './pages/BookingPage';
import AdminOverviewPage from './pages/AdminOverviewPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminReportsPage from './pages/AdminReportsPage';
import AdminCatalogPage from './pages/AdminCatalogPage';
import AdminSalesPage from './pages/AdminSalesPage';
import AdminCustomersPage from './pages/AdminCustomersPage';
import AdminPromotionsPage from './pages/AdminPromotionsPage';
import AdminSystemPage from './pages/AdminSystemPage';
import AdminHelpPage from './pages/AdminHelpPage';
import './styles/index.css';
import './styles/admin.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/bookings" element={<BookingPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminOverviewPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/catalog" element={<AdminCatalogPage />} />
          <Route path="/admin/sales" element={<AdminSalesPage />} />
          <Route path="/admin/customers" element={<AdminCustomersPage />} />
          <Route path="/admin/promotions" element={<AdminPromotionsPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
          <Route path="/admin/system" element={<AdminSystemPage />} />
          <Route path="/admin/help" element={<AdminHelpPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
