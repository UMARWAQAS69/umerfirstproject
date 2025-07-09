// === Preloader ===
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    lottie.loadAnimation({
      container: preloader,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'images/spinner.json'
    });
    preloader.classList.add("hide");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }
});

// === Dark Mode Toggle ===
const toggle = document.getElementById("darkModeToggle");
if (toggle) {
  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  });
  const darkPref = localStorage.getItem("darkMode");
  if (darkPref === "true") {
    document.body.classList.add("dark-mode");
    toggle.checked = true;
  }
} else {
  const darkPref = localStorage.getItem("darkMode");
  if (darkPref === "true") document.body.classList.add("dark-mode");
}

// === Particles.js ===
if (document.getElementById("particles-js")) {
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: ["#FBB6B2", "#A3BFFA"] },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#A3BFFA", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: "none", random: true }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
      modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    }
  });
  if (document.body.classList.contains("dark-mode")) {
    particlesJS("particles-js", {
      particles: { color: { value: ["#FBD38D", "#90CDF4"] }, line_linked: { color: "#90CDF4" } }
    });
  }
}

// === Custom Cursor ===
const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

const trails = [];
for (let i = 0; i < 3; i++) {
  const trail = document.createElement("div");
  trail.classList.add("cursor", "trail");
  document.body.appendChild(trail);
  trails.push(trail);
}

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  trails.forEach((trail, i) => {
    setTimeout(() => {
      trail.style.left = e.clientX + "px";
      trail.style.top = e.clientY + "px";
    }, i * 50);
  });
});

// === Hamburger Menu ===
const hamburger = document.querySelector(".hamburger");
const navUl = document.querySelector("nav ul");
if (hamburger && navUl) {
  hamburger.addEventListener("click", () => {
    navUl.classList.toggle("active");
  });
}

// === Typing Animation ===
const texts = ["O-Level Student 📘", "Web Developer 👨‍💻", "Game Creator 🎮", "MUN Delegate 🌍"];
let count = 0, index = 0, currentText = '', letter = '';
function type() {
  const typedElement = document.querySelector(".typed-text");
  if (!typedElement) return;
  if (count === texts.length) count = 0;
  currentText = texts[count];
  letter = currentText.slice(0, ++index);
  typedElement.textContent = letter;
  if (letter.length === currentText.length) {
    setTimeout(() => {
      index = 0;
      count++;
      setTimeout(type, 1500);
    }, 1000);
  } else {
    setTimeout(type, 100);
  }
}
document.addEventListener("DOMContentLoaded", type);

// === Full Page Slider ===
const sliderContainer = document.getElementById('full-page-slider-container');
if (sliderContainer) {
  const pages = document.querySelectorAll('.full-screen-page');
  const navLinks = document.querySelectorAll('nav a[data-page]');
  const leftArrow = document.querySelector('.nav-arrow.left');
  const rightArrow = document.querySelector('.nav-arrow.right');
  let currentPageIndex = 0;

  function goToPage(index) {
    if (index >= 0 && index < pages.length) {
      currentPageIndex = index;
      const offset = pages[currentPageIndex].offsetLeft;
      sliderContainer.scrollTo({ left: offset, behavior: 'smooth' });
      pages.forEach((page, i) => {
        page.classList.toggle('active-page', i === currentPageIndex);
      });
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === pages[currentPageIndex].id);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => goToPage(0));
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPageId = e.target.dataset.page;
      const targetPageIndex = Array.from(pages).findIndex(page => page.id === targetPageId);
      goToPage(targetPageIndex);
    });
  });

  leftArrow.addEventListener('click', () => goToPage(currentPageIndex - 1));
  rightArrow.addEventListener('click', () => goToPage(currentPageIndex + 1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goToPage(currentPageIndex + 1);
    else if (e.key === 'ArrowLeft') goToPage(currentPageIndex - 1);
  });

  sliderContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    sliderContainer.scrollLeft += e.deltaY;
  });
}

// === Contact Form ===
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const animation = lottie.loadAnimation({
      container: contactForm,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: 'images/success.json'
    });
    animation.addEventListener('complete', () => contactForm.reset());
  });
}

// === Project Modal ===
const projectData = {
  'clear-skies': {
    title: 'Clear Skies 🌫️',
    description: 'An awareness campaign targeting Lahore\'s smog crisis, promoting tree plantations and eco-awareness for students age 10+.',
    image: 'images/clear-skies.jpg'
  },
  'ecowrap': {
    title: 'EcoWrap ♻️',
    description: 'A startup for eco-friendly packaging alternatives, replacing harmful plastic with sustainable materials.',
    image: 'images/ecowrap.jpg'
  },
  'social-media': {
    title: 'Social Media Addiction Research 📱',
    description: 'Global Perspectives report on teenage digital habits — causes, global impacts, and powerful solutions.',
    image: 'images/social-media.jpg'
  }
};

document.querySelectorAll('.learn-more').forEach(button => {
  button.addEventListener('click', () => {
    const project = projectData[button.dataset.project];
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.description;
    document.getElementById('modal-image').src = project.image;
    document.getElementById('project-modal').classList.add('show');
  });
});

document.querySelector('.close-modal').addEventListener('click', () => {
  document.getElementById('project-modal').classList.remove('show');
});