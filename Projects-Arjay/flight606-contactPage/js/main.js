function initSolidNavbar() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  // Always solid for pages without a hero
  header.classList.add("solid-header");
}

document.addEventListener("DOMContentLoaded", () => {
  initSolidNavbar();
});
