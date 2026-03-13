(() => {
  const navButtons = document.querySelectorAll('.floating-nav .fnav-btn[href]');
  if (!navButtons.length) {
    return;
  }

  let currentPage = window.location.pathname.split('/').pop().toLowerCase();
  if (!currentPage || currentPage === 'index.html') {
    currentPage = 'home.html';
  }

  navButtons.forEach((button) => {
    const target = button.getAttribute('href').toLowerCase();
    const targetPage = target.split('/').pop().split('?')[0].split('#')[0];
    const isActive = targetPage === currentPage;

    button.classList.toggle('active', isActive);
    if (isActive) {
      button.setAttribute('aria-current', 'page');
    } else {
      button.removeAttribute('aria-current');
    }
  });
})();
