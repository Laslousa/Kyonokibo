const quizData = [
  {
    category: "People",
    question: "Who could this person be in your daily life?",
    help: "Pick the answer that best matches the picture.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
    answers: ["A family member", "A taxi driver", "A shop cashier"],
    correct: 0,
    correctMessage: "Nice work. This looks like a family member.",
    gentleMessage: "That is okay. This picture is meant to suggest a family member.",
  },
  {
    category: "Objects",
    question: "What object do you see here?",
    help: "Look at the shape and choose the most familiar object.",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=500&q=80",
    answers: ["A warm drink", "A shoe", "A key"],
    correct: 0,
    correctMessage: "Yes. It looks like a warm drink.",
    gentleMessage: "That is okay. The picture shows a warm drink.",
  },
  {
    category: "Daily routines",
    question: "Where would you usually use this?",
    help: "Think about everyday routines at home.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80",
    answers: ["In the bathroom", "At the bus stop", "In a classroom"],
    correct: 0,
    correctMessage: "Correct. This belongs in the bathroom.",
    gentleMessage: "That is okay. This item is usually used in the bathroom.",
  },
  {
    category: "Places",
    question: "Which place feels most calm and familiar for resting?",
    help: "Choose the place people usually use for sleeping.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=500&q=80",
    answers: ["A bedroom", "A supermarket", "A parking lot"],
    correct: 0,
    correctMessage: "Good. A bedroom is the place for resting.",
    gentleMessage: "That is okay. The best answer here is a bedroom.",
  },
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const categoryChip = document.getElementById("categoryChip");
const questionText = document.getElementById("questionText");
const questionHelp = document.getElementById("questionHelp");
const questionImage = document.getElementById("questionImage");
const answersContainer = document.getElementById("answersContainer");
const feedbackBox = document.getElementById("feedbackBox");
const nextBtn = document.getElementById("nextBtn");
const stepIndicator = document.getElementById("stepIndicator");
const quizScreen = document.getElementById("quizScreen");
const scoreScreen = document.getElementById("scoreScreen");
const scoreText = document.getElementById("scoreText");
const restartBtn = document.getElementById("restartBtn");

function loadQuestion() {
  answered = false;
  feedbackBox.className = "feedback";
  feedbackBox.textContent = "";
  nextBtn.style.display = "none";

  const current = quizData[currentQuestion];
  categoryChip.textContent = current.category;
  questionText.textContent = current.question;
  questionHelp.textContent = current.help;
  questionImage.src = current.image;
  questionImage.alt = current.question;
  stepIndicator.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;

  answersContainer.innerHTML = "";

  current.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = answer;
    button.setAttribute("aria-label", `Answer ${index + 1}: ${answer}`);
    button.addEventListener("click", () => handleAnswer(index));
    answersContainer.appendChild(button);
  });

  const firstButton = answersContainer.querySelector(".answer-btn");
  if (firstButton) {
    firstButton.focus();
  }
}

function handleAnswer(selectedIndex) {
  if (answered) {
    return;
  }

  answered = true;

  const current = quizData[currentQuestion];
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((button, index) => {
    button.disabled = true;
    button.style.cursor = "default";
    button.style.opacity = "0.9";

    if (index === current.correct) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("incorrect");
    }
  });

  if (selectedIndex === current.correct) {
    score += 1;
    feedbackBox.textContent = current.correctMessage;
    feedbackBox.className = "feedback success";
  } else {
    feedbackBox.textContent = `${current.gentleMessage} The best choice was "${current.answers[current.correct]}".`;
    feedbackBox.className = "feedback error";
  }

  nextBtn.style.display = "inline-block";
  nextBtn.focus();
}

function showScore() {
  quizScreen.style.display = "none";
  scoreScreen.style.display = "block";
  restartBtn.style.display = "inline-block";
  scoreText.textContent = `You completed ${quizData.length} gentle questions and answered ${score} correctly. Taking part is what matters most.`;
  stepIndicator.textContent = "Finished";
  restartBtn.focus();
}

nextBtn.addEventListener("click", () => {
  currentQuestion += 1;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  quizScreen.style.display = "block";
  scoreScreen.style.display = "none";
  restartBtn.style.display = "none";
  loadQuestion();
});

loadQuestion();
