// =========================
// Hero Image Slider with Pagination
// =========================

export function setupHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  const pagination = document.querySelector(".hero-pagination");
  let currentSlide = 0;

  if (!slides.length || !pagination) return;

  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("hero-dot");
    if (index === 0) dot.classList.add("active");
    pagination.appendChild(dot);
  });

  const dots = document.querySelectorAll(".hero-dot");

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));
    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  showSlide(currentSlide);

  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 4000);
}
