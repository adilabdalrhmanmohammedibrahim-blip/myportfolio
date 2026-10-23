const loggedIn = localStorage.getItem("loggedIn") === "true";

// Show the Dashboard button only when someone is logged in
const dashLink = document.getElementById("dashLink");
if (dashLink) {
  dashLink.hidden = !loggedIn;
}

// Any link to blog.html opens the dashboard for a logged-in person
document.addEventListener("click", function (event) {
  const link = event.target.closest("a");

  if (!link || !loggedIn) {
    return;
  }

  const href = link.getAttribute("href") || "";

  if (href === "blog.html" || href.endsWith("/blog.html")) {
    event.preventDefault();
    window.location.href = "dashboard.html";
  }
});