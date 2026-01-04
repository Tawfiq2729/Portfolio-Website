// script.js

// Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  // Animate hamburger
  const spans = navToggle.querySelectorAll("span");
  if (navMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    const spans = navToggle.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");

function setActiveLink() {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-link[href*=" + sectionId + "]")
        ?.classList.add("active");
    } else {
      document
        .querySelector(".nav-link[href*=" + sectionId + "]")
        ?.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);

// Animate on Scroll (AOS) - Custom Implementation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";

      // Animate skill progress bars
      if (entry.target.classList.contains("skill-category")) {
        animateSkillBars(entry.target);
      }
    }
  });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll("[data-aos]").forEach((el) => {
  el.style.opacity = "0";
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease";

  const animation = el.getAttribute("data-aos");

  switch (animation) {
    case "fade-up":
      el.style.transform = "translateY(50px)";
      break;
    case "fade-down":
      el.style.transform = "translateY(-50px)";
      break;
    case "fade-right":
      el.style.transform = "translateX(-50px)";
      break;
    case "fade-left":
      el.style.transform = "translateX(50px)";
      break;
    case "zoom-in":
      el.style.transform = "scale(0.8)";
      break;
    case "flip-left":
    case "flip-right":
      el.style.transform = "perspective(1000px) rotateY(30deg)";
      break;
    case "slide-up":
      el.style.transform = "translateY(100px)";
      break;
  }

  observer.observe(el);
});

// Animate skill progress bars
function animateSkillBars(container) {
  const progressBars = container.querySelectorAll(".skill-progress");

  progressBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress");
    setTimeout(() => {
      bar.style.width = progress + "%";
    }, 200);
  });
}

// Typing effect for hero subtitle
const heroSubtitle = document.querySelector(".hero-subtitle");
if (heroSubtitle) {
  const text = heroSubtitle.textContent;
  heroSubtitle.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      heroSubtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  setTimeout(typeWriter, 1000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");

  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Form submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);

    // Show success message (you can replace this with actual form submission)
    alert("Thank you for your message! I will get back to you soon.");
    contactForm.reset();

    // Here you would typically send the form data to a server
    // fetch('/api/contact', {
    //     method: 'POST',
    //     body: formData
    // })
  });
}

// Add loading animation for images
document.querySelectorAll("img").forEach((img) => {
  // Check if image is already loaded (cached)
  if (img.complete) {
    img.style.opacity = "1";
  } else {
    img.style.opacity = "0";
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });

    // Fallback in case image fails to load
    img.addEventListener("error", function () {
      this.style.opacity = "1";
    });
  }

  img.style.transition = "opacity 0.5s ease";
});

// Cursor trail effect (optional - can be removed if too distracting)
const cursorDot = document.createElement("div");
cursorDot.style.cssText = `
    width: 8px;
    height: 8px;
    background: var(--primary-color);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
`;
document.body.appendChild(cursorDot);

const cursorOutline = document.createElement("div");
cursorOutline.style.cssText = `
    width: 30px;
    height: 30px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.15s ease;
`;
document.body.appendChild(cursorOutline);

let mouseX = 0,
  mouseY = 0;
let outlineX = 0,
  outlineY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursorDot.style.left = mouseX + "px";
  cursorDot.style.top = mouseY + "px";
});

function animateCursorOutline() {
  outlineX += (mouseX - outlineX) * 0.15;
  outlineY += (mouseY - outlineY) * 0.15;

  cursorOutline.style.left = outlineX - 15 + "px";
  cursorOutline.style.top = outlineY - 15 + "px";

  requestAnimationFrame(animateCursorOutline);
}

animateCursorOutline();

// Scale cursor on hover
document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorDot.style.transform = "scale(1.5)";
    cursorOutline.style.transform = "scale(1.5)";
  });

  el.addEventListener("mouseleave", () => {
    cursorDot.style.transform = "scale(1)";
    cursorOutline.style.transform = "scale(1)";
  });
});

// Disable custom cursor on mobile
if (window.innerWidth < 768) {
  cursorDot.style.display = "none";
  cursorOutline.style.display = "none";
}

// Project card tilt effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// Counter animation for statistics (if you add stats section later)
function animateCounter(element, target, duration) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Initialize animations when page loads
window.addEventListener("load", () => {
  // Add loaded class to body for CSS animations
  document.body.classList.add("loaded");

  // Initialize any additional animations here
  console.log("Portfolio loaded successfully!");
});

// Preloader (optional)
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, 1000);
  }
});
