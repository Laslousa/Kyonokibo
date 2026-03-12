const DAYS_SHORT = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const DAYS_FULL = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
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
const TODAY_IDX = 3;

const WEEK_APPOINTMENTS = {
  0: [],
  1: [
    {
      id: 2,
      time: "10:00",
      title: "Kinesitherapie",
      location: "Centre Pasteur",
      name: "Marc",
      color: "#6A96C8",
    },
  ],
  2: [],
  3: [
    {
      id: 1,
      time: "12:00",
      title: "Rendez-vous medecin",
      location: "Cabinet Dr Lefevre",
      name: "Sophie",
      color: "#E07840",
    },
  ],
  4: [
    {
      id: 3,
      time: "14:30",
      title: "Coiffeur",
      location: "Salon Belle Vue",
      name: "Marie",
      color: "#9DBFA3",
    },
  ],
  5: [],
  6: [
    {
      id: 4,
      time: "11:00",
      title: "Dejeuner en famille",
      location: "Chez Sophie",
      name: "Sophie",
      color: "#C4A882",
    },
  ],
};

const state = {
  selectedDay: TODAY_IDX,
  weekOffset: 0,
};

const app = document.getElementById("app");

function buildAvatar(name, size, color) {
  const initial = name.charAt(0).toUpperCase();
  const fontSize = Math.round(size * 0.4);
  return `<div class="avatar" style="width:${size}px;height:${size}px;background:linear-gradient(135deg, ${color}, ${color}BB);font-size:${fontSize}px;box-shadow:0 4px 16px ${color}55">${initial}</div>`;
}

function renderCalendarAppointment(appointment) {
  return `
    <div class="appointment-card">
      <div class="appointment-stripe" style="background:${appointment.color}"></div>
      <div class="appointment-time" style="color:${appointment.color}">${appointment.time}</div>
      <div class="appointment-divider"></div>
      <div>
        <div><strong>${appointment.title}</strong></div>
        <div class="appt-location">Lieu: ${appointment.location}</div>
      </div>
      <div class="avatar-stack">
        ${buildAvatar(appointment.name, 44, appointment.color)}
        <div class="avatar-label" style="color:${appointment.color}">${appointment.name}</div>
      </div>
    </div>
  `;
}

function renderEmptyDay() {
  return `
    <div class="empty-state">
      <div class="empty-icon">O</div>
      <div class="empty-title">Journee libre</div>
      <div class="subtitle">Aucun rendez-vous ce jour-la. Profitez de votre repos.</div>
    </div>
  `;
}

function render() {
  const baseMonday = new Date(2026, 2, 9);
  baseMonday.setDate(baseMonday.getDate() + state.weekOffset * 7);

  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(baseMonday);
    day.setDate(day.getDate() + index);
    return day;
  });

  const isThisWeek = state.weekOffset === 0;
  const firstMonth = weekDates[0].getMonth();
  const lastMonth = weekDates[6].getMonth();
  const monthLabel =
    firstMonth === lastMonth
      ? `${MONTHS[firstMonth]} ${weekDates[0].getFullYear()}`
      : `${MONTHS[firstMonth]} - ${MONTHS[lastMonth]} ${weekDates[6].getFullYear()}`;

  const appointments = (isThisWeek ? WEEK_APPOINTMENTS[state.selectedDay] : []) || [];
  const detailDate = weekDates[state.selectedDay];

  app.innerHTML = `
    <div class="stack">
      <div class="calendar-header">
        <div class="eyebrow">Votre planning</div>
        <h1 class="title">Calendrier</h1>
      </div>

      <div class="week-nav">
        <button class="icon-btn" data-action="week-prev">&lt;</button>
        <div>
          <div class="week-label">${monthLabel}</div>
          ${state.weekOffset !== 0 ? '<button class="pill-btn" data-action="week-today">Aujourd\'hui</button>' : ""}
        </div>
        <button class="icon-btn" data-action="week-next">&gt;</button>
      </div>

      <div class="day-strip">
        ${weekDates
          .map((date, index) => {
            const firstAppointment = WEEK_APPOINTMENTS[index] ? WEEK_APPOINTMENTS[index][0] : null;
            const dotColor = isThisWeek && firstAppointment ? firstAppointment.color : "transparent";
            const classes = [
              "day-pill",
              state.selectedDay === index ? "selected" : "",
              isThisWeek && index === TODAY_IDX ? "today" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return `
              <button class="${classes}" data-action="day-select" data-index="${index}">
                <div class="day-abbr">${DAYS_SHORT[index]}</div>
                <div class="day-num">${date.getDate()}</div>
                <div class="day-dot" style="background:${state.selectedDay === index && dotColor !== "transparent" ? "rgba(255,255,255,0.7)" : dotColor}"></div>
              </button>
            `;
          })
          .join("")}
      </div>

      <div class="detail-block">
        <div class="detail-heading">
          <div class="detail-title">${DAYS_FULL[state.selectedDay]}</div>
          ${isThisWeek && state.selectedDay === TODAY_IDX ? '<span class="today-chip">Aujourd\'hui</span>' : ""}
        </div>
        <div class="detail-date">${detailDate.getDate()} ${MONTHS[detailDate.getMonth()]} ${detailDate.getFullYear()}</div>
        ${appointments.length ? appointments.map(renderCalendarAppointment).join("") : renderEmptyDay()}
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
    case "week-prev":
      state.weekOffset -= 1;
      render();
      break;
    case "week-next":
      state.weekOffset += 1;
      render();
      break;
    case "week-today":
      state.weekOffset = 0;
      state.selectedDay = TODAY_IDX;
      render();
      break;
    case "day-select":
      state.selectedDay = Number(element.dataset.index);
      render();
      break;
    default:
      break;
  }
}

render();
