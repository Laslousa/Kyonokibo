const calendarEvents = {
  "2026-03-01": [
    {
      time: "09:30",
      title: "Petit-déjeuner avec Claire",
      location: "Cuisine",
      description: "Moment convivial pour commencer le mois en douceur."
    },
    {
      time: "15:00",
      title: "Atelier mémoire",
      location: "Salon",
      description: "Jeux de mémoire simples avec cartes et photos."
    }
  ],
  "2026-03-03": [
    {
      time: "10:00",
      title: "Marche douce",
      location: "Parc du quartier",
      description: "Promenade de 30 minutes avec pause sur le banc principal."
    }
  ],
  "2026-03-05": [
    {
      time: "08:45",
      title: "Prise de tension",
      location: "Maison",
      description: "Contrôle de routine avec carnet de suivi."
    },
    {
      time: "12:30",
      title: "Déjeuner",
      location: "Salle à manger",
      description: "Repas léger avec soupe et fruits."
    },
    {
      time: "17:00",
      title: "Appel vidéo famille",
      location: "Salon",
      description: "Discussion avec les petits-enfants."
    }
  ],
  "2026-03-07": [
    {
      time: "11:00",
      title: "Rendez-vous médecin",
      location: "Cabinet Dr Lefèvre",
      description:
        "Votre fille Sophie va vous accompagner et vous achètera votre glace favorite après le rendez-vous."
    },
    {
      time: "13:00",
      title: "Déjeuner",
      location: "Salle à manger",
      description:
        "Déjeuner calme à la maison avec votre repas préféré et un moment musique après le repas."
    },
    {
      time: "16:00",
      title: "Appel avec Marc",
      location: "Salon",
      description:
        "Marc vous appellera en visio pour partager des nouvelles de la famille et regarder des photos ensemble."
    }
  ],
  "2026-03-08": [
    {
      time: "10:30",
      title: "Promenade",
      location: "Parc du quartier",
      description: "Petite promenade avec pause sur un banc et discussion avec votre voisin."
    }
  ],
  "2026-03-10": [
    {
      time: "11:30",
      title: "Coiffure à domicile",
      location: "Maison",
      description: "Passage de la coiffeuse pour une coupe et un brushing."
    },
    {
      time: "18:00",
      title: "Musique détente",
      location: "Salon",
      description: "Écoute de chansons favorites pendant 20 minutes."
    }
  ],
  "2026-03-12": [
    {
      time: "09:00",
      title: "Kinésithérapie",
      location: "Centre médical",
      description: "Séance douce pour garder de la mobilité et du confort au quotidien."
    }
  ],
  "2026-03-14": [
    {
      time: "10:00",
      title: "Marché avec Marc",
      location: "Centre-ville",
      description: "Achat de fruits frais et promenade entre les étals."
    },
    {
      time: "14:30",
      title: "Lecture",
      location: "Salon",
      description: "Lecture d'un magazine illustré avec pause café."
    },
    {
      time: "16:30",
      title: "Goûter",
      location: "Cuisine",
      description: "Thé et madeleine."
    },
    {
      time: "19:00",
      title: "Rappel médicaments",
      location: "Maison",
      description: "Vérification du pilulier du soir."
    }
  ],
  "2026-03-16": [
    {
      time: "12:30",
      title: "Déjeuner avec Sophie",
      location: "Maison",
      description: "Repas partagé avec Sophie et album photos de famille après le déjeuner."
    }
  ],
  "2026-03-18": [
    {
      time: "09:30",
      title: "Exercices mobilité",
      location: "Salon",
      description: "Petite séance de mouvements doux."
    }
  ],
  "2026-03-21": [
    {
      time: "11:00",
      title: "Rendez-vous opticien",
      location: "Centre médical",
      description: "Contrôle de la vue et ajustement des lunettes."
    },
    {
      time: "15:30",
      title: "Appel avec Sophie",
      location: "Salon",
      description: "Nouvelles de la semaine et organisation du week-end."
    }
  ],
  "2026-03-24": [
    {
      time: "10:15",
      title: "Visite infirmière",
      location: "Maison",
      description: "Suivi régulier et conseils bien-être."
    },
    {
      time: "13:00",
      title: "Déjeuner",
      location: "Salle à manger",
      description: "Repas en famille."
    },
    {
      time: "16:00",
      title: "Jeu de cartes",
      location: "Salon",
      description: "Partie courte pour stimuler la mémoire."
    }
  ],
  "2026-03-27": [
    {
      time: "09:00",
      title: "Kinésithérapie",
      location: "Centre médical",
      description: "Séance de rééducation hebdomadaire."
    },
    {
      time: "12:30",
      title: "Déjeuner avec Claire",
      location: "Maison",
      description: "Repas partagé et moment convivial."
    },
    {
      time: "15:00",
      title: "Promenade",
      location: "Parc du quartier",
      description: "Balade courte selon la météo."
    },
    {
      time: "18:30",
      title: "Appel avec Marc",
      location: "Salon",
      description: "Résumé de la journée."
    },
    {
      time: "20:00",
      title: "Relaxation",
      location: "Chambre",
      description: "Exercices de respiration avant le coucher."
    }
  ],
  "2026-03-30": [
    {
      time: "14:00",
      title: "Rangement photos",
      location: "Salon",
      description: "Classement de photos de famille dans l'album."
    }
  ]
};

function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatFullFrenchDate(date) {
  const formatted = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(date);
  return capitalizeFirstLetter(formatted);
}

function formatMonthTitle(date) {
  const formatted = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric"
  }).format(date);
  return capitalizeFirstLetter(formatted);
}

function renderSelectedDayEvents(date, container, titleTarget) {
  const key = toDateKey(date);
  const events = calendarEvents[key] || [];

  if (titleTarget) {
    titleTarget.textContent = formatFullFrenchDate(date);
  }

  if (!container) return;

  if (!events.length) {
    container.innerHTML = '<p class="calendar-empty">Aucune activité planifiée pour cette journée.</p>';
    return;
  }

  container.innerHTML = events
    .map(
      (event) => `
        <article class="event-card">
          <p class="event-time">${event.time}</p>
          <p class="event-title">${event.title}</p>
          <p class="event-place">${event.location}</p>
          <p class="event-description-title">Description :</p>
          <p class="event-description">${event.description}</p>
        </article>
      `
    )
    .join("");
}

function initCalendarPage() {
  const monthGrid = document.getElementById("month-grid");
  const monthTitle = document.getElementById("month-title");
  const dayTitle = document.getElementById("selected-day-title");
  const eventsContainer = document.getElementById("selected-day-events");
  if (!monthGrid || !monthTitle || !dayTitle || !eventsContainer) return;

  const today = new Date();
  const todayKey = toDateKey(today);
  let selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekDay = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthTitle.textContent = formatMonthTitle(firstDayOfMonth);

  function renderMonth() {
    monthGrid.innerHTML = "";

    for (let i = 0; i < firstWeekDay; i += 1) {
      const emptyCell = document.createElement("div");
      emptyCell.className = "calendar-day-empty";
      monthGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const currentDate = new Date(year, month, day);
      const dateKey = toDateKey(currentDate);
      const eventCount = calendarEvents[dateKey]?.length || 0;

      const dayButton = document.createElement("button");
      dayButton.type = "button";
      dayButton.className = "calendar-day-card";
      const isToday = dateKey === todayKey;
      dayButton.innerHTML = `
        <span class="day-number">${day}</span>
        <span class="day-dots">${"•".repeat(eventCount)}</span>
        <span class="day-today-label">${isToday ? "Aujourd'hui" : ""}</span>
      `;

      if (isToday) {
        dayButton.classList.add("is-today");
      }
      if (dateKey === toDateKey(selectedDate)) {
        dayButton.classList.add("is-selected");
      }

      dayButton.addEventListener("click", () => {
        selectedDate = currentDate;
        renderMonth();
        renderSelectedDayEvents(selectedDate, eventsContainer, dayTitle);
      });

      monthGrid.appendChild(dayButton);
    }
  }

  renderMonth();
  renderSelectedDayEvents(selectedDate, eventsContainer, dayTitle);
}

document.addEventListener("DOMContentLoaded", () => {
  initCalendarPage();
});
