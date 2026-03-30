/* CAROUSEL */
const images = [
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1600&q=80",
  "img/sorriso.jpg",
  "img/cirurgiaodentista.jpg",
];

const carouselEl = document.querySelector(".carousel-bg");
const dotsContainer = document.getElementById("carouselDots");
let currentIndex = 0;
let carouselTimer;

/* Preload todas as images */
images.forEach((src) => {
  const img = new Image();
  img.src = src;
});

images.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.setAttribute("aria-label", `Slide ${i + 1}`);
  dot.addEventListener("click", () => {
    goToSlide(i);
    resetTimer();
  });
  dotsContainer.appendChild(dot);
});

function updateDots() {
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === currentIndex);
  });
}

function goToSlide(i) {
  carouselEl.style.opacity = 0;
  setTimeout(() => {
    currentIndex = (i + images.length) % images.length;
    carouselEl.style.backgroundImage = `url('${images[currentIndex]}')`;
    carouselEl.style.opacity = 1;
    updateDots();
  }, 500);
}

function nextSlide() {
  goToSlide(currentIndex + 1);
  resetTimer();
}
function prevSlide() {
  goToSlide(currentIndex - 1);
  resetTimer();
}

function resetTimer() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => goToSlide(currentIndex + 1), 5500);
}

/* Init */
carouselEl.style.backgroundImage = `url('${images[0]}')`;
carouselEl.style.opacity = 1;
resetTimer();

let touchStartX = 0;
document.querySelector(".hero").addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.touches[0].clientX;
  },
  { passive: true },
);
document.querySelector(".hero").addEventListener(
  "touchend",
  (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      dx < 0 ? nextSlide() : prevSlide();
    }
  },
  { passive: true },
);

const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("section");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

sections.forEach((sec) => revealObserver.observe(sec));

const allNavTargets = document.querySelectorAll("header[id], section[id]");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + id,
          );
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" },
);

allNavTargets.forEach((el) => navObserver.observe(el));

window.addEventListener(
  "scroll",
  () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
  },
  { passive: true },
);

navbar.classList.toggle("scrolled", window.scrollY > 30);

/* MOBILE MENU HAMBURGUER */
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-menu");

toggle.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = menu.classList.toggle("active");
  toggle.setAttribute("aria-expanded", isOpen);
});

document.addEventListener("click", (e) => {
  if (
    menu.classList.contains("active") &&
    !menu.contains(e.target) &&
    !toggle.contains(e.target)
  ) {
    menu.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
  });
});
