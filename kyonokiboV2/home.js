const APPOINTMENTS = [
  {
    id: 1,
    tag: "AUJOURD'HUI - 12:00",
    title: "Rendez-vous medecin",
    location: "Cabinet Dr Lefevre",
    description:
      "Votre fille Sophie va vous accompagner et vous achetera votre glace favorite apres le rendez-vous.",
    phone: "07 23 45 67 89",
    name: "Sophie",
    urgent: true,
  },
  {
    id: 2,
    tag: "DEMAIN - 10:00",
    title: "Kinesitherapie",
    location: "Centre Pasteur",
    description:
      "Votre fils Marc vous accompagnera. N'oubliez pas vos chaussures de sport.",
    phone: "06 11 22 33 44",
    name: "Marc",
    urgent: false,
  },
];

const MONTHS = [
  "janvier",
  "fevrier",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "aout",
  "septembre",
  "octobre",
  "novembre",
  "decembre",
];

const state = {
  currentAppointment: 0,
  speaking: false,
  time: new Date(),
};

const app = document.getElementById("app");

function avatarColor(name) {
  const colors = ["#7BA7BC", "#9DBFA3", "#C4A882", "#B39BC8", "#D4896A"];
  return colors[name.charCodeAt(0) % colors.length];
}

function buildAvatar(name, size, color) {
  const initial = name.charAt(0).toUpperCase();
  const fontSize = Math.round(size * 0.4);
  return `<div class="avatar" style="width:${size}px;height:${size}px;background:linear-gradient(135deg, ${color}, ${color}BB);font-size:${fontSize}px;box-shadow:0 4px 16px ${color}55">${initial}</div>`;
}

function render() {
  const appointment = APPOINTMENTS[state.currentAppointment];
  const dayNames = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const now = state.time;
  const dayName = dayNames[now.getDay()];
  const dateStr = `${now.getDate()} ${MONTHS[now.getMonth()]}`;
  const timeStr = `${String(now.getHours()).padStart(2, "0")}h${String(now.getMinutes()).padStart(2, "0")}`;

  app.innerHTML = `
    <div class="stack">
      <div class="panel header-card">
        <div>
          <div class="eyebrow">Repere du jour</div>
          <h1 class="title">Bonjour Jean,<br>${dayName} ${dateStr}</h1>
        </div>
        <div class="time-badge">
          <div class="time-num">${timeStr}</div>
          <div class="time-date">${dateStr}</div>
        </div>
        <button class="speak-btn ${state.speaking ? "speaking" : ""}" data-action="speak" title="Lecture vocale">Audio</button>
      </div>

      <div class="panel section-card">
        <h2 class="section-title">Prochain rendez-vous</h2>
        <div class="appt-layout">
          <div>
            <div class="tag ${appointment.urgent ? "urgent" : "normal"}">
              <span class="tag-dot"></span>
              <span>${appointment.tag}</span>
            </div>
            <div class="appt-title">${appointment.title}</div>
            <div class="appt-location">Lieu: ${appointment.location}</div>
            <div class="note-box">
              <div class="note-label">Note</div>
              <div class="note-text">${appointment.description}</div>
            </div>
          </div>
          <div class="avatar-stack">
            ${buildAvatar(appointment.name, 80, avatarColor(appointment.name))}
            <div class="avatar-label">${appointment.name}</div>
            <div class="arrow-row">
              <button class="icon-btn" data-action="appt-prev" ${state.currentAppointment === 0 ? "disabled" : ""}>&lt;</button>
              <button class="icon-btn" data-action="appt-next" ${state.currentAppointment === APPOINTMENTS.length - 1 ? "disabled" : ""}>&gt;</button>
            </div>
          </div>
        </div>
        <div class="dot-row">
          ${APPOINTMENTS.map(
            (_, index) =>
              `<span class="dot-toggle ${index === state.currentAppointment ? "active" : ""}" data-action="appt-dot" data-index="${index}"></span>`,
          ).join("")}
        </div>
        <div class="contact-bar">
          <div class="contact-icon">Tel</div>
          <div class="contact-text">
            Besoin d'aide ?
            <span class="contact-phone">${appointment.phone}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  bindEvents();
}

function bindEvents() {
  document.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", () => handleAction(element.dataset.action, element));
  });
}

function handleAction(action, element) {
  switch (action) {
    case "speak":
      speakCurrentAppointment();
      break;
    case "appt-prev":
      state.currentAppointment = Math.max(0, state.currentAppointment - 1);
      render();
      break;
    case "appt-next":
      state.currentAppointment = Math.min(APPOINTMENTS.length - 1, state.currentAppointment + 1);
      render();
      break;
    case "appt-dot":
      state.currentAppointment = Number(element.dataset.index);
      render();
      break;
    default:
      break;
  }
}

function speakCurrentAppointment() {
  const appointment = APPOINTMENTS[state.currentAppointment];
  const dayNames = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const now = state.time;
  const text = `Bonjour Jean. Nous sommes ${dayNames[now.getDay()]} ${now.getDate()} ${MONTHS[now.getMonth()]}. Votre prochain rendez-vous est ${appointment.title} a ${appointment.tag.split("-")[1].trim()}.`;

  state.speaking = true;
  render();

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    utterance.onend = finishSpeaking;
    utterance.onerror = finishSpeaking;
    window.speechSynthesis.speak(utterance);
    return;
  }

  window.setTimeout(finishSpeaking, 1500);
}

function finishSpeaking() {
  state.speaking = false;
  render();
}

window.setInterval(() => {
  state.time = new Date();
  render();
}, 60000);

render();
