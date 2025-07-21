// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2e5ZFUMY67KJsUrrflJpSIm1UpE4gn_Q",
    authDomain: "realauth-f47e3.firebaseapp.com",
    projectId: "realauth-f47e3",
    storageBucket: "realauth-f47e3.firebasestorage.app",
    messagingSenderId: "246570204070",
    appId: "1:246570204070:web:d89596de8b627467e66d67"
};

// DOM Elements
const statusText = document.querySelector('.status-text');
const cosmicLoader = document.querySelector('.cosmic-loader');

// Initialize Firebase and monitor auth state
function initFirebase() {
    try {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        
        // Update status text
        statusText.textContent = "Connected to Firebase...";
        
        // Set up authentication listener
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is signed in
                statusText.textContent = `Welcome back, ${user.displayName || user.email}! Redirecting...`;
                setTimeout(() => {
                    window.location.href = "chat.html";
                }, 1500);
            } else {
                // No user is signed in
                statusText.textContent = "No active session found. Redirecting to login...";
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1500);
            }
        });
        
        // Set a timeout in case authentication check takes too long
        setTimeout(() => {
            if (!firebase.apps.length) {
                statusText.textContent = "Connection taking longer than expected...";
            }
        }, 3000);
        
    } catch (error) {
        console.error("Firebase initialization failed", error);
        statusText.textContent = "Error connecting to authentication service";
        cosmicLoader.innerHTML = '<div class="error-icon">⚠️</div>';
        cosmicLoader.style.animation = 'none';
        
        // Show manual redirect options
        setTimeout(() => {
            statusText.innerHTML = `
                <p>Failed to connect. Please try:</p>
                <div class="manual-options">
                    <a href="login" class="cosmic-btn">Go to Login</a>
                    <a href="chat" class="cosmic-btn">Go to Chat</a>
                </div>
            `;
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start the authentication process
    statusText.textContent = "Initializing cosmic connection...";
    
    // Initialize Firebase after a brief delay to show the loading animation
    setTimeout(initFirebase, 1000);
});
