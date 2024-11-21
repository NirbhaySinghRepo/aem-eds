export default async function decorate(block) {
  const title = block.querySelector(".mediaHeading")?.innerHTML || "";
  const description = block.querySelector(".mediaDescription")?.innerHTML || "";
  const images = [...block.querySelectorAll(".image img")];

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
