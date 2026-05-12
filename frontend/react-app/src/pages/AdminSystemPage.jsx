import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminSystemPage() {
  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>System</h1>
          <p>System settings and configuration</p>
        </div>
        <div className="card">
          <p>System settings coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminSystemPage;
