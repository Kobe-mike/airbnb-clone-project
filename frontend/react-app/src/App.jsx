import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import BookingPage from './pages/BookingPage';
import AdminOverviewPage from './pages/AdminOverviewPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminReportsPage from './pages/AdminReportsPage';
import AdminCatalogPage from './pages/AdminCatalogPage';
import AdminPropertiesPage from './pages/AdminPropertiesPage';
import AdminCategoriesPage from './pages/AdminCategoriesPage';
import AdminSalesPage from './pages/AdminSalesPage';
import AdminBookingsPage from './pages/AdminBookingsPage';
import AdminPaymentsPage from './pages/AdminPaymentsPage';
import AdminCustomersPage from './pages/AdminCustomersPage';
import AdminUsersPage from './pages/AdminUsersPage';
import AdminReviewsPage from './pages/AdminReviewsPage';
import AdminPromotionsPage from './pages/AdminPromotionsPage';
import AdminPromotionCampaignsPage from './pages/AdminPromotionCampaignsPage';
import AdminDiscountCodesPage from './pages/AdminDiscountCodesPage';
import AdminSystemPage from './pages/AdminSystemPage';
import AdminRequestHistoryPage from './pages/AdminRequestHistoryPage';
import AdminActivityLogPage from './pages/AdminActivityLogPage';
import AdminSocialLinksPage from './pages/AdminSocialLinksPage';
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
          <Route path="/admin/reports" element={<AdminReportsPage />} />
          
          {/* Catalog Routes */}
          <Route path="/admin/catalog" element={<AdminCatalogPage />} />
          <Route path="/admin/categories" element={<AdminCategoriesPage />} />
          <Route path="/admin/properties" element={<AdminPropertiesPage />} />
          
          {/* Sales Routes */}
          <Route path="/admin/sales" element={<AdminSalesPage />} />
          <Route path="/admin/bookings" element={<AdminBookingsPage />} />
          <Route path="/admin/payments" element={<AdminPaymentsPage />} />
          
          {/* Customers Routes */}
          <Route path="/admin/customers" element={<AdminCustomersPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/reviews" element={<AdminReviewsPage />} />
          
          {/* Promotions Routes */}
          <Route path="/admin/promotions" element={<AdminPromotionsPage />} />
          <Route path="/admin/promotions/campaigns" element={<AdminPromotionCampaignsPage />} />
          <Route path="/admin/promotions/codes" element={<AdminDiscountCodesPage />} />
          
          {/* System Routes */}
          <Route path="/admin/system" element={<AdminSystemPage />} />
          <Route path="/admin/system/requests" element={<AdminRequestHistoryPage />} />
          <Route path="/admin/system/activity" element={<AdminActivityLogPage />} />
          <Route path="/admin/system/social" element={<AdminSocialLinksPage />} />
          
          {/* Help Route */}
          <Route path="/admin/help" element={<AdminHelpPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
