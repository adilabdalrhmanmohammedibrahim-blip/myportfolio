// 1. Grab the elements we need
const form = document.getElementById("signupForm");
const nameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");
const message = document.getElementById("formMessage");
const eyeButtons = document.querySelectorAll(".eye");

// 2. Show / hide password (one piece of code for both eye buttons)
eyeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const input = document.getElementById(button.dataset.target);
    const isHidden = input.type === "password";

    input.type = isHidden ? "text" : "password";
    button.textContent = isHidden ? "🙈" : "👁️";
    button.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
  });
});

// 3. Show a message under the inputs
function showMessage(text, type) {
  message.textContent = text;
  message.className = "form-message " + type;
}

// 4. Mark a box red and show the error
function showError(input, text) {
  input.parentElement.classList.add("invalid");
  showMessage(text, "error");
  input.focus();
}

// 5. Check the form when Sign Up is clicked
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirm = confirmInput.value;
  const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // clear old red borders
  [nameInput, emailInput, passwordInput, confirmInput].forEach(function (input) {
    input.parentElement.classList.remove("invalid");
  });

  if (name === "") {
    showError(nameInput, "Please enter your full name.");
    return;
  }

  if (email === "") {
    showError(emailInput, "Please enter your email address.");
    return;
  }

  if (!looksLikeEmail) {
    showError(emailInput, "That email does not look right. Check it and try again.");
    return;
  }

  if (password.length < 6) {
    showError(passwordInput, "Password must be at least 6 characters.");
    return;
  }

  if (confirm !== password) {
    showError(confirmInput, "The two passwords do not match.");
    return;
  }

  showMessage("Account created! Taking you to the login page...", "success");

  setTimeout(function () {
    window.location.href = "login.html";
  }, 1400);
});

// 6. Remove the red border as soon as the person starts typing again
[nameInput, emailInput, passwordInput, confirmInput].forEach(function (input) {
  input.addEventListener("input", function () {
    input.parentElement.classList.remove("invalid");
  });
});