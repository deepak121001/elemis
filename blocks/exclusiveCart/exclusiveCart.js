export default function decorate(block) {
  const carousel = document.createElement("div");
  carousel.className = "custom-carousel";

  const ul = document.createElement("ul");
  ul.className = "carousel-items";
  [...block.children].forEach((row) => {
    const li = document.createElement("li");
    li.className = "carousel-item";
    while (row.firstElementChild) li.append(row.firstElementChild);
    ul.append(li);
  });

  // Create Previous and Next buttons
  const prevBtn = document.createElement("button");
  prevBtn.className = "carousel-btn prev-btn";
  prevBtn.textContent = "←";

  const nextBtn = document.createElement("button");
  nextBtn.className = "carousel-btn next-btn";
  nextBtn.textContent = "→";

  const trackContainer = document.createElement("div");
  trackContainer.className = "carousel-track-container";
  trackContainer.appendChild(ul);

  const dotsContainer = document.createElement("div");
  dotsContainer.className = "carousel-dots";

  const slides = ul.querySelectorAll("li");
  const totalSlides = slides.length;
  let currentIndex = 0;

  // Generate dots
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "carousel-dot";
    if (index === currentIndex) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarouselPosition();
    });
    dotsContainer.appendChild(dot);
  });

  // Update carousel and dots position
  const updateCarouselPosition = () => {
    const offset = -currentIndex * slides[0].clientWidth;
    trackContainer.style.transform = `translateX(${offset}px)`;
    dotsContainer.querySelectorAll(".carousel-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
    if (currentIndex === totalSlides - 1) {
      nextBtn.style.display = "none";
    } else {
      nextBtn.style.display = "block";
    }

    if (currentIndex === 0) {
      prevBtn.style.display = "none";
    } else {
      prevBtn.style.display = "block";
    }
  };

  // Event listeners for buttons
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarouselPosition();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarouselPosition();
  });

  carousel.appendChild(trackContainer);
  carousel.appendChild(prevBtn);
  carousel.appendChild(nextBtn);

  block.textContent = "";
  block.appendChild(carousel);
  block.appendChild(dotsContainer);
  const list = document.querySelectorAll("p.button-container");
  list.forEach((button) => {
    if (button.textContent.trim() === "SHOP NOW") {
      button.classList.add("button-highlight");
      button.classList.remove("button-container");
    }
  });
  updateCarouselPosition();
}
