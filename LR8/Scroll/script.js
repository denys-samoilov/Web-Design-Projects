let items;
let dots;
const sliderBlock = document.querySelector(".slider-block");
const carousel = document.getElementById("carousel");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const dotsContainer = document.querySelector(".dots");

const arrowsEn = document.querySelector(".arrows-en");
const dotsEn = document.querySelector(".dots-en");
const autoEn = document.querySelector(".auto-en");
const animationSpeedInput = document.querySelector(".animation-speed");

let index = 0;
let interval;
let autoplay = false;
let animationSpeed = 1000;

let imageArray = [
  "https://static.vecteezy.com/system/resources/thumbnails/001/849/553/small/modern-gold-background-free-vector.jpg",
  "https://cdn.pixabay.com/photo/2015/10/01/21/57/wallpaper-967837_1280.jpg",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xpZGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xpZGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
];

arrowsEn.addEventListener("change", () => {
  prev.style.visibility = arrowsEn.checked ? "visible" : "hidden";
  next.style.visibility = arrowsEn.checked ? "visible" : "hidden";
});

dotsEn.addEventListener("change", () => {
 dotsContainer.style.visibility = dotsEn.checked ? "visible" : "hidden";
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


function createSlider() {
  carousel.innerHTML = ""; 
  dotsContainer.innerHTML = "";
 for(let i = 0; i < imageArray.length; i++) {
    const item = document.createElement("div");
    item.classList.add("item");
    item.style.backgroundImage = `url(${imageArray[i]}) `;
    carousel.appendChild(item);

    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.setAttribute("value", i);
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
      dot.addEventListener("click", () => {
        dots.forEach((dot) => {
          dot.classList.remove("active");
        });
        index = i;
        updateSlider();
        dot.classList.add("active");
      });
}
    items = document.querySelectorAll(".item");
    dots = document.querySelectorAll(".dot");
}

function updateSlider() {
  const offset = (items.length - index) * 100 - 200;

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
  const items = document.querySelectorAll(".item");
  index = (index + 1) % items.length;
  updateSlider();
}

function prevSlide() {
  index = (index - 1 + items.length) % items.length;
  updateSlider();
}



function startAutoplay(autoplay) {
  clearInterval(interval);
  if (autoplay) {
    interval = setInterval(nextSlide, 5000);
  }
}

function stopAutoplay() {
  clearInterval(interval);
}

sliderBlock.addEventListener("mouseenter", () => {
  stopAutoplay();
});

sliderBlock.addEventListener("mouseleave", () => {
  startAutoplay(autoplay);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    nextSlide();
  } else if (e.key === "ArrowLeft") {
    prevSlide();
  }
});

createSlider();

