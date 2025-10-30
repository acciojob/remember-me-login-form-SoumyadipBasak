//your JS code here. If required.
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
 * This function also handles the 5️⃣ Persistence on Page Reload requirement.
 */
function checkExistingCredentials() {
    const savedUsername = localStorage.getItem(USERNAME_KEY);
    
    if (savedUsername) {
        // If credentials exist, show the existing user button
        existingBtn.style.display = 'block';
    } else {
        // Otherwise, ensure it is hidden (Test Case 1)
        existingBtn.style.display = 'none';
    }
}

/**
 * Handles the form submission logic.
 * @param {Event} event - The form submission event.
 */
function handleFormSubmit(event) {
    // Stop the default form submission (page reload)
    event.preventDefault(); 

    const username = usernameInput.value;
    const isChecked = checkbox.checked;

    // 1. Display the login alert (2️⃣ Form Submission Behavior)
    alert(`Logged in as ${username}`);
    
    // 2. Handle the "Remember Me" logic
    if (isChecked) {
        // If checked: Store credentials in localStorage (Test Case 3)
        const password = passwordInput.value;
        localStorage.setItem(USERNAME_KEY, username);
        localStorage.setItem(PASSWORD_KEY, password);
    } else {
        // If unchecked: Remove any previously stored credentials (Test Case 2)
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
        // Display the alert with the saved username (Test Case 4)
        alert(`Logged in as ${savedUsername}`);
    } else {
        // Fallback: If the button was somehow visible but storage is empty
        alert("No existing user credentials found.");
        checkExistingCredentials(); // Re-hide the button
    }
}


// --- Initialization and Event Listeners ---

// 1. Check for credentials on script load to satisfy Persistence (Test Case 3 & 5)
checkExistingCredentials();

// 2. Attach listeners
form.addEventListener('submit', handleFormSubmit);
existingBtn.addEventListener('click', handleExistingLogin);