const works = document.querySelectorAll(".work");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxText = document.getElementById("lightboxText");
const lightboxClose = document.getElementById("lightboxClose");
let lastFocused = null;

function openLightbox(work) {
  const img = work.querySelector("img");
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxTitle.textContent = work.dataset.title;
  lightboxText.textContent = work.dataset.desc;
  lastFocused = work;
  lightbox.hidden = false;
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  if (lastFocused) lastFocused.focus();
}

works.forEach(function (work) {
  work.tabIndex = 0;
  work.addEventListener("click", function () { openLightbox(work); });
  work.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(work);
    }
  });
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
});