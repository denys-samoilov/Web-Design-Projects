const sliderBlock = document.querySelector(".slider-block");
const carousel = document.getElementById("carousel");
const items = document.querySelectorAll(".item");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");

const arrowsEn = document.querySelector(".arrows-en");
const dotsEn = document.querySelector(".dots-en");
const autoEn = document.querySelector(".auto-en");
const animationSpeedInput = document.querySelector(".animation-speed");

let index = 0;
let interval;
let autoplay = true;
let animationSpeed = 1000;

let imageArray = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xpZGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xpZGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xpZGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xpZGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xpZGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
];

arrowsEn.addEventListener("change", () => {
  prev.style.display = arrowsEn.checked ? "block" : "none";
  next.style.display = arrowsEn.checked ? "block" : "none";
});

dotsEn.addEventListener("change", () => {
  dots.forEach((dot) => {
    dot.style.display = dotsEn.checked ? "block" : "none";
  });
});

autoEn.addEventListener("change", () => {
  if (autoEn.checked) {
    autoplay = true;
    startAutoplay(autoplay);
  } else {
    autoplay = false;
    stopAutoplay();
  }
});

animationSpeedInput.addEventListener("change", () => {
  animationSpeed = animationSpeedInput.value;
  items.forEach((item) => {
    item.style.transitionDuration = `${animationSpeed}ms`;
  })});


next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    dots.forEach((dot) => dot.classList.remove("active"));
    dot.classList.add("active");
    index = i;
    updateSlider();
  });
});

function createSlider() {
  imageArray.forEach((src) => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.style.backgroundImage = `url(${src})`;
    carousel.appendChild(item);
  });
}

function updateSlider() {
  const offset = (items.length - index - 1) * 100;

  items.forEach((item) => {
    item.style.transform = `translateX(${offset}%)`;

  });

  updateDots();
}

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  index = (index + 1) % items.length;
  updateSlider();
}

function prevSlide() {
  index = (index - 1 + items.length) % items.length;
  updateSlider();
}



function startAutoplay(autoplay) {
  if (autoplay) {
    interval = setInterval(nextSlide, 5000);
  }
}

function stopAutoplay() {
  clearInterval(interval);
}

sliderBlock.addEventListener("mouseenter", stopAutoplay);
sliderBlock.addEventListener("mouseleave", startAutoplay);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    nextSlide();
  } else if (e.key === "ArrowLeft") {
    prevSlide();
  }
});

startAutoplay();