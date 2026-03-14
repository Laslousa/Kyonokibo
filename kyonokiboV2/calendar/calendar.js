(() => {
  const modal = document.querySelector("[data-event-modal]");
  const openButton = document.querySelector("[data-open-event-modal]");
  const closeButtons = document.querySelectorAll("[data-close-event-modal]");
  const form = document.querySelector("[data-event-form]");
  const eventsList = document.querySelector("[data-events-list]");

  if (!modal || !openButton || !form || !eventsList) {
    return;
  }

  const openModal = () => {
    modal.classList.remove("is-hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const firstInput = form.querySelector("input, textarea");
    if (firstInput) {
      firstInput.focus();
    }
  };

  const closeModal = () => {
    modal.classList.add("is-hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const escapeHtml = (value) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const formatTime = (timeValue) => {
    if (!timeValue) {
      return "--:--";
    }

    const [hours, minutes] = timeValue.split(":");
    return `${hours}:${minutes}`;
  };

  openButton.addEventListener("click", openModal);

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("is-hidden")) {
      closeModal();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const title = String(formData.get("title") || "").trim();
    const time = String(formData.get("time") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const person = String(formData.get("person") || "").trim();
    const note = String(formData.get("note") || "").trim();

    const titleSafe = escapeHtml(title);
    const timeSafe = escapeHtml(formatTime(time));
    const locationSafe = escapeHtml(location || "Lieu a confirmer");
    const personSafe = escapeHtml(person || "Vous");
    const noteSafe = note ? `<div class="appt-location">${escapeHtml(note)}</div>` : "";

    const card = document.createElement("div");
    card.className = "appointment-card";
    card.innerHTML = `
      <div class="appointment-stripe" style="background:#7BA7BC"></div>
      <div class="appointment-time" style="color:#7BA7BC">${timeSafe}</div>
      <div class="appointment-divider"></div>
      <div>
        <div class="appt-title">${titleSafe}</div>
        <div class="appt-location">&#128205; ${locationSafe}</div>
        ${noteSafe}
      </div>
      <div class="avatar-stack">
        <div class="avatar" style="width:80px;height:80px;background:linear-gradient(135deg, #9DBFA3, #9DBFA3BB);font-size:24px;box-shadow:0 4px 16px rgba(157, 191, 163, 0.33)">
          ${personSafe.charAt(0).toUpperCase()}
        </div>
        <div class="avatar-label">${personSafe}</div>
      </div>
      <button class="appointment-more" type="button">Voir plus</button>
    `;

    eventsList.appendChild(card);
    form.reset();
    closeModal();
  });
})();
