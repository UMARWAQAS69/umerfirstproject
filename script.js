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

// === 4. Scroll to Top Button ===
const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = "&#x2191;"; // Up arrow character
scrollBtn.id = "scrollToTopBtn";
scrollBtn.title = "Back to Top";
document.body.appendChild(scrollBtn);

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
      scrollBtn.style.display = "block";
  } else {
      scrollBtn.style.display = "none";
  }
});


// === 5. Navbar Active Link Highlight ===
const navLinks = document.querySelectorAll("nav a");
const currentPath = window.location.pathname.split("/").pop();
navLinks.forEach(link => {
  if (currentPath === "" || currentPath === "index.html") {
      if (link.getAttribute("href") === "index.html") {
          link.classList.add("active");
      }
  } else if (link.href.includes(currentPath)) {
      link.classList.add("active");
  }
});

// === 6. Smooth Scrolling for Anchor Links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
          target.scrollIntoView({ behavior: "smooth" });
      }
  });
});

// === 7. Animations on Scroll ===
const fadeInSections = document.querySelectorAll(".fade-in-section");

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
      }
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
});

fadeInSections.forEach(section => {
  sectionObserver.observe(section);
});


// === 8. Navigation Bar Sliding Effect ===
const navScrollContainer = document.querySelector('.nav-scroll-container');
const leftArrow = document.querySelector('.nav-arrow.left');
const rightArrow = document.querySelector('.nav-arrow.right');
const scrollAmount = 150; // Adjust this value to control scroll distance

// Variables for drag functionality
let isDown = false;
let startX;
let scrollLeft;

if (navScrollContainer) {
  // --- Mouse Drag to Scroll ---
  navScrollContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      navScrollContainer.classList.add('active-drag'); // Optional: Add a class for visual feedback during drag
      startX = e.pageX - navScrollContainer.offsetLeft;
      scrollLeft = navScrollContainer.scrollLeft;
  });

  navScrollContainer.addEventListener('mouseleave', () => {
      isDown = false;
      navScrollContainer.classList.remove('active-drag');
  });

  navScrollContainer.addEventListener('mouseup', () => {
      isDown = false;
      navScrollContainer.classList.remove('active-drag');
  });

  navScrollContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - navScrollContainer.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-fastness
      navScrollContainer.scrollLeft = scrollLeft - walk;
  });

  // --- Arrow Button Navigation ---
  if (leftArrow) {
      leftArrow.addEventListener('click', () => {
          navScrollContainer.scrollBy({
              left: -scrollAmount,
              behavior: 'smooth'
          });
      });
  }

  if (rightArrow) {
      rightArrow.addEventListener('click', () => {
          navScrollContainer.scrollBy({
              left: scrollAmount,
              behavior: 'smooth'
          });
      });
  }

  // --- Keyboard Arrow Key Navigation (for the whole document) ---
  document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          // Prevent default scroll behavior if you only want to scroll the nav
          // e.preventDefault(); // Uncomment if you want to prevent page scroll
          if (e.key === 'ArrowLeft') {
              navScrollContainer.scrollBy({
                  left: -scrollAmount,
                  behavior: 'smooth'
              });
          } else if (e.key === 'ArrowRight') {
              navScrollContainer.scrollBy({
                  left: scrollAmount,
                  behavior: 'smooth'
              });
          }
      }
  });

  // --- Hide/Show Arrows based on scroll position ---
  function updateArrowVisibility() {
      if (navScrollContainer.scrollLeft === 0) {
          leftArrow.style.opacity = '0';
          leftArrow.style.pointerEvents = 'none'; // Disable clicks when hidden
      } else {
          leftArrow.style.opacity = '1';
          leftArrow.style.pointerEvents = 'auto';
      }

      // Check if scrolled to the very end
      if (navScrollContainer.scrollLeft + navScrollContainer.clientWidth >= navScrollContainer.scrollWidth - 1) { // -1 for slight tolerance
          rightArrow.style.opacity = '0';
          rightArrow.style.pointerEvents = 'none';
      } else {
          rightArrow.style.opacity = '1';
          rightArrow.style.pointerEvents = 'auto';
      }
  }

  // Initial check
  updateArrowVisibility();

  // Update on scroll
  navScrollContainer.addEventListener('scroll', updateArrowVisibility);
  // Update on resize (if nav items change width or container changes)
  window.addEventListener('resize', updateArrowVisibility);
}