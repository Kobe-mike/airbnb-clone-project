import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminCustomersPage() {
  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Customers</h1>
          <p>Manage your customers and guests</p>
        </div>
        <div className="card">
          <p>Customer management coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminCustomersPage;
