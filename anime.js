
const retryButton = document.getElementById("retry-btn");
retryButton.addEventListener("click", function () {
    location.reload(); // Recarrega a página inteira
});


const questions = [
    {
        question: "1. Em que anime o protagonista tem como objetivo se tornar o Rei dos Piratas?",
        options: ["One Piece", "Naruto", "Dragon Ball"],
        answer: 1 // One Piece
    },
    {
        question: "2. Qual o nome do protagonista de Naruto?",
        options: ["Sasuke Uchiha", "Itachi Uchiha", "Naruto Uzumaki"],
        answer: 3 // Naruto Uzumaki
    },
    {
        question: "3. Em Attack on Titan, qual é o nome da cidade que os humanos vivem cercados por muros?",
        options: ["Trost", "Shiganshina", "Wall Maria"],
        answer: 3 // Wall Maria
    },
    {
        question: "4. Qual é o nome do Death Note?",
        options: ["Ryuk", "Kira", "Shinigami"],
        answer: 2 // Kira
    },
    {
        question: "5. Em Fullmetal Alchemist, qual é o nome do protagonista que perdeu seu braço e perna em uma transmutação humana?",
        options: ["Edward Elric", "Alphonse Elric", "Roy Mustang"],
        answer: 1 // Edward Elric
    },
    {
        question: "6. Qual é o nome do time de heróis protagonistas em My Hero Academia?",
        options: ["Team Rocket", "Class 1-A", "Akatsuki"],
        answer: 2 // Class 1-A
    },
    {
        question: "7. Em Tokyo Ghoul, o protagonista Ken Kaneki se torna um híbrido de humano e o quê?",
        options: ["Vampiro", "Zumbi", "Ghoul"],
        answer: 3 // Ghoul
    },
    {
        question: "8. Em Sword Art Online, qual é o nome do jogo de realidade virtual em que os jogadores ficam presos?",
        options: ["Log Horizon", "Accel World", "Sword Art Online"],
        answer: 3 // Sword Art Online
    },
    {
        question: "9. Em One Punch Man, qual é o nome do herói que consegue derrotar qualquer inimigo com um único soco?",
        options: ["Genos", "Saitama", "Mumen Rider"],
        answer: 2 // Saitama
    },
    {
        question: "10. Qual é o nome do anime que conta a história de um time de basquete do ensino médio com o objetivo de se tornar campeão nacional?",
        options: ["Kuroko's Basketball", "Haikyuu!!", "Free!"],
        answer: 1 // Kuroko's Basketball
    },
    {
        question: "11. Em Bleach, qual é o nome do personagem que é um Shinigami substituto?",
        options: ["Ichigo Kurosaki", "Byakuya Kuchiki", "Uryu Ishida"],
        answer: 1 // Ichigo Kurosaki
    },
    {
        question: "12. Em Fairy Tail, qual é o nome da guilda de magos a qual os protagonistas pertencem?",
        options: ["Blue Pegasus", "Lamia Scale", "Fairy Tail"],
        answer: 3 // Fairy Tail
    },
    {
        question: "13. Qual é o nome do anime que apresenta um mundo pós-apocalíptico onde humanos são caçados por gigantes humanoides conhecidos como titãs?",
        options: ["Neon Genesis Evangelion", "Darling in the Franxx", "Attack on Titan"],
        answer: 3 // Attack on Titan
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
            }, 1000);
        }, 1000);
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
    timeRemaining = 120;
    quizContainer.style.display = "block";
    retryButton.style.display = "none";
    startQuiz();
}

submitButton.addEventListener("click", checkAnswer);
startQuiz();