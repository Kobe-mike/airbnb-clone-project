import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminSalesPage() {
  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Sales</h1>
          <p>Track your sales and revenue</p>
        </div>
        <div className="card">
          <p>Sales analytics coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminSalesPage;
