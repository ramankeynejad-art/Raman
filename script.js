// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme: saved preference, else system setting
const root = document.documentElement;
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.dataset.theme = saved || (prefersDark ? "dark" : "light");

document.querySelector(".theme-toggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

// Mobile menu
const menuBtn = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => links.classList.remove("open"))
);

// Fade sections in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll(".section .container").forEach((el) => {
  el.classList.add("reveal");
  observer.observe(el);
});

// Contact form (demo: no backend yet)
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const status = e.target.querySelector(".form-status");
  status.textContent = "Thanks! Your message has been noted.";
  e.target.reset();
});
