import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminHelpPage() {
  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Help</h1>
          <p>Get help and support</p>
        </div>
        <div className="card">
          <p>Help and support coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminHelpPage;
