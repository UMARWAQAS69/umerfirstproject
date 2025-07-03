// === 1. Preloader ===
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.display = "none";
  }
});

// === 2. Dark Mode Toggle ===
const toggle = document.getElementById("darkModeToggle");
if (toggle) {
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Load saved preference
const darkPref = localStorage.getItem("darkMode");
if (darkPref === "true") {
  document.body.classList.add("dark-mode");
  toggle.checked = true;
}
}

// === 3. Typing Animation ===
const texts = ["O-Level Student 📘", "Web Developer 👨‍💻", "Game Creator 🎮", "MUN Delegate 🌍"];
let count = 0, index = 0, currentText = '', letter = '';
function type() {
if (count === texts.length) count = 0;
currentText = texts[count];
letter = currentText.slice(0, ++index);
const typedElement = document.querySelector(".typed-text");
if (typedElement) typedElement.textContent = letter;

if (letter.length === currentText.length) {
  setTimeout(() => {
    index = 0;
    count++;
    setTimeout(type, 500);
  }, 1500);
} else {
  setTimeout(type, 100);
}
}
document.addEventListener("DOMContentLoaded", type);


// === 4. Full Page Slider & Navigation ===
const sliderContainer = document.getElementById('full-page-slider-container');
const pages = document.querySelectorAll('.full-screen-page');
const navLinks = document.querySelectorAll('nav a[data-page]');
const leftArrow = document.querySelector('.nav-arrow.left');
const rightArrow = document.querySelector('.nav-arrow.right');

let currentPageIndex = 0;

// Function to update page visibility and scroll position
function goToPage(index) {
if (index >= 0 && index < pages.length) {
  currentPageIndex = index;
  const offset = pages[currentPageIndex].offsetLeft;
  sliderContainer.scrollTo({
    left: offset,
    behavior: 'smooth'
  });

  // Update active class for pages and nav links
  pages.forEach((page, i) => {
    if (i === currentPageIndex) {
      page.classList.add('active-page');
    } else {
      page.classList.remove('active-page');
    }
  });

  navLinks.forEach(link => {
    if (link.dataset.page === pages[currentPageIndex].id) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
}

// Initial page load
document.addEventListener('DOMContentLoaded', () => {
goToPage(0); // Start on the first page (Home)
});

// Navigation by clicking nav links
navLinks.forEach(link => {
link.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent default anchor jump
  const targetPageId = e.target.dataset.page;
  const targetPageIndex = Array.from(pages).findIndex(page => page.id === targetPageId);
  goToPage(targetPageIndex);
});
});

// Navigation by arrow buttons
leftArrow.addEventListener('click', () => {
goToPage(currentPageIndex - 1);
});

rightArrow.addEventListener('click', () => {
goToPage(currentPageIndex + 1);
});

// Keyboard navigation (optional)
document.addEventListener('keydown', (e) => {
if (e.key === 'ArrowRight') {
  goToPage(currentPageIndex + 1);
} else if (e.key === 'ArrowLeft') {
  goToPage(currentPageIndex - 1);
}
});

// Mouse wheel / trackpad horizontal scrolling
sliderContainer.addEventListener('wheel', (e) => {
e.preventDefault(); // Prevent vertical scrolling of the whole page
sliderContainer.scrollLeft += e.deltaY; // Scroll horizontally based on vertical wheel input
});

// === 5. Contact Form Submission Alert ===
// This script is placed here to ensure it runs after the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message sent! I will get back to you soon.');
    this.reset();
  });
}
});