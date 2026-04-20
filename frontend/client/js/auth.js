// ============ AUTHENTICATION PAGE FUNCTIONALITY ============

class AuthManager {
  constructor() {
    this.authContainer = document.getElementById('authContainer');
    this.authBackdrop = document.getElementById('authBackdrop');
    this.signInBtn = document.getElementById('signInBtn');
    this.signUpBtn = document.getElementById('signUpBtn');
    this.authClose = document.getElementById('authClose');
    this.signInForm = document.getElementById('signInForm');
    this.signUpForm = document.getElementById('signUpForm');

    this.isRightPanelActive = false;
    this.init();
  }

  init() {
    // Toggle buttons
    this.signInBtn?.addEventListener('click', () => this.toggleToSignIn());
    this.signUpBtn?.addEventListener('click', () => this.toggleToSignUp());

    // Close button
    this.authClose?.addEventListener('click', () => this.closeAuth());

    // Backdrop click
    this.authBackdrop?.addEventListener('click', () => this.closeAuth());

    // Form submissions
    this.signInForm?.addEventListener('submit', (e) => this.handleSignIn(e));
    this.signUpForm?.addEventListener('submit', (e) => this.handleSignUp(e));

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.authContainer?.classList.contains('active')) {
        this.closeAuth();
      }
    });
  }

  toggleToSignIn() {
    this.authContainer?.classList.remove('right-panel-active');
    this.isRightPanelActive = false;
  }

  toggleToSignUp() {
    this.authContainer?.classList.add('right-panel-active');
    this.isRightPanelActive = true;
  }

  openAuth() {
    this.authContainer?.classList.add('active');
    this.authBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeAuth() {
    this.authContainer?.classList.remove('active');
    this.authBackdrop?.classList.remove('active');
    document.body.style.overflow = 'auto';
    this.toggleToSignIn();
  }

  handleSignIn(e) {
    e.preventDefault();
    const email = this.signInForm?.querySelector('input[type="email"]')?.value;
    const password = this.signInForm?.querySelector('input[type="password"]')?.value;

    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    console.log('Sign In:', { email, password });
    this.login({ email, password });
  }

  handleSignUp(e) {
    e.preventDefault();
    const inputs = this.signUpForm?.querySelectorAll('.auth-input');
    const name = inputs?.[0]?.value;
    const email = inputs?.[1]?.value;
    const password = inputs?.[2]?.value;

    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }

    console.log('Sign Up:', { name, email, password });
    this.signup({ name, email, password });
  }

  async login(credentials) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        console.log('Login successful');
        this.closeAuth();
        window.location.href = '/';
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error. Please try again.');
    }
  }

  async signup(userData) {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        console.log('Signup successful');
        this.closeAuth();
        window.location.href = '/';
      } else {
        alert('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup error. Please try again.');
    }
  }
}

// Initialize auth manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AuthManager();
});

// Make it globally accessible for main page integration
window.AuthManager = AuthManager;
