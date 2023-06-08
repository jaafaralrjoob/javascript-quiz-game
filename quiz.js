const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    answer: "Paris",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Vincent van Gogh",
      "Michelangelo",
    ],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Jupiter", "Saturn", "Earth", "Mars"],
    answer: "Jupiter",
  },
];

let currentQuestion = 0;
let score = 0;

// Function to load the current question
function loadQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");

  questionElement.textContent = quizData[currentQuestion].question;
  optionsElement.innerHTML = "";

  quizData[currentQuestion].options.forEach((option, index) => {
    const optionElement = document.createElement("li");
    optionElement.className = "option";
    optionElement.textContent = option;
    optionElement.setAttribute("data-index", index);
    optionElement.onclick = selectOption;

    optionsElement.appendChild(optionElement);
  });
}

// Function to select an option
function selectOption(event) {
  const selectedOption = event.target;
  const selectedOptionIndex = selectedOption.getAttribute("data-index");
  const correctAnswer = quizData[currentQuestion].answer;

  if (selectedOption.textContent === correctAnswer) {
    score++;
    selectedOption.style.backgroundColor = "#b1ff8f";
  } else {
    selectedOption.style.backgroundColor = "#ff8f8f";
    document.querySelector(
      `[data-index="${quizData[currentQuestion].options.indexOf(
        correctAnswer
      )}"]`
    ).style.backgroundColor = "#b1ff8f";
  }

  disableOptions();

  const submitButton = document.getElementById("submitBtn");
  submitButton.textContent = "Next";

  submitButton.onclick = nextQuestion;
}

// Function to disable options after selecting one
function disableOptions() {
  const options = document.getElementsByClassName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].onclick = null;
  }
}

// Function to submit the answer or move to the next question
function submitAnswer() {
  if (currentQuestion === quizData.length - 1) {
    showResult();
  } else {
    currentQuestion++;
    loadQuestion();
  }
}

// Function to load the next question
// Function to load the next question
function nextQuestion() {
  const options = document.getElementsByClassName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].style.backgroundColor = "#fff";
  }

  const submitButton = document.getElementById("submitBtn");
  submitButton.textContent = "Submit Answer";
  submitButton.onclick = submitAnswer;

  if (currentQuestion === quizData.length - 1) {
    showResult();
  } else {
    currentQuestion++;
    loadQuestion();
  }
}

// Function to show the quiz result
function showResult() {
  const quizContainer = document.getElementById("quizContainer");
  const resultContainer = document.getElementById("resultContainer");
  const scoreElement = document.getElementById("score");
  const summaryElement = document.getElementById("summary");

  quizContainer.style.display = "none";
  resultContainer.style.display = "block";

  scoreElement.textContent = `Your Score: ${score}/${quizData.length}`;
  summaryElement.textContent = `You answered ${score} out of ${quizData.length} questions correctly.`;
}

// Load the first question
loadQuestion();
