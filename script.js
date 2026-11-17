// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  menuToggle.textContent =
    navMenu.classList.contains("active") ? "✕" : "☰";
});

// Close mobile menu after clicking a link
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.textContent = "☰";
  });
});

// Dark/light mode
const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");

  themeToggle.textContent = isLight ? "☀" : "☾";

  localStorage.setItem(
    "portfolio-theme",
    isLight ? "light" : "dark"
  );
});

// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach((element) => {
  observer.observe(element);
});

// Contact form
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();

  formMessage.textContent =
    `Thanks ${name}! Your message has been received.`;

  contactForm.reset();
});


// Network dashboard frame filter
const frameFilter = document.getElementById("frame-filter");
if (frameFilter) {
  frameFilter.addEventListener("change", () => {
    const selected = frameFilter.value;
    const rows = document.querySelectorAll(".network-inventory-table tbody tr");
    let visible = 0;
    rows.forEach((row) => {
      const show = selected === "all" || row.dataset.frame === selected;
      row.hidden = !show;
      if (show) visible += 1;
    });
    const count = document.getElementById("inventory-count");
    if (count) count.textContent = `${visible} entries`;
    const frame1 = selected === "frame2" ? 0 : 3;
    const frame2 = selected === "frame1" ? 0 : 3;
    const total = selected === "all" ? 6 : 3;
    const serverKpi = document.getElementById("kpi-servers");
    const frame1Count = document.getElementById("frame1-count");
    const frame2Count = document.getElementById("frame2-count");
    const frame1Bar = document.getElementById("frame1-bar");
    const frame2Bar = document.getElementById("frame2-bar");
    if (serverKpi) serverKpi.textContent = total;
    if (frame1Count) frame1Count.textContent = frame1;
    if (frame2Count) frame2Count.textContent = frame2;
    if (frame1Bar) frame1Bar.style.width = total ? `${(frame1 / total) * 100}%` : "0%";
    if (frame2Bar) frame2Bar.style.width = total ? `${(frame2 / total) * 100}%` : "0%";
  });
}
