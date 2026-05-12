# Admin Dashboard Documentation

## Overview

A complete admin dashboard system for managing properties, bookings, and analytics. The dashboard includes an Overview page, Main Dashboard with Recent Orders and Top Properties, and a comprehensive Reports page.

## Features

### 1. Admin Overview Page (`/admin`)
**Purpose:** Display summary statistics and recent activities at a glance

**Components:**
- **Stats Grid:** 4 key metrics (Total Revenue, Total Bookings, Active Properties, Avg. Rating)
- **Recent Activity:** Latest 5 activities with timestamps
- **Quick Actions:** Buttons for common tasks
- **Performance Metrics:** Progress bars showing booking rate, guest satisfaction, and response rate

**Sample Data:**
- Stats with percentage changes
- Activity feed with multiple types of events
- Performance indicators

### 2. Admin Dashboard Page (`/admin/dashboard`)
**Purpose:** Main dashboard showing orders and property performance

**Sections:**
- **Recent Orders Table**
  - Order ID, Date, Property, Amount, Status
  - Color-coded status badges (Cancelled, Processing, Completed, Pending)
  - Sample data for 5 orders
  
- **Top Properties List**
  - Ranked list of best-performing properties
  - Shows property name, booking count
  - Ranked 1-5 with emoji icons

- **Summary Cards**
  - Monthly stats (bookings, revenue)
  - Performance metrics (rating, response rate)
  - Alerts section

### 3. Admin Reports Page (`/admin/reports`)
**Purpose:** Detailed analytics and performance insights

**Report Types:**
1. **Booking Trends**
   - Monthly booking chart (bar visualization)
   - Revenue tracking by month
   - Trend indicators

2. **Property Performance**
   - Occupancy rates with progress bars
   - Guest ratings
   - Revenue by property
   - Guest count

3. **Guest Analysis**
   - Source breakdown (Direct, Search, Social, Referrals)
   - Key metrics (total guests, avg rating, return rate, avg stay)
   - Demographic distribution

**Export Options:**
- Download PDF
- Export CSV
- Email Report

### 4. Additional Admin Pages
Placeholder pages for:
- `/admin/catalog` - Property catalog management
- `/admin/sales` - Sales analytics
- `/admin/customers` - Customer management
- `/admin/promotions` - Promotion creation and management
- `/admin/system` - System settings
- `/admin/help` - Help and support

## Components

### AdminLayout.jsx
Main layout wrapper with:
- **Sidebar Navigation**
  - Logo and branding
  - User profile with avatar
  - Navigation menu with 9 items
  - Collapsible sidebar
  - Logout button

- **Top Bar**
  - Theme toggle
  - Notifications
  - User menu with logout

- **Features:**
  - Responsive design
  - Mobile hamburger menu
  - Active route highlighting
  - Smooth transitions

## Styling

### admin.css
Comprehensive styling includes:
- CSS custom properties (variables)
- Responsive grid layouts
- Card-based design
- Color-coded status badges
- Progress bars and charts
- Mobile-first responsive design
- Dark/light theme ready

**Color Scheme:**
- Primary: Indigo (#6366f1)
- Secondary: Purple (#8b5cf6)
- Success: Green (#10b981)
- Warning: Amber (#f59e0b)
- Danger: Red (#ef4444)
- Info: Blue (#3b82f6)

## Routing

All routes are configured in `App.jsx`:

```
/admin                    → AdminOverviewPage
/admin/dashboard          → AdminDashboardPage
/admin/catalog            → AdminCatalogPage
/admin/sales              → AdminSalesPage
/admin/customers          → AdminCustomersPage
/admin/promotions         → AdminPromotionsPage
/admin/reports            → AdminReportsPage
/admin/system             → AdminSystemPage
/admin/help               → AdminHelpPage
```

## Usage

### Access the Admin Dashboard

1. **Start the app:**
   ```bash
   npm run dev:full
   ```

2. **Navigate to admin:**
   - Go to `http://localhost:5173/admin`
   - You must be logged in (uses AuthContext)

3. **Navigation:**
   - Use sidebar menu to navigate between pages
   - Click user menu to logout
   - Toggle sidebar to collapse/expand

### Sample Data

All pages include mock data for demonstration:
- Orders with various statuses
- Properties with rankings
- Monthly statistics
- Guest demographics
- Performance metrics

## Authentication

- Admin pages use `useAuth()` hook from AuthContext
- User info displayed in sidebar and top bar
- Logout functionality available
- Protected by auth state (ready for route guards)

## Responsive Design

**Breakpoints:**
- Mobile (< 480px): Stacked layout, bottom navigation
- Tablet (768px - 1024px): Single column cards
- Desktop (> 1024px): Multi-column grids

**Mobile Features:**
- Bottom navigation instead of sidebar
- Collapsible menus
- Touch-friendly buttons
- Optimized table views

## Customization

### Add New Admin Page

1. Create page component in `src/pages/`:
```jsx
import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminNewPage() {
  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Page Title</h1>
          <p>Description</p>
        </div>
        {/* Your content */}
      </div>
    </AdminLayout>
  );
}

export default AdminNewPage;
```

2. Add route in `App.jsx`
3. Add menu item in `AdminLayout.jsx` navigationMenu

### Customize Colors

Edit CSS variables in `admin.css`:
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  /* ... other colors ... */
}
```

### Connect to Backend API

Replace mock data with API calls:
```jsx
import { useEffect, useState } from 'react';
import { api } from '../services/api';

function AdminDashboardPage() {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    api.getOrders().then(data => setOrders(data));
  }, []);
  
  // ... render with real data
}
```

## Performance Considerations

- Chart rendering uses simple CSS-based visualization
- Tables use standard HTML for compatibility
- Lazy loading ready for large datasets
- Pagination support (layout includes "View all" links)

## Future Enhancements

- Real-time data updates with WebSockets
- Advanced filtering and search
- Exportable reports
- Custom dashboards
- Predictive analytics
- Notification system
- Email scheduling
- Two-factor authentication

## Files Created

```
src/
├── components/
│   └── AdminLayout.jsx          # Main layout wrapper
├── pages/
│   ├── AdminOverviewPage.jsx    # Overview/Summary page
│   ├── AdminDashboardPage.jsx   # Main dashboard
│   ├── AdminReportsPage.jsx     # Reports & Analytics
│   ├── AdminCatalogPage.jsx     # Catalog (placeholder)
│   ├── AdminSalesPage.jsx       # Sales (placeholder)
│   ├── AdminCustomersPage.jsx   # Customers (placeholder)
│   ├── AdminPromotionsPage.jsx  # Promotions (placeholder)
│   ├── AdminSystemPage.jsx      # System (placeholder)
│   └── AdminHelpPage.jsx        # Help (placeholder)
└── styles/
    └── admin.css                 # Admin styling

App.jsx                           # Updated with admin routes
```

## Testing

1. **Navigation Test:**
   - Click sidebar items
   - Verify active highlighting
   - Test collapsible sidebar

2. **Responsive Test:**
   - Open DevTools Device Toolbar
   - Test mobile/tablet views
   - Verify bottom nav on mobile

3. **Data Display:**
   - Check tables render correctly
   - Verify status badges display
   - Confirm charts render

4. **Functionality:**
   - Test logout button
   - Test theme toggle
   - Verify user info displays

## Troubleshooting

**Admin pages not loading:**
- Clear browser cache
- Rebuild: `npm run build:react`
- Check console for errors

**Sidebar not responding:**
- Verify CSS loaded
- Check AuthContext provides useAuth

**Charts not displaying:**
- Verify CSS variables defined
- Check data structure matches expected format

---

## Questions & Support

For integration with your backend, connect the mock data to your API endpoints in `src/services/api.js`.
