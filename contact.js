// 1. Grab the elements we need
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("cName");
const emailInput = document.getElementById("cEmail");
const messageInput = document.getElementById("cMessage");
const counter = document.getElementById("msgCount");
const status = document.getElementById("contactStatus");
const sendBtn = document.getElementById("contactBtn");
const fields = [nameInput, emailInput, messageInput];

// 2. Small helpers
function showStatus(text, type) {
  status.textContent = text;
  status.className = "m-status " + type;
}

function setInvalid(input, isInvalid) {
  input.closest(".m-field").classList.toggle("invalid", isInvalid);
}

function showError(input, text) {
  setInvalid(input, true);
  showStatus(text, "error");
  input.focus();
}

// 3. Count the letters in the message
messageInput.addEventListener("input", function () {
  counter.textContent = messageInput.value.length + " / 1000";
});

// 4. Remove the red border when the person starts typing again
fields.forEach(function (input) {
  input.addEventListener("input", function () {
    setInvalid(input, false);
  });
});

// 5. Check the form, then send it
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  fields.forEach(function (input) {
    setInvalid(input, false);
  });

  if (name.length < 2) {
    showError(nameInput, "Please enter your name.");
    return;
  }

  if (!looksLikeEmail) {
    showError(emailInput, "Please enter a valid email address.");
    return;
  }

  if (message.length < 10) {
    showError(messageInput, "Please write a message of at least 10 characters.");
    return;
  }

  // the form address has not been replaced yet
  if (form.action.includes("YOUR_FORM_ID")) {
    showStatus("The form is not connected yet. Replace YOUR_FORM_ID with your real form address.", "error");
    return;
  }

  sendBtn.disabled = true;
  showStatus("Sending...", "success");

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      showStatus("Thank you! Your message was sent. I will reply soon.", "success");
      form.reset();
      counter.textContent = "0 / 1000";
    } else {
      showStatus("Something went wrong. Please try again later.", "error");
    }
  } catch (error) {
    showStatus("No connection. Check your internet and try again.", "error");
  } finally {
    sendBtn.disabled = false;
  }
});