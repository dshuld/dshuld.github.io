(function () {
  // ─── Mobile Menu ─────────────────────────────────────────────────────────────
  function initMobileMenu() {
    document.addEventListener('click', function (e) {
      const toggleBtn = e.target.closest('#mobile-menu-toggle');
      if (!toggleBtn) return;

      const menu = document.getElementById('mobile-menu');
      const icon = document.getElementById('mobile-menu-icon');
      if (!menu) return;
      const isOpen = !menu.classList.toggle('hidden');
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      if (icon) icon.textContent = isOpen ? 'close' : 'menu';
    });
  }

  // ─── Init ────────────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
})();
