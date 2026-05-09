import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import BookingPage from './pages/BookingPage';
import './styles/index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/bookings" element={<BookingPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
