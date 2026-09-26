document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards" }
      );
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".release-card, .track, .about-copy, .cta").forEach(el => observer.observe(el));


const photoSlides = document.querySelectorAll(".photo-slide");
const photoDots = document.querySelectorAll(".photo-dot");
const photoPrev = document.querySelector(".photo-prev");
const photoNext = document.querySelector(".photo-next");
const photoCarousel = document.querySelector(".photo-carousel");

let currentPhoto = 0;
let touchStartX = 0;

function showPhoto(index) {
  currentPhoto = (index + photoSlides.length) % photoSlides.length;

  photoSlides.forEach((slide, i) => {
    slide.classList.toggle("is-active", i === currentPhoto);
  });

  photoDots.forEach((dot, i) => {
    dot.classList.toggle("is-active", i === currentPhoto);
  });
}

if (photoSlides.length) {
  photoPrev.addEventListener("click", () => showPhoto(currentPhoto - 1));
  photoNext.addEventListener("click", () => showPhoto(currentPhoto + 1));

  photoDots.forEach((dot, i) => {
    dot.addEventListener("click", () => showPhoto(i));
  });

  photoCarousel.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  photoCarousel.addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0].screenX;
    const distance = touchEndX - touchStartX;

    if (Math.abs(distance) > 45) {
      showPhoto(currentPhoto + (distance < 0 ? 1 : -1));
    }
  }, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (!photoCarousel.matches(":hover")) return;

    if (event.key === "ArrowLeft") showPhoto(currentPhoto - 1);
    if (event.key === "ArrowRight") showPhoto(currentPhoto + 1);
  });
}


const coverSlides = document.querySelectorAll(".cover-slide");
const coverPrev = document.querySelector(".cover-prev");
const coverNext = document.querySelector(".cover-next");
let currentCover = 0;

function showCover(index) {
  if (!coverSlides.length) return;
  currentCover = (index + coverSlides.length) % coverSlides.length;
  coverSlides.forEach((slide, i) => {
    slide.classList.toggle("is-active", i === currentCover);
  });
}

if (coverSlides.length) {
  coverPrev.addEventListener("click", () => showCover(currentCover - 1));
  coverNext.addEventListener("click", () => showCover(currentCover + 1));
}
