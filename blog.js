// ---------- 1. Grab the elements ----------
const searchInput = document.getElementById("blogSearch");
const cards = document.querySelectorAll(".card");
const categoryButtons = document.querySelectorAll(".cat");
const noResults = document.getElementById("noResults");

let activeCategory = "all";

// ---------- 2. Show or hide cards (search + category together) ----------
function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach(function (card) {
    const matchesSearch = card.textContent.toLowerCase().includes(query);
    const matchesCategory =
      activeCategory === "all" || card.dataset.category === activeCategory;

    const show = matchesSearch && matchesCategory;
    card.hidden = !show;

    if (show) {
      visibleCount++;
    }
  });

  noResults.hidden = visibleCount > 0;
}

// ---------- 3. Search while typing ----------
searchInput.addEventListener("input", applyFilters);

// ---------- 4. Category buttons ----------
categoryButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const clicked = button.dataset.category;

    // clicking the active category again clears the filter
    if (activeCategory === clicked) {
      activeCategory = "all";
    } else {
      activeCategory = clicked;
    }

    categoryButtons.forEach(function (b) {
      b.classList.toggle("active", b.dataset.category === activeCategory);
    });

    applyFilters();
  });
});

// ---------- 5. Newsletter form ----------
const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");
const newsletterMessage = document.getElementById("newsletterMessage");

function showNewsletterMessage(text, type) {
  newsletterMessage.textContent = text;
  newsletterMessage.className = "newsletter-message " + type;
}

newsletterForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = newsletterEmail.value.trim();
  const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (email === "") {
    showNewsletterMessage("Please enter your email address.", "error");
    return;
  }

  if (!looksLikeEmail) {
    showNewsletterMessage("That email does not look right. Check it and try again.", "error");
    return;
  }

  showNewsletterMessage("Thank you for subscribing!", "success");
  newsletterForm.reset();
});