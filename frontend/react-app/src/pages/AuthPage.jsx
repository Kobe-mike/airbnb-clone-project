import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();
  
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      await login(signInData.email, signInData.password);
      setMessage('Sign in successful!');
      // Redirect to home after 1 second
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (signUpData.password !== signUpData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      await register(signUpData.name, signUpData.email, signUpData.password);
      setMessage('Sign up successful!');
      // Redirect to home after 1 second
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Decorative Shapes */}
      <div className="shape shape-triangle"></div>
      <div className="shape shape-circle-top"></div>
      <div className="shape shape-circle-bottom"></div>

      <div className="auth-box" id="container">
        {/* Sign In Form */}
        <form 
          className={`auth-form sign-in ${!isSignUp ? '' : 'active'}`}
          onSubmit={handleSignIn}
        >
          <h2>Sign In</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signInData.email}
            onChange={handleSignInChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signInData.password}
            onChange={handleSignInChange}
            required
          />
          {message && <p style={{ color: '#D4AF37', fontSize: '0.875rem' }}>{message}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Sign Up Form */}
        <form 
          className={`auth-form sign-up ${isSignUp ? 'active' : ''}`}
          onSubmit={handleSignUp}
        >
          <h2>Sign Up</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={signUpData.name}
            onChange={handleSignUpChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signUpData.email}
            onChange={handleSignUpChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signUpData.password}
            onChange={handleSignUpChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={signUpData.confirmPassword}
            onChange={handleSignUpChange}
            required
          />
          {message && <p style={{ color: '#D4AF37', fontSize: '0.875rem' }}>{message}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        {/* Overlay */}
        <div className={`auth-overlay ${isSignUp ? 'active' : ''}`}>
          {!isSignUp ? (
            <>
              <h1>New Here?</h1>
              <p>Create an account and explore amazing stays today!</p>
              <button type="button" onClick={() => setIsSignUp(true)}>Sign Up</button>
            </>
          ) : (
            <>
              <h1>Welcome Back!</h1>
              <p>Sign in to your account to manage your bookings</p>
              <button type="button" onClick={() => setIsSignUp(false)}>Sign In</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
