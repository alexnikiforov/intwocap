(function () {
  const button = document.getElementById("menuButton");
  const menu = document.getElementById("mobile-menu");

  if (!button || !menu) return;

  function setExpanded(next) {
    button.setAttribute("aria-expanded", String(next));
    menu.classList.toggle("hidden", !next);
  }

  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    setExpanded(!expanded);
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const expanded = button.getAttribute("aria-expanded") === "true";
    if (expanded) setExpanded(false);
  });

  // Close on resize to desktop (prevents stuck open state)
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setExpanded(false);
    }
  });

  // Close when clicking outside (mobile)
  document.addEventListener("click", (e) => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    if (!expanded) return;

    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    if (menu.contains(target) || button.contains(target)) return;
    setExpanded(false);
  });
})();