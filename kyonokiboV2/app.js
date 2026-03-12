const NAV_ITEMS = [
  { id: "home", label: "Accueil", icon: "\u2302" },
  { id: "calendar", label: "Calendrier", icon: "\u25a6" },
  { id: "quiz", label: "Quiz", icon: "?" },
  { id: "family", label: "Famille", icon: "\u263a" },
  { id: "settings", label: "Parametres", icon: "\u2699" },
];

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

const QUESTIONS = [
  {
    id: 1,
    category: "Personnes",
    color: "#7BA7BC",
    bg: "#EEF5FF",
    question: "Qui pourrait etre cette personne dans votre vie ?",
    hint: "Regardez bien le visage et faites confiance a votre instinct.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    answers: [
      "Un membre de la famille",
      "Un chauffeur de taxi",
      "Une caissiere",
    ],
    correct: 0,
  },
  {
    id: 2,
    category: "Lieux",
    color: "#9DBFA3",
    bg: "#F0F7F3",
    question: "Ou se trouve cet endroit ?",
    hint: "Pensez aux endroits que vous visitez souvent.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=400&fit=crop",
    answers: ["Une pharmacie", "Un supermarche", "Un hopital"],
    correct: 2,
  },
  {
    id: 3,
    category: "Objets",
    color: "#C4A882",
    bg: "#FBF7F0",
    question: "A quoi sert cet objet ?",
    hint: "C'est quelque chose que vous utilisez tous les jours.",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    answers: [
      "Mesurer la temperature",
      "Appeler quelqu'un",
      "Prendre des photos",
    ],
    correct: 0,
  },
  {
    id: 4,
    category: "Personnes",
    color: "#7BA7BC",
    bg: "#EEF5FF",
    question: "Quel est le role de cette personne ?",
    hint: "Regardez la tenue et l'environnement.",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    answers: ["Un boulanger", "Un medecin", "Un jardinier"],
    correct: 1,
  },
];

const state = {
  activeScreen: "home",
  currentAppointment: 0,
  speaking: false,
  time: new Date(),
  selectedDay: TODAY_IDX,
  weekOffset: 0,
  quizIndex: 0,
  quizSelected: null,
  quizAnswered: false,
  quizScore: 0,
  quizDone: false,
  brokenImages: {},
};

const app = document.getElementById("app");

function avatarColor(name) {
  const colors = ["#7BA7BC", "#9DBFA3", "#C4A882", "#B39BC8", "#D4896A"];
  return colors[name.charCodeAt(0) % colors.length];
}

function render() {
  app.innerHTML = `
    <div class="app-shell">
      <section class="screen ${state.activeScreen === "home" ? "active" : ""}" data-screen="home">
        ${renderHome()}
      </section>
      <section class="screen ${state.activeScreen === "calendar" ? "active" : ""}" data-screen="calendar">
        ${renderCalendar()}
      </section>
      <section class="screen ${state.activeScreen === "quiz" ? "active" : ""}" data-screen="quiz">
        ${renderQuiz()}
      </section>
      <section class="screen ${state.activeScreen === "family" ? "active" : ""}" data-screen="family">
        ${renderPlaceholder("Famille", "Ajoutez ici les contacts et reperes familiaux si vous voulez etendre l'application.")}
      </section>
      <section class="screen ${state.activeScreen === "settings" ? "active" : ""}" data-screen="settings">
        ${renderPlaceholder("Parametres", "Cette version statique n'utilise plus React. Tous les comportements sont geres en JavaScript natif.")}
      </section>
    </div>
    <nav class="bottom-nav">
      ${NAV_ITEMS.map(
        (item) => `
          <button class="nav-item ${state.activeScreen === item.id ? "active" : ""}" data-nav="${item.id}">
            <span class="nav-icon">${item.icon}</span>
            <span class="nav-label">${item.label}</span>
          </button>
        `,
      ).join("")}
    </nav>
  `;

  bindEvents();
}

function renderHome() {
  const appointment = APPOINTMENTS[state.currentAppointment];
  const now = state.time;
  const dayNames = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const dayName = dayNames[now.getDay()];
  const dateStr = `${now.getDate()} ${MONTHS[now.getMonth()]}`;
  const timeStr = `${String(now.getHours()).padStart(2, "0")}h${String(now.getMinutes()).padStart(2, "0")}`;
  const avatar = buildAvatar(appointment.name, 80, avatarColor(appointment.name));

  return `
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
            ${avatar}
            <div class="avatar-label">${appointment.name}</div>
            <div class="arrow-row">
              <button class="icon-btn" data-action="appt-prev" ${state.currentAppointment === 0 ? "disabled" : ""}>&lt;</button>
              <button class="icon-btn" data-action="appt-next" ${state.currentAppointment === APPOINTMENTS.length - 1 ? "disabled" : ""}>&gt;</button>
            </div>
          </div>
        </div>
        <div class="dot-row">
          ${APPOINTMENTS.map(
            (item, index) =>
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
}

function renderCalendar() {
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

  return `
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
            const dotColor = isThisWeek && WEEK_APPOINTMENTS[index][0] ? WEEK_APPOINTMENTS[index][0].color : "transparent";
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

function renderQuiz() {
  if (state.quizDone) {
    const percent = Math.round((state.quizScore / QUESTIONS.length) * 100);
    const emoji = percent === 100 ? "*" : percent >= 75 ? "+" : percent >= 50 ? "=" : "-";
    const bg =
      percent >= 75
        ? "linear-gradient(135deg, #9DBFA3, #7DAE94)"
        : "linear-gradient(135deg, #7BA7BC, #5D8FAE)";

    return `
      <div class="stack">
        <div class="quiz-header">
          <div class="eyebrow">Exercice du jour</div>
          <h1 class="title">Entrainement memoire</h1>
          <div class="subtitle">Prenez votre temps. Faites confiance a votre instinct.</div>
        </div>
        <div class="panel results">
          <div class="results-badge" style="background:${bg}">${emoji}</div>
          <div class="results-score">${state.quizScore} / ${QUESTIONS.length}</div>
          <div class="results-copy">${quizSummary(percent)}</div>
          <button class="primary-btn" data-action="quiz-restart">Recommencer</button>
        </div>
      </div>
    `;
  }

  const question = QUESTIONS[state.quizIndex];
  const feedback = state.quizAnswered ? renderFeedback(question) : "";
  const imageBroken = Boolean(state.brokenImages[question.id]);

  return `
    <div class="stack">
      <div class="quiz-header">
        <div class="eyebrow">Exercice du jour</div>
        <h1 class="title">Entrainement memoire</h1>
        <div class="subtitle">Prenez votre temps. Faites confiance a votre instinct.</div>
      </div>

      <div>
        <div class="progress-row">
          <div>Question ${state.quizIndex + 1} sur ${QUESTIONS.length}</div>
          <div class="score-pill">${state.quizScore} bonne${state.quizScore > 1 ? "s" : ""}</div>
        </div>
        <div class="progress-bar">
          ${QUESTIONS.map(
            (_, index) =>
              `<div class="progress-dot" style="background:${index < state.quizIndex ? question.color : "#E8EFF5"}"></div>`,
          ).join("")}
        </div>
      </div>

      <div class="panel quiz-card">
        <div class="category-bar" style="background:${question.bg}">
          <div class="category-pill" style="background:${question.color}22;color:${question.color};border:1px solid ${question.color}44">${question.category}</div>
          <div class="hint">Choisissez la meilleure reponse</div>
        </div>
        <div class="question-layout">
          <div class="question-image">
            ${
              imageBroken
                ? '<div class="image-fallback">IMG</div>'
                : `<img src="${question.image}" alt="Question" data-action="quiz-image" data-id="${question.id}">`
            }
          </div>
          <div class="question-copy">
            <div class="question-text">${question.question}</div>
            <div class="hint">${question.hint}</div>
          </div>
        </div>
        <div class="answers">
          ${question.answers.map((answer, index) => renderAnswer(question, answer, index)).join("")}
        </div>
        ${feedback}
        ${
          state.quizAnswered
            ? `<button class="primary-btn" data-action="quiz-next" style="background:${state.quizIndex + 1 >= QUESTIONS.length ? "linear-gradient(135deg, #9DBFA3, #7DAE94)" : `linear-gradient(135deg, ${question.color}, ${question.color}CC)`}">${state.quizIndex + 1 >= QUESTIONS.length ? "Voir mon resultat" : "Question suivante"}</button>`
            : ""
        }
      </div>
    </div>
  `;
}

function renderAnswer(question, answer, index) {
  const letters = ["A", "B", "C"];
  const isCorrect = state.quizAnswered && index === question.correct;
  const isWrong = state.quizAnswered && index === state.quizSelected && index !== question.correct;

  let background = "#ffffff";
  let border = "#EDF0F5";
  let color = "#2D3748";
  let badgeBg = question.bg;
  let badgeColor = question.color;
  let label = letters[index];

  if (state.quizAnswered) {
    if (isCorrect) {
      background = "linear-gradient(135deg, #9DBFA3, #7DAE94)";
      border = "#9DBFA3";
      color = "#ffffff";
      badgeBg = "rgba(255,255,255,0.25)";
      badgeColor = "#ffffff";
      label = "OK";
    } else if (isWrong) {
      background = "linear-gradient(135deg, #E07840, #D06030)";
      border = "#E07840";
      color = "#ffffff";
      badgeBg = "rgba(255,255,255,0.2)";
      badgeColor = "#ffffff";
      label = "X";
    } else {
      background = "#FAFAFA";
      border = "#F0F0F0";
      color = "#AABBCC";
      badgeBg = "#F0F0F0";
      badgeColor = "#BBCCD8";
    }
  }

  return `
    <button class="answer-btn" data-action="quiz-answer" data-index="${index}" ${state.quizAnswered ? "disabled" : ""} style="background:${background};border-color:${border};color:${color}">
      <span class="answer-badge" style="background:${badgeBg};color:${badgeColor}">${label}</span>
      <span>${answer}</span>
    </button>
  `;
}

function renderFeedback(question) {
  const correct = state.quizSelected === question.correct;
  return `
    <div class="feedback" style="background:${correct ? "#F0F7F3" : "#FFF4EE"};border:1px solid ${correct ? "#B8D9BF" : "#F5C4A2"}">
      <div class="feedback-emoji">${correct ? "+" : "!"}</div>
      <div>
        <div class="feedback-title" style="color:${correct ? "#5A9B6A" : "#C05020"}">${correct ? "Bravo" : "Pas tout a fait"}</div>
        <div class="feedback-sub" style="color:${correct ? "#7AAE8A" : "#B07050"}">${correct ? "C'est la bonne reponse. Votre memoire est en forme." : `La bonne reponse etait : ${question.answers[question.correct]}`}</div>
      </div>
    </div>
  `;
}

function renderPlaceholder(title, copy) {
  return `
    <div class="panel muted-card">
      <div class="eyebrow">Section secondaire</div>
      <h1 class="title">${title}</h1>
      <div class="muted-copy">${copy}</div>
    </div>
  `;
}

function buildAvatar(name, size, color) {
  const initial = name.charAt(0).toUpperCase();
  const fontSize = Math.round(size * 0.4);
  return `<div class="avatar" style="width:${size}px;height:${size}px;background:linear-gradient(135deg, ${color}, ${color}BB);font-size:${fontSize}px;box-shadow:0 4px 16px ${color}55">${initial}</div>`;
}

function quizSummary(percent) {
  if (percent === 100) {
    return "Parfait. Vous avez tout reussi.";
  }
  if (percent >= 75) {
    return "Tres bien. Continuez comme ca, vous progressez.";
  }
  return "Bon effort. Recommencez pour ameliorer votre score.";
}

function bindEvents() {
  app.querySelectorAll("[data-nav]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeScreen = button.dataset.nav;
      render();
    });
  });

  app.querySelectorAll("[data-action]").forEach((element) => {
    const action = element.dataset.action;
    element.addEventListener("click", () => handleAction(action, element));
  });

  app.querySelectorAll('img[data-action="quiz-image"]').forEach((image) => {
    image.addEventListener("error", () => {
      state.brokenImages[Number(image.dataset.id)] = true;
      render();
    });
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
    case "quiz-answer":
      selectAnswer(Number(element.dataset.index));
      break;
    case "quiz-next":
      nextQuestion();
      break;
    case "quiz-restart":
      restartQuiz();
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
    utterance.onend = () => {
      state.speaking = false;
      render();
    };
    utterance.onerror = () => {
      state.speaking = false;
      render();
    };
    window.speechSynthesis.speak(utterance);
  } else {
    window.setTimeout(() => {
      state.speaking = false;
      render();
    }, 1500);
  }
}

function selectAnswer(index) {
  if (state.quizAnswered) {
    return;
  }

  const question = QUESTIONS[state.quizIndex];
  state.quizSelected = index;
  state.quizAnswered = true;
  if (index === question.correct) {
    state.quizScore += 1;
  }
  render();
}

function nextQuestion() {
  if (state.quizIndex + 1 >= QUESTIONS.length) {
    state.quizDone = true;
  } else {
    state.quizIndex += 1;
    state.quizSelected = null;
    state.quizAnswered = false;
  }
  render();
}

function restartQuiz() {
  state.quizIndex = 0;
  state.quizSelected = null;
  state.quizAnswered = false;
  state.quizScore = 0;
  state.quizDone = false;
  render();
}

window.setInterval(() => {
  state.time = new Date();
  if (state.activeScreen === "home") {
    render();
  }
}, 60000);

render();
