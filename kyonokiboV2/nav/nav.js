(() => {
  const navItems = document.querySelectorAll(".bottom-nav .nav-item[href]");
  if (!navItems.length) {
    return;
  }

  let currentPage = window.location.pathname.split("/").pop().toLowerCase();
  if (!currentPage || currentPage === "index.html") {
    currentPage = "home.html";
  }

  navItems.forEach((item) => {
    const target = item.getAttribute("href").toLowerCase();
    const targetPage = target.split("/").pop().split("?")[0].split("#")[0];
    const isActive = targetPage === currentPage;
    item.classList.toggle("active", isActive);
    if (isActive) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  });
})();
