(function () {
  // ─── Nav links config ───────────────────────────────────────────────────────
  const NAV_LINKS = [
    { key: 'home',     label: 'Home',     href: '/' },
    { key: 'projects', label: 'Projects', href: '/projects/' },
    { key: 'resume',   label: 'Resume',   href: '/assets/resume.pdf', external: true },
  ];

  // ─── Social links config ────────────────────────────────────────────────────
  // TODO: Replace # with your real profile URLs
  const SOCIAL_LINKS = [
    { label: 'GitHub',   href: 'https://github.com/dshuld' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/dylan-shuldberg' },
    { label: 'Email',    href: 'mailto:dmshuldberg@gmail.com' },
  ];

  // ─── Templates ──────────────────────────────────────────────────────────────
  function buildNavLinkHTML(link) {
    const external = link.external ? 'target="_blank" rel="noopener"' : '';
    return `<a
      href="${link.href}"
      data-nav="${link.key}"
      ${external}
      class="nav-link text-[#141312]/70 dark:text-[#EDE9E0]/70 hover:text-[#141312] dark:hover:text-[#EDE9E0] font-headline tracking-tight transition-colors duration-300"
    >${link.label}</a>`;
  }

  function buildMobileNavLinkHTML(link) {
    const external = link.external ? 'target="_blank" rel="noopener"' : '';
    return `<a
      href="${link.href}"
      data-nav-mobile="${link.key}"
      ${external}
      class="mobile-nav-link block px-2 py-3 text-[#141312]/70 dark:text-[#EDE9E0]/70 hover:text-[#141312] dark:hover:text-[#EDE9E0] font-headline tracking-tight transition-colors border-b border-[#141312]/5 dark:border-[#EDE9E0]/5"
    >${link.label}</a>`;
  }

  function buildSocialLinkHTML(link) {
    return `<a
      href="${link.href}"
      class="text-[#141312]/50 dark:text-[#EDE9E0]/50 hover:text-[#017A56] dark:hover:text-[#00C47C] font-label text-sm transition-colors opacity-80 hover:opacity-100"
    >${link.label}</a>`;
  }

  const NAV_HTML = `
<nav id="site-nav" class="bg-[#F9F7F2] dark:bg-[#0D0C11] w-full sticky top-0 z-50 border-b border-[#141312]/10 dark:border-[#EDE9E0]/10">
  <div class="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
    <a href="/" class="text-xl font-bold tracking-tighter text-[#141312] dark:text-[#EDE9E0] font-headline">
      Dylan Shuldberg
    </a>
    <div id="nav-desktop-links" class="hidden md:flex items-center gap-8">
      ${NAV_LINKS.map(buildNavLinkHTML).join('\n      ')}
    </div>
    <div class="flex items-center gap-2">
      <button
        id="mobile-menu-toggle"
        aria-label="Open menu"
        aria-expanded="false"
        class="md:hidden text-[#576070] dark:text-[#EDE9E0] hover:bg-[#EEEAE2] dark:hover:bg-[#1C1A24] transition-colors duration-300 p-2 rounded-full"
      >
        <span class="material-symbols-outlined" id="mobile-menu-icon">menu</span>
      </button>
    </div>
  </div>
  <div id="mobile-menu" class="hidden md:hidden bg-[#F9F7F2] dark:bg-[#0D0C11] border-t border-[#141312]/5 dark:border-[#EDE9E0]/5">
    <div class="max-w-7xl mx-auto px-8 py-4">
      ${NAV_LINKS.map(buildMobileNavLinkHTML).join('\n      ')}
    </div>
  </div>
</nav>`;

  const FOOTER_HTML = `
<footer class="bg-[#EEEAE2] dark:bg-[#161418] w-full py-12 border-t border-[#141312]/5 dark:border-[#EDE9E0]/5 mt-auto">
  <div class="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-8 gap-4">
    <div class="text-[#576070] dark:text-[#EDE9E0] font-label text-sm">
      © ${new Date().getFullYear()} Dylan Shuldberg
    </div>
    <div class="flex items-center gap-6">
      ${SOCIAL_LINKS.map(buildSocialLinkHTML).join('\n      ')}
    </div>
  </div>
</footer>`;

  // ─── Injection ───────────────────────────────────────────────────────────────
  function inject() {
    const navEl = document.getElementById('nav-placeholder');
    if (navEl) navEl.outerHTML = NAV_HTML;

    const footerEl = document.getElementById('footer-placeholder');
    if (footerEl) footerEl.outerHTML = FOOTER_HTML;

    setActiveNav();
  }

  // ─── Active page detection ───────────────────────────────────────────────────
  function setActiveNav() {
    const path = window.location.pathname;
    let activeKey = 'home';
    if (path.startsWith('/projects')) activeKey = 'projects';

    const ACTIVE_CLASSES = [
      'text-[#017A56]', 'dark:text-[#00C47C]', 'font-bold',
      'border-b-2', 'border-[#017A56]', 'dark:border-[#00C47C]', 'pb-1'
    ];
    const INACTIVE_REMOVE = ['text-[#141312]/70', 'dark:text-[#EDE9E0]/70'];

    document.querySelectorAll('[data-nav], [data-nav-mobile]').forEach(link => {
      const key = link.dataset.nav || link.dataset.navMobile;
      if (key === activeKey) {
        link.classList.add(...ACTIVE_CLASSES);
        link.classList.remove(...INACTIVE_REMOVE);
      }
    });
  }

  // ─── Init ────────────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
