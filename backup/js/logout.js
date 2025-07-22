// logout.js
const firebaseConfig = {
    apiKey: "AIzaSyD2e5ZFUMY67KJsUrrflJpSIm1UpE4gn_Q",
    authDomain: "realauth-f47e3.firebaseapp.com",
    projectId: "realauth-f47e3",
    storageBucket: "realauth-f47e3.appspot.com",
    messagingSenderId: "246570204070",
    appId: "1:246570204070:web:d89596de8b627467e66d67"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Sign out immediately on page load
auth.signOut();

// Countdown and redirect
let count = 5;
const countElement = document.getElementById('count');

const countdown = setInterval(() => {
    count--;
    countElement.textContent = count;
    
    if (count <= 0) {
        clearInterval(countdown);
        window.location.href = 'login';
    }
}, 1000);

// Login again button
document.getElementById('login-again').addEventListener('click', () => {
    clearInterval(countdown);
    window.location.href = 'login';
});
