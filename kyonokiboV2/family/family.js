const modalTriggers = document.querySelectorAll("[data-open-modal]");
const modalClosers = document.querySelectorAll("[data-close-modal]");
const modals = document.querySelectorAll("[data-modal]");
const fallbackImages = document.querySelectorAll("[data-fallback-container]");

function openModal(modalId) {
  const modal = document.querySelector(`[data-modal="${modalId}"]`);

  if (!modal) {
    return;
  }

  modal.classList.remove("is-hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-modal");
}

function closeModal(modal) {
  modal.classList.add("is-hidden");
  modal.setAttribute("aria-hidden", "true");

  const hasOpenModal = Array.from(modals).some((item) => !item.classList.contains("is-hidden"));
  document.body.classList.toggle("has-modal", hasOpenModal);
}

// Cards are read-only on this page: disable modal opening from card clicks.
modalTriggers.forEach((trigger) => {
  trigger.setAttribute("aria-hidden", "true");
  trigger.setAttribute("tabindex", "-1");
  trigger.disabled = true;
});

modalClosers.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest("[data-modal]");
    if (modal) {
      closeModal(modal);
    }
  });
});

modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

fallbackImages.forEach((image) => {
  image.addEventListener("error", () => {
    const container = image.parentElement;
    if (container) {
      container.classList.add("is-broken");
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  const openModalElement = Array.from(modals).find((modal) => !modal.classList.contains("is-hidden"));
  if (openModalElement) {
    closeModal(openModalElement);
  }
});
