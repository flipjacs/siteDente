const images = [
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
  "img/sorriso.jpg",
  "img/cirurgiaodentista.jpg"
];

const carousel = document.querySelector(".carousel-bg");
let index = 0;
let interval;

images.forEach(src => {
  const img = new Image();
  img.src = src;
});

/* imagem inicial */
carousel.style.backgroundImage = `url('${images[index]}')`;
carousel.style.opacity = 1;

/* FUNÇÃO CENTRAL */
function showImage(i) {
  carousel.style.opacity = 0;

  setTimeout(() => {
    index = (i + images.length) % images.length;
    carousel.style.backgroundImage = `url('${images[index]}')`;
    carousel.style.opacity = 1;
  }, 600);
}

function startCarousel() {
  interval = setInterval(() => {
    showImage(index + 1);
  }, 5000);
}

function resetCarousel() {
  clearInterval(interval);
  startCarousel();
}

/* SETAS */
function nextSlide() {
  showImage(index + 1);
  resetCarousel();
}

function prevSlide() {
  showImage(index - 1);
  resetCarousel();
}

startCarousel();

// animações sections
const sections = document.querySelectorAll('section');
function showSections(){
  const trigger = window.innerHeight * 0.85;
  sections.forEach(sec=>{
    if(sec.getBoundingClientRect().top < trigger){
      sec.classList.add('show');
    }
  });
}
window.addEventListener('scroll', showSections);
showSections();

const navLinks = document.querySelectorAll('nav a');
const spySections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  spySections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
});

    // MENU MOBILE
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-menu');

toggle.addEventListener('click', (e) => {
  e.stopPropagation();
  menu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (
    menu.classList.contains('active') &&
    !menu.contains(e.target) &&
    !toggle.contains(e.target)
  ) {
    menu.classList.remove('active');
  }
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('active');
  });
});
