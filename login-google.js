

import { auth } from "./firebase.js";
import {
    
  GoogleAuthProvider,
  signInWithPopup
} 


from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

const googleBtn = document.getElementById("googleBtn");
const message = document.getElementById("formMessage");
const provider = new GoogleAuthProvider();

function showMessage(text, type) {
  message.textContent = text;
  message.className = "form-message " + type;
}

// Turn Firebase's error codes into plain words
function friendlyError(error) {
  switch (error.code) {
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Sign-in was cancelled.";
    case "auth/popup-blocked":
      return "Your browser blocked the sign-in window. Allow pop-ups for this site and try again.";
    case "auth/unauthorized-domain":
      return "This address is not allowed yet. Open the site at localhost, or add this domain in Firebase.";
    case "auth/network-request-failed":
      return "No connection. Check your internet and try again.";
    default:
            return "Google sign-in failed (" + error.code + "). Please try again.";
  }
}

googleBtn.addEventListener("click", async function () {
  googleBtn.disabled = true;
  showMessage("Opening Google...", "success");

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // temporary: keeps the current dashboard working until Step 4
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", user.email);

    showMessage("Signed in as " + user.email + ". Redirecting...", "success");

    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 1000);
  }
     catch (error) {
    console.error(error);
    showMessage(friendlyError(error), "error");
    googleBtn.disabled = false;
  }
   
});