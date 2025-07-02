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
  scrollBtn.textContent = "↑";
  scrollBtn.id = "scrollToTopBtn";
  scrollBtn.title = "Back to Top";
  document.body.appendChild(scrollBtn);
  
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });
  
  // === 5. Navbar Active Link Highlight ===
  const navLinks = document.querySelectorAll("nav a");
  const currentPath = window.location.pathname.split("/").pop();
  navLinks.forEach(link => {
    if (link.href.includes(currentPath)) {
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
  