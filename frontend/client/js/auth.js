// Authentication Form Toggle - Click Based with Event Delegation

const container = document.getElementById('container');
const overlayContent = document.getElementById('overlayContent');

// Toggle to Sign Up
function toggleToSignUp() {
    container.classList.add('right-panel-active');
    updateOverlayToSignUp();
}

// Toggle to Sign In
function toggleToSignIn() {
    container.classList.remove('right-panel-active');
    updateOverlayToSignIn();
}

// Update overlay to Sign Up state
function updateOverlayToSignUp() {
    overlayContent.innerHTML = `
        <h1>New Here?</h1>
        <p>Create an account and explore amazing stays today!</p>
        <button class="ghost-button" data-action="sign-in">Sign In</button>
    `;
}

// Update overlay to Sign In state
function updateOverlayToSignIn() {
    overlayContent.innerHTML = `
        <h1>Welcome Back!</h1>
        <p>Hover right to create an account</p>
        <button class="ghost-button" data-action="sign-up">Sign Up</button>
    `;
}

// Event delegation for overlay buttons
overlayContent.addEventListener('click', (e) => {
    const button = e.target.closest('button[data-action]');
    if (!button) return;
    
    e.preventDefault();
    const action = button.getAttribute('data-action');
    
    if (action === 'sign-up') {
        toggleToSignUp();
    } else if (action === 'sign-in') {
        toggleToSignIn();
    }
});

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
updateOverlayToSignIn();
