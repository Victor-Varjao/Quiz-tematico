const retryButton = document.getElementById("retry-btn");
retryButton.addEventListener("click", function () {
    location.reload(); // Recarrega a página inteira
});

const questions = [
    {
        question: "1. Qual é o nome do encanador que é o mascote da Nintendo?",
        options: ["Sonic", "Mario", "Crash", "Link"],
        answer: 2 // O índice correto para a resposta "Mario" é 1
    },
    {
        question: "2. Em qual jogo o objetivo é coletar o máximo de moedas douradas?",
        options: ["Sonic the Hedgehog", "Super Mario Bros.", "Donkey Kong", "Pac-Man"],
        answer: 3 // O índice correto para a resposta "Pac-Man" é 3
    },
    {
        question: "3. Qual é o jogo de tiro em primeira pessoa que se passa durante a Segunda Guerra Mundial?",
        options: ["Call of Duty", "Battlefield", "Halo", "Counter-Strike"],
        answer: 1 // O índice correto para a resposta "Call of Duty" é 0
    },
    {
        question: "4. Qual é o nome do jogo em que você precisa construir e explorar um mundo virtual feito de blocos?",
        options: ["Minecraft", "Fortnite", "Roblox", "Terraria"],
        answer: 1 // O índice correto para a resposta "Minecraft" é 0
    },
    {
        question: "5. Qual é o jogo de luta em que os personagens têm poderes especiais chamados de Kombos?",
        options: ["Tekken", "Mortal Kombat", "Street Fighter", "Super Smash Bros."],
        answer: 2 // O índice correto para a resposta "Mortal Kombat" é 1  
    },
    {
        question: "6. Em qual jogo de plataforma você controla um ouriço azul que é famoso por ser muito veloz?",
        options: ["Sonic the Hedgehog", "Super Mario Bros.", "Crash Bandicoot", "Rayman"],
        answer: 1 // O índice correto para a resposta "Sonic the Hedgehog" é 0
    },
    {
        question: "7. Qual é o jogo de RPG em que você explora um vasto mundo de fantasia e enfrenta dragões?",
        options: ["The Elder Scrolls V: Skyrim", "Dark Souls", "Final Fantasy VII", "World of Warcraft"],
        answer: 1 // O índice correto para a resposta "The Elder Scrolls V: Skyrim" é 0
    },
    {
        question: "8. Qual é o jogo de ação e aventura em que o protagonista é um caçador de tesouros chamado Nathan Drake?",
        options: ["Uncharted", "Tomb Raider", "Assassin's Creed", "The Last of Us"],
        answer: 1 // O índice correto para a resposta "Uncharted" é 0
    },
    {
        question: "9. Em qual jogo de sobrevivência você precisa enfrentar zumbis em um mundo pós-apocalíptico?",
        options: ["Left 4 Dead", "DayZ", "Dead Space", "The Last of Us"],
        answer: 2 // O índice correto para a resposta "DayZ" é 1
    },
    {
        question: "10. Qual é o jogo de estratégia em tempo real que se passa na Roma Antiga?",
        options: ["Age of Empires", "Civilization", "Total War: Rome II", "Starcraft"],
        answer: 3 // O índice correto para a resposta "Total War: Rome II" é 2
    },
    {
        question: "11. Em qual jogo de aventura você controla um herói com um boné vermelho e um martelo?",
        options: ["Super Mario Bros.", "The Legend of Zelda", "Donkey Kong", "Kirby"],
        answer: 3 // O índice correto para a resposta "Kirby" é 3
    },
    {
        question: "12. Qual é o jogo de ação em que você controla um assassino que precisa eliminar seus alvos de forma furtiva?",
        options: ["Hitman", "Metal Gear Solid", "Splinter Cell", "Assassin's Creed"],
        answer: 1 // O índice correto para a resposta "Hitman" é 0
    },
    {
        question: "13. Em qual jogo de aventura você explora uma ilha repleta de segredos e desafios?",
        options: ["The Legend of Zelda: Breath of the Wild", "Tomb Raider", "Uncharted", "Horizon Zero Dawn"],
        answer: 1 // O índice correto para a resposta "The Legend of Zelda: Breath of the Wild" é 0
    },
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