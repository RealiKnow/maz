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

// Redirect if not logged in
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
  }
});

// Gemini API
const GEMINI_API_KEY = "AIzaSyCa4oS6AnLLRZJsC3HBIvEeAwzYRhGdUg4";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// DOM elements
const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const logoutBtn = document.getElementById('logout-btn');

// Chat functionality
async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;
  
  // Add user message to chat
  addMessage(message, 'user');
  userInput.value = '';
  userInput.focus();
  
  try {
    // Show loading indicator
    const loadingMsg = addMessage('Thinking about cosmic possibilities...', 'ai');
    
    // Get response from Gemini
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    
    // Replace loading message with actual response
    replaceMessage(loadingMsg, text, 'ai');
  } catch (error) {
    console.error('Gemini error:', error);
    addMessage('Cosmic interference detected! Try again later.', 'ai');
  }
}

function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  
  messageDiv.innerHTML = `
    <div class="avatar">${sender === 'user' ? '👤' : '🌌'}</div>
    <div class="content">
      <div class="text">${text}</div>
    </div>
  `;
  
  chatHistory.appendChild(messageDiv);
  scrollToBottom();
  return messageDiv;
}

function replaceMessage(oldElement, newText, sender) {
  const newElement = document.createElement('div');
  newElement.className = `message ${sender}-message`;
  
  newElement.innerHTML = `
    <div class="avatar">${sender === 'user' ? '👤' : '🌌'}</div>
    <div class="content">
      <div class="text">${newText}</div>
    </div>
  `;
  
  oldElement.replaceWith(newElement);
  scrollToBottom();
}

function scrollToBottom() {
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

logoutBtn.addEventListener('click', () => {
  window.location.href = "logout.html";
});

// Initial scroll to bottom
setTimeout(scrollToBottom, 100);
