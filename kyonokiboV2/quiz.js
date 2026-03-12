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
  quizIndex: 0,
  quizSelected: null,
  quizAnswered: false,
  quizScore: 0,
  quizDone: false,
  brokenImages: {},
};

const app = document.getElementById("app");

function quizSummary(percent) {
  if (percent === 100) {
    return "Parfait. Vous avez tout reussi.";
  }
  if (percent >= 75) {
    return "Tres bien. Continuez comme ca, vous progressez.";
  }
  return "Bon effort. Recommencez pour ameliorer votre score.";
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

function render() {
  if (state.quizDone) {
    const percent = Math.round((state.quizScore / QUESTIONS.length) * 100);
    const emoji = percent === 100 ? "*" : percent >= 75 ? "+" : percent >= 50 ? "=" : "-";
    const bg =
      percent >= 75
        ? "linear-gradient(135deg, #9DBFA3, #7DAE94)"
        : "linear-gradient(135deg, #7BA7BC, #5D8FAE)";

    app.innerHTML = `
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
    bindEvents();
    return;
  }

  const question = QUESTIONS[state.quizIndex];
  const imageBroken = Boolean(state.brokenImages[question.id]);

  app.innerHTML = `
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
        ${state.quizAnswered ? renderFeedback(question) : ""}
        ${
          state.quizAnswered
            ? `<button class="primary-btn" data-action="quiz-next" style="background:${state.quizIndex + 1 >= QUESTIONS.length ? "linear-gradient(135deg, #9DBFA3, #7DAE94)" : `linear-gradient(135deg, ${question.color}, ${question.color}CC)`}">${state.quizIndex + 1 >= QUESTIONS.length ? "Voir mon resultat" : "Question suivante"}</button>`
            : ""
        }
      </div>
    </div>
  `;

  bindEvents();
}

function bindEvents() {
  document.querySelectorAll("[data-action]").forEach((element) => {
    if (element.dataset.action === "quiz-image") {
      element.addEventListener("error", () => {
        state.brokenImages[Number(element.dataset.id)] = true;
        render();
      });
      return;
    }

    element.addEventListener("click", () => handleAction(element.dataset.action, element));
  });
}

function handleAction(action, element) {
  switch (action) {
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

render();
