export default function decorate(block) {
  const title = block.querySelector(".title")?.innerHTML || "";
  const description = block.querySelector(".description")?.innerHTML || "";
  const images = [...block.querySelectorAll(".images img")];

  let currentIndex = 0;

  function updateCarousel() {
    images.forEach((img, index) => {
      img.style.display = index === currentIndex ? "block" : "none";
    });
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  }

  setInterval(nextImage, 3000);

  block.innerHTML = `
  <div class="media-carousel">
  <div class="carousel-content">
  <div class="carousel-title">${title}</div>
  <div class="carousel-description">${description}</div>
  <div class="carousel-images">
            ${images
              .map((img) => `<img src="${img.src}" alt="${img.alt}" />`)
              .join("")}
  </div>
  </div>
  </div>
    `;

  updateCarousel();
}
