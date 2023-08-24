const retryButton = document.getElementById("retry-btn");
retryButton.addEventListener("click", function () {
  location.reload(); // Recarrega a página inteira
});

const questions = [
  {
    question: "1. Qual a linguagem de programação mais utilizada para desenvolvimento web?",
    options: ["Java", "Python", "JavaScript"],
    answer: 3 // O índice correto para a resposta "JavaScript" é 2
  },
  {
    question: "2. O que significa HTML?",
    options: ["Hyper Text Markup Language", "High Text Making Language", "Hyperlinks and Text Markup Language"],
    answer: 1 // O índice correto para a resposta "Hyper Text Markup Language" é 0
  },
  {
    question: "3. O que é CSS?",
    options: ["Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    answer: 1 // O índice correto para a resposta "Cascading Style Sheets" é 0
  },
  {
    question: "4. Qual dos seguintes é um banco de dados relacional?",
    options: ["MongoDB", "MySQL", "Firebase"],
    answer: 2 // O índice correto para a resposta "MySQL" é 1
  },
  {
    question: "5. O que é um framework?",
    options: ["Uma biblioteca de códigos", "Uma metodologia de desenvolvimento", "Uma estrutura de suporte para desenvolvimento de software"],
    answer: 3 // O índice correto para a resposta "Uma estrutura de suporte para desenvolvimento de software" é 2
  },
  {
    question: "6. Qual das opções é um método HTTP que é utilizado para fazer uma requisição de criação de um novo recurso?",
    options: ["GET", "POST", "PUT"],
    answer: 2 // O índice correto para a resposta "POST" é 1
  },
  {
    question: "7. O que é um loop em programação?",
    options: ["Uma estrutura de decisão", "Um tipo de dado", "Uma sequência de instruções que é executada repetidamente"],
    answer: 3 // O índice correto para a resposta "Uma sequência de instruções que é executada repetidamente" é 2
  },
  {
    question: "8. Qual das seguintes opções é uma linguagem de script executada no lado do servidor?",
    options: ["JavaScript", "Python", "PHP"],
    answer: 3 // O índice correto para a resposta "PHP" é 2
  },
  {
    question: "9. O que é um array em JavaScript?",
    options: ["Uma estrutura de controle", "Um tipo de dado primitivo", "Uma coleção de elementos ordenados"],
    answer: 3 // O índice correto para a resposta "Uma coleção de elementos ordenados" é 2
  },
  {
    question: "10. O que é JSON?",
    options: ["JavaScript Object Notation", "JavaScript Oriented Notation", "Java Standard Object Notation"],
    answer: 1 // O índice correto para a resposta "JavaScript Object Notation" é 0
  },

  {
    question: "11. O que é o DOM em HTML?",
    options: ["Document Object Model", "Data Object Model", "Dynamic Object Model"],
    answer: 1 // O índice correto para a resposta "Document Object Model" é 0
  },
  {
    question: "12. Qual das seguintes opções é uma linguagem de estilo utilizada para estilizar páginas web?",
    options: ["JavaScript", "CSS", "Python"],
    answer: 2 // O índice correto para a resposta "CSS" é 1
  },
  {
    question: "13. O que é uma variável em programação?",
    options: ["Um tipo de dado", "Um valor constante", "Um espaço para armazenar valores"],
    answer: 3 // O índice correto para a resposta "Um espaço para armazenar valores" é 2
  }
];

const quizContainer = document.getElementById("quiz-content");
const questionElement = document.getElementById("question");
const option1Element = document.getElementById("option1-label");
const option2Element = document.getElementById("option2-label");
const option3Element = document.getElementById("option3-label");
const submitButton = document.getElementById("submit-btn");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const totalQuestionsElement = document.getElementById("total-questions");

let currentQuestion = 0;
let score = 0;
let timeRemaining = 120;
let timerInterval;

function showQuestion() {
  const currentQuestionObj = questions[currentQuestion];
  questionElement.textContent = currentQuestionObj.question;
  option1Element.textContent = currentQuestionObj.options[0];
  option2Element.textContent = currentQuestionObj.options[1];
  option3Element.textContent = currentQuestionObj.options[2];

  // Desmarcar todos os radio buttons
  const radioButtons = document.querySelectorAll('input[name="option"]');
  radioButtons.forEach(radioButton => {
      radioButton.checked = false;
  });
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) {
      alert("Selecione uma opção!");
      return;
  }

  const answer = parseInt(selectedOption.value);
  const correctAnswer = questions[currentQuestion].answer;

  if (answer === correctAnswer) {
      score++;
      selectedOption.parentElement.classList.add("correct");
      setTimeout(() => {
          selectedOption.parentElement.classList.remove("correct");
          currentQuestion++;

          if (currentQuestion < questions.length) {
              showQuestion();
          } else {
              endQuiz();
          }
      }, 1000); // Remove the class after 1 second
  } else {
      selectedOption.parentElement.classList.add("incorrect");
      setTimeout(() => {
          selectedOption.parentElement.classList.remove("incorrect");
          const correctOption = document.querySelector(`input[value="${correctAnswer}"]`);
          correctOption.parentElement.classList.add("correct");
          setTimeout(() => {
              correctOption.parentElement.classList.remove("correct");
              currentQuestion++;

              if (currentQuestion < questions.length) {
                  showQuestion();
              } else {
                  endQuiz();
              }
          }, 1000); // Remove the class after 1 second
      }, 1000); // Remove the class after 1 second
  }
}

function calculateCorrectAnswers() {
  let correctCount = 0;
  for (let i = 0; i < questions.length; i++) {
      if (questions[i].answer === questions[i].selected) {
          correctCount++;
      }
  }
  return correctCount;
}

function showScore() {
  scoreElement.textContent = score;
  totalQuestionsElement.textContent = questions.length;

  quizContainer.style.display = "none";
  retryButton.style.display = "block";

  const scoreContainer = document.getElementById("score-container");
  scoreContainer.style.display = "block";
}

function endQuiz() {
  clearInterval(timerInterval);

  const correctAnswers = calculateCorrectAnswers();
  scoreElement.textContent = correctAnswers;

  showScore();
}

function countdownTimer() {
  if (timeRemaining === 0) {
    endQuiz();
  } else {
    timerElement.textContent = `Tempo restante: ${timeRemaining} segundos`;
    timeRemaining--;
  }
}

function startQuiz() {
  timerElement.style.display = "block"; // Exibe o timer quando o quiz começa
  showQuestion();
  timerInterval = setInterval(countdownTimer, 1000);
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  timeRemaining = 60;
  quizContainer.style.display = "block";
  retryButton.style.display = "none";
  startQuiz();
}

submitButton.addEventListener("click", checkAnswer);
startQuiz();