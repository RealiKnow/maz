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

// Redirect if already logged in
auth.onAuthStateChanged(user => {
  if (user) {
    window.location.href = "chat";
  }
});

// Login form handler
document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');
  
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      window.location.href = "chat";
    })
    .catch((error) => {
      let message = "Cosmic connection failed. Try again.";
      switch(error.code) {
        case 'auth/user-not-found':
          message = "Stellar traveler not found";
          break;
        case 'auth/wrong-password':
          message = "Incorrect cosmic coordinates";
          break;
      }
      errorMessage.textContent = message;
    });
});
