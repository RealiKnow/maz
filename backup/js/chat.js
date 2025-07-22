// chat.js
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

// Gemini API setup
const GEMINI_API_KEY = "AIzaSyCa4oS6AnLLRZJsC3HBIvEeAwzYRhGdUg4";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const logoutBtn = document.getElementById('logout-btn');

// Check auth state
auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = 'login.html';
    } else {
        // Add welcome message
        addBotMessage("Welcome to MAZ Cosmic Chat! I'm your AI guide to the universe. Ask me anything about space, stars, galaxies, or cosmic phenomena!");
    }
});

// Send message function
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addUserMessage(message);
    userInput.value = '';
    
    try {
        // Show loading indicator
        const loadingMsg = addBotMessage("Thinking about the cosmos...", true);
        
        // Get response from Gemini
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();
        
        // Replace loading message with actual response
        replaceLoadingMessage(loadingMsg, text);
    } catch (error) {
        addBotMessage("Sorry, I encountered a cosmic disturbance. Please try again later.");
        console.error("Gemini error:", error);
    }
}

// Add user message to chat
function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-header">You</div>
        <div class="message-text">${text}</div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Add bot message to chat
function addBotMessage(text, isTemp = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message bot-message ${isTemp ? 'temp-message' : ''}`;
    messageDiv.innerHTML = `
        <div class="message-header">Cosmic AI</div>
        <div class="message-text">${text}</div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    return messageDiv;
}

// Replace temporary loading message
function replaceLoadingMessage(messageElement, text) {
    messageElement.innerHTML = `
        <div class="message-header">Cosmic AI</div>
        <div class="message-text">${text}</div>
    `;
    messageElement.classList.remove('temp-message');
    scrollToBottom();
}

// Scroll to bottom of chat
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = 'logout.html';
    });
});

// Initialize chat scrolling
scrollToBottom();
