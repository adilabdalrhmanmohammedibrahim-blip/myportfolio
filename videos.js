// 1. Grab the elements we need
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const chips = document.querySelectorAll(".chip");
const searchForm = document.querySelector(".search");
const searchInput = document.getElementById("search");
const shorts = document.querySelectorAll(".short");
const noResults = document.getElementById("noResults");

// 2. Remember the chosen topic ("all" at the start)
let activeTopic = "all";

// 3. Open / close the sidebar
menuBtn.setAttribute("aria-expanded", "true");

menuBtn.addEventListener("click", function () {
  sidebar.hidden = !sidebar.hidden;
  menuBtn.setAttribute("aria-expanded", String(!sidebar.hidden));
});

// 4. Show or hide each video (chip + search together)
function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  shorts.forEach(function (card) {
    const matchesSearch = card.dataset.title.includes(query);
    const matchesTopic =
      activeTopic === "all" ||
      (" " + card.dataset.topic + " ").includes(" " + activeTopic + " ");

    const show = matchesSearch && matchesTopic;
    card.hidden = !show;

    if (show) {
      visibleCount++;
    }
  });

  noResults.hidden = visibleCount > 0;
}

// 5. Search while typing (and stop the page reloading on Enter)
searchInput.addEventListener("input", applyFilters);

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  applyFilters();
});

// 6. Category chips
chips.forEach(function (chip) {
  chip.setAttribute("aria-pressed", chip.classList.contains("active"));

  chip.addEventListener("click", function () {
    activeTopic = chip.textContent.trim().toLowerCase();

    chips.forEach(function (c) {
      const isActive = c === chip;
      c.classList.toggle("active", isActive);
      c.setAttribute("aria-pressed", String(isActive));
    });

    applyFilters();
  });
});