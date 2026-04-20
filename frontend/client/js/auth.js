// Authentication Form Toggle - CSP-safe (no inline event handlers)

const container = document.getElementById('container');
const overlayContent = document.getElementById('overlayContent');

function renderOverlay(mode) {
    const isSignInMode = mode === 'signIn';

    if (isSignInMode) {
        container.classList.remove('right-panel-active');
        overlayContent.innerHTML = `
            <h1>Welcome Back!</h1>
            <p>Hover right to create an account</p>
            <button class="ghost-button" id="toggleOverlayBtn">Sign Up</button>
        `;
    } else {
        container.classList.add('right-panel-active');
        overlayContent.innerHTML = `
            <h1>New Here?</h1>
            <p>Create an account and explore amazing stays today!</p>
            <button class="ghost-button" id="toggleOverlayBtn">Sign In</button>
        `;
    }

    const toggleOverlayBtn = document.getElementById('toggleOverlayBtn');
    if (toggleOverlayBtn) {
        toggleOverlayBtn.addEventListener('click', () => {
            renderOverlay(isSignInMode ? 'signUp' : 'signIn');
        });
    }
}

// Form submission handlers
document.getElementById('signInForm').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Sign In submitted');
    // Handle sign in logic here
});

document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Sign Up submitted');
    // Handle sign up logic here
});

// Initialize overlay on page load
renderOverlay('signIn');
