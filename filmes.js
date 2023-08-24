const retryButton = document.getElementById("retry-btn");
retryButton.addEventListener("click", function () {
    location.reload(); // Recarrega a página inteira
});

const questions = [
    {
        question: "1. Qual é o nome do protagonista da trilogia 'O Senhor dos Anéis'?",
        options: ["Frodo Bolseiro", "Aragorn", "Legolas", "Gandalf"],
        answer: 2 // O índice correto para a resposta "Aragorn" é 1
    },
    {
        question: "2. Qual filme da Disney apresenta a história de uma jovem que encontra uma fera amaldiçoada em um castelo encantado?",
        options: ["A Bela e a Fera", "A Pequena Sereia", "Aladdin", "A Bela Adormecida"],
        answer: 1 // O índice correto para a resposta "A Bela e a Fera" é 0
    },
    {
        question: "3. Em qual filme da Marvel, Tony Stark se torna o Homem de Ferro?",
        options: ["Homem de Ferro", "Homem-Aranha: De Volta ao Lar", "Os Vingadores", "Capitão América: O Primeiro Vingador"],
        answer: 1 // O índice correto para a resposta "Homem de Ferro" é 0
    },
    {
        question: "4. Qual é o verdadeiro nome do super-herói Batman?",
        options: ["Clark Kent", "Bruce Wayne", "Peter Parker", "Tony Stark"],
        answer: 2 // O índice correto para a resposta "Bruce Wayne" é 1
    },
    {
        question: "5. Qual filme de ação apresenta um ex-militar com habilidades de luta excepcionais que busca vingança pela morte de sua filha?",
        options: ["Duro de Matar", "Gladiador", "John Wick", "Mad Max: Estrada da Fúria"],
        answer: 3 // O índice correto para a resposta "John Wick" é 2
    },
    {
        question: "6. Em 'Toy Story', qual é o nome do brinquedo cowboy que é o melhor amigo de Woody?",
        options: ["Buzz Lightyear", "Slinky Dog", "Jessie", "Woody"],
        answer: 3 // O índice correto para a resposta "Woody" é 3
    },
    {
        question: "7. Qual é o nome do filme da DC que apresenta a história de um vigilante mascarado que luta contra o crime em Gotham City?",
        options: ["Liga da Justiça", "Aquaman", "Mulher-Maravilha", "Batman: O Cavaleiro das Trevas"],
        answer: 3 // O índice correto para a resposta "Batman: O Cavaleiro das Trevas" é 3
    },
    {
        question: "8. Qual é o nome do filme da Marvel em que os heróis enfrentam o vilão Thanos para impedir que ele obtenha as Joias do Infinito?",
        options: ["Homem de Ferro 3", "Vingadores: Guerra Infinita", "Capitão América: Guerra Civil", "Thor: Ragnarok"],
        answer: 2 // O índice correto para a resposta "Vingadores: Guerra Infinita" é 1
    },
    {
        question: "9. Qual é o nome do filme da Disney que conta a história de uma princesa que encontra um gênio mágico em uma lâmpada?",
        options: ["A Bela e a Fera", "Aladdin", "A Pequena Sereia", "Cinderela"],
        answer: 2 // O índice correto para a resposta "Aladdin" é 1
    },
    {
        question: "10. Qual é o nome do filme de ação estrelado por Keanu Reeves, onde ele interpreta um assassino aposentado que busca vingança contra um chefão do crime russo?",
        options: ["John Wick", "Velozes e Furiosos", "Duro de Matar", "Esquadrão 6"],
        answer: 1 // O índice correto para a resposta "John Wick" é 0
    },
    {
        question: "11. Qual é o nome do filme da Marvel que apresenta a história de um rei africano que se torna o super-herói Pantera Negra?",
        options: ["Homem de Ferro", "Thor: Ragnarok", "Vingadores: Ultimato", "Pantera Negra"],
        answer: 3 // O índice correto para a resposta "Pantera Negra" é 3
    },
    {
        question: "12. Em 'A Pequena Sereia', qual é o nome da sereia que sonha em viver na terra e se apaixona por um príncipe humano?",
        options: ["Ariel", "Bela", "Cinderela", "Jasmine"],
        answer: 1 // O índice correto para a resposta "Ariel" é 0
    },
    {
        question: "13. Qual é o nome do filme de ação em que Liam Neeson interpreta um homem que busca vingança contra os sequestradores de sua filha?",
        options: ["Busca Implacável", "O Protetor", "Sem Escalas", "Ataque Aéreo"],
        answer: 1 // O índice correto para a resposta "Busca Implacável" é 0
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