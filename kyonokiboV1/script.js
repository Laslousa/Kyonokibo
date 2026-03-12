function initNavigation() {
  const navButtons = document.querySelectorAll("[data-nav]");
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = button.dataset.nav;
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
});
