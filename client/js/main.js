const header = document.querySelector("[data-header]");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = navLinks
  .map((link) => {
    const target = document.querySelector(link.getAttribute("href"));
    return target ? { link, target } : null;
  })
  .filter(Boolean);

// Edit this config to replace the cursor-following elements later.
const cursorTrailConfig = {
  enabled: true,
  followEase: 0.08,
  bobAmplitude: 4,
  bobSpeed: 360,
  items: [
    { type: "emoji", content: "🤖", size: 42 },
    { type: "emoji", content: "⚙️", size: 34 },
    { type: "emoji", content: "✨", size: 30 },
    { type: "emoji", content: "⚙️", size: 34 },
    { type: "emoji", content: "✨", size: 30 }
  ]
};

function createCursorTrailItem(item, index) {
  const element = item.type === "image"
    ? document.createElement("img")
    : document.createElement("span");

  element.className = "cursor-trail-item";
  element.style.width = `${item.size}px`;
  element.style.height = `${item.size}px`;
  element.style.fontSize = `${item.size * 0.72}px`;
  element.style.zIndex = `${60 - index}`;

  if (item.type === "image") {
    element.src = item.src;
    element.alt = item.alt || "";
  } else {
    element.textContent = item.content;
  }

  return element;
}

function initCursorTrail() {
  if (!cursorTrailConfig.enabled) {
    return;
  }

  if (document.querySelector(".cursor-trail")) {
    return;
  }

  if (!window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const trailRoot = document.createElement("div");
  trailRoot.className = "cursor-trail";
  trailRoot.setAttribute("aria-hidden", "true");

  const trailItems = cursorTrailConfig.items.map((item, index) => {
    const element = createCursorTrailItem(item, index);
    trailRoot.appendChild(element);
    return element;
  });

  document.body.appendChild(trailRoot);

  const positions = trailItems.map(() => ({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  }));

  let animationFrame = 0;

  const handlePointerMove = (event) => {
    positions[0] = { x: event.clientX, y: event.clientY };
  };

  const animateTrail = () => {
    positions.forEach((position, index) => {
      const target = positions[index === 0 ? 0 : index - 1];

      if (index > 0) {
        position.x += (target.x - position.x) * cursorTrailConfig.followEase;
        position.y += (target.y - position.y) * cursorTrailConfig.followEase;
      }

      const size = cursorTrailConfig.items[index].size;
      const bob = Math.sin(Date.now() / cursorTrailConfig.bobSpeed + index) * cursorTrailConfig.bobAmplitude;

      trailItems[index].style.transform =
        `translate3d(${position.x - size / 2}px, ${position.y - size / 2 + bob}px, 0)`;
    });

    animationFrame = window.requestAnimationFrame(animateTrail);
  };

  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  animationFrame = window.requestAnimationFrame(animateTrail);

  window.addEventListener("beforeunload", () => {
    window.removeEventListener("pointermove", handlePointerMove);
    window.cancelAnimationFrame(animationFrame);
  }, { once: true });
}

function updateHeaderState() {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

function updateActiveLink() {
  const marker = window.scrollY + 140;
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

window.addEventListener("scroll", () => {
  updateHeaderState();
  updateActiveLink();
}, { passive: true });

function initPage() {
  initCursorTrail();
  updateHeaderState();
  updateActiveLink();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPage, { once: true });
}

initPage();
