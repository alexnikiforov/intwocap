// Mobile menu + theme toggle (persisted)
// - Default: Light
// - Persist: localStorage key "theme" => "light" | "dark"

(function () {
  const root = document.documentElement;

  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const themeToggleMobile = document.getElementById("themeToggleMobile");
  const themeIconMobile = document.getElementById("themeIconMobile");

  const menuToggle = document.getElementById("menuToggle");
  const menuIcon = document.getElementById("menuIcon");
  const mobileMenu = document.getElementById("mobileMenu");

  function setTheme(theme) {
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);

    // Update toggle states/icons
    const iconClass = isDark ? "fa-sun" : "fa-moon";
    const removeClass = isDark ? "fa-moon" : "fa-sun";

    if (themeIcon) {
      themeIcon.classList.remove(removeClass);
      themeIcon.classList.add(iconClass);
    }
    if (themeIconMobile) {
      themeIconMobile.classList.remove(removeClass);
      themeIconMobile.classList.add(iconClass);
    }

    if (themeToggle) themeToggle.setAttribute("aria-pressed", String(isDark));
    if (themeToggleMobile) themeToggleMobile.setAttribute("aria-pressed", String(isDark));
  }

  function initTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      return;
    }
    // Default to light (as requested). If you prefer system, swap this logic.
    setTheme("light");
  }

  function toggleTheme() {
    const isDark = root.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  }

  function setMenuOpen(open) {
    if (!mobileMenu || !menuToggle) return;

    mobileMenu.classList.toggle("hidden", !open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");

    if (menuIcon) {
      menuIcon.classList.toggle("fa-bars", !open);
      menuIcon.classList.toggle("fa-xmark", open);
    }

    // Animate only when opening
    if (open) {
      mobileMenu.classList.remove("menu-animate");
      // Force reflow to restart animation
      void mobileMenu.offsetWidth;
      mobileMenu.classList.add("menu-animate");
    }
  }

  function initMenu() {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.contains("hidden");
      setMenuOpen(isHidden);
    });

    // Close menu when clicking a link
    mobileMenu.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.tagName === "A") setMenuOpen(false);
    });

    // Close menu on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    });
  }

  // Wire toggles
  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener("click", toggleTheme);

  initTheme();
  initMenu();
})();