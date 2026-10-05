const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const filterButtons = [...document.querySelectorAll('.filter-button')];
const projectCards = [...document.querySelectorAll('.project-card')];
const projectCount = document.querySelector('.project-count');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const currentYear = document.querySelector('#current-year');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (menuToggle && siteNav) {
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Buka navigasi');
    siteNav.classList.remove('is-open');
  };

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    menuToggle.setAttribute('aria-label', isExpanded ? 'Buka navigasi' : 'Tutup navigasi');
    siteNav.classList.toggle('is-open', !isExpanded);
  });

  siteNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (event) => {
    if (!siteNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedCategory = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle('is-active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    });

    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(' ');
      const isVisible = selectedCategory === 'all' || categories.includes(selectedCategory);
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (projectCount) {
      projectCount.textContent = `MENAMPILKAN ${String(visibleCount).padStart(2, '0')} PROYEK`;
    }
  });
});

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const subject = `Diskusi proyek: ${formData.get('project-type')}`;
    const message = [
      `Nama: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Kebutuhan: ${formData.get('project-type')}`,
      '',
      formData.get('message'),
    ].join('\n');

    formStatus.textContent = 'Draft email dibuka. Tambahkan alamat penerima sebelum mengirim; form ini tidak mengirim data ke server.';
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  });
}
