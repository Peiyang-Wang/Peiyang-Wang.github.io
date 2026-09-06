const header = document.querySelector("[data-header]");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = navLinks
  .map((link) => {
    const target = document.querySelector(link.getAttribute("href"));
    return target ? { link, target } : null;
  })
  .filter(Boolean);

function updateHeaderState() {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

function updateActiveLink() {
  const marker = window.scrollY + 120;
  let activeId = "";

  sections.forEach((entry) => {
    if (entry.target.offsetTop <= marker) {
      activeId = entry.target.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = activeId && link.getAttribute("href") === `#${activeId}`;
    link.classList.toggle("is-active", Boolean(isActive));
  });
}

function initPage() {
  updateHeaderState();
  updateActiveLink();
}

window.addEventListener("scroll", () => {
  updateHeaderState();
  updateActiveLink();
}, { passive: true });

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPage, { once: true });
}

initPage();
