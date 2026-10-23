import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
// 1. Grab the elements we need
const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const toggleBtn = document.getElementById("togglePassword");
const message = document.getElementById("formMessage");
const forgotLink = document.getElementById("forgotLink");
const loginBtn = form.querySelector("button[type='submit']");

// 2. Show / hide password
toggleBtn.addEventListener("click", function () {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  toggleBtn.textContent = isHidden ? "🙈" : "👁️";
  toggleBtn.setAttribute("aria-label", isHidden ? "Hide password" : "Show password");
});

// 3. Small helpers
function showMessage(text, type) {
  message.textContent = text;
  message.className = "form-message " + type;
}

function setInvalid(input, isInvalid) {
  input.parentElement.classList.toggle("invalid", isInvalid);
}

function showError(input, text) {
  setInvalid(input, true);
  showMessage(text, "error");
  input.focus();
}

function looksLikeEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Turn Firebase's error codes into plain words
function friendlyError(error) {
  switch (error.code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Wrong email or password.";
    case "auth/invalid-email":
      return "That email does not look right.";
    case "auth/too-many-requests":
      return "Too many tries. Wait a few minutes, or reset your password.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/network-request-failed":
      return "No connection. Check your internet and try again.";
    default:
      return "Something went wrong (" + error.code + "). Please try again.";
  }
}

// 4. Login
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  setInvalid(emailInput, false);
  setInvalid(passwordInput, false);

  if (!looksLikeEmail(email)) {
    showError(emailInput, "Please enter a valid email address.");
    return;
  }

  if (password === "") {
    showError(passwordInput, "Please enter your password.");
    return;
  }

  loginBtn.disabled = true;
  showMessage("Signing in...", "success");

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    // temporary: keeps the current dashboard working until Step 4
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", result.user.email);

    showMessage("Login successful! Redirecting...", "success");

    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 1000);
  } catch (error) {
    showMessage(friendlyError(error), "error");
    loginBtn.disabled = false;
  }
});

// 5. Forgot password
forgotLink.addEventListener("click", async function (event) {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (!looksLikeEmail(email)) {
    showError(emailInput, "Type your email address above first, then click Forgot Password.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    showMessage(
      "If an account exists for " + email + ", a reset link is on its way. Check your spam folder too.",
      "success"
    );
  } catch (error) {
    showMessage(friendlyError(error), "error");
  }
});

// 6. Remove the red border when the person starts typing again
[emailInput, passwordInput].forEach(function (input) {
  input.addEventListener("input", function () {
    setInvalid(input, false);
  });
});

// 7. Continue with Google
const googleBtn = document.getElementById("googleBtn");

googleBtn.addEventListener("click", async function () {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", result.user.email);

    window.location.href = "dashboard.html";
  } catch (error) {
    showMessage(friendlyError(error), "error");
  }
});