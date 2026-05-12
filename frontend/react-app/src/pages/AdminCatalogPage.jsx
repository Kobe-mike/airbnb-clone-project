import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminCatalogPage() {
  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Catalog</h1>
          <p>Manage your property catalog</p>
        </div>
        <div className="card">
          <p>Catalog management coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminCatalogPage;
