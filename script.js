// --- DOM Element References ---
const form = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const checkbox = document.getElementById('checkbox');
const existingBtn = document.getElementById('existing');

// --- Local Storage Keys ---
const USERNAME_KEY = 'rememberedUsername';
const PASSWORD_KEY = 'rememberedPassword';

// --- Functions ---

/**
 * Checks localStorage for saved credentials and updates the 'existing' button visibility.
 * This ensures the button persists across page reloads.
 */
function checkExistingCredentials() {
    const savedUsername = localStorage.getItem(USERNAME_KEY);
    
    if (savedUsername) {
        // If credentials exist, show the existing user button
        existingBtn.style.display = 'block';
    } else {
        // Otherwise, ensure it is hidden
        existingBtn.style.display = 'none';
    }
}

/**
 * Handles the form submission logic.
 */
function handleFormSubmit(event) {
    // Stop the default form submission (page reload)
    event.preventDefault(); 

    const username = usernameInput.value;
    const isChecked = checkbox.checked;

    // 1. Display the login alert
    alert(`Logged in as ${username}`);
    
    // 2. Handle the "Remember Me" logic
    if (isChecked) {
        // If checked: Store credentials in localStorage
        const password = passwordInput.value;
        localStorage.setItem(USERNAME_KEY, username);
        localStorage.setItem(PASSWORD_KEY, password);
    } else {
        // If unchecked: Remove any previously stored credentials
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(PASSWORD_KEY);
    }

    // 3. Reset form and update button visibility
    form.reset();
    checkExistingCredentials();
}

/**
 * Handles the click on the "Login as existing user" button.
 */
function handleExistingLogin() {
    const savedUsername = localStorage.getItem(USERNAME_KEY);
    
    if (savedUsername) {
        // Display the alert with the saved username
        alert(`Logged in as ${savedUsername}`);
    } else {
        // Fallback
        alert("No existing user credentials found.");
        checkExistingCredentials(); 
    }
}


// --- Initialization and Event Listeners ---

// 1. Check for credentials on script load to enable persistence
checkExistingCredentials();

// 2. Attach listeners
form.addEventListener('submit', handleFormSubmit);
existingBtn.addEventListener('click', handleExistingLogin);