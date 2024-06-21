const questions = [
    {
        question: "When is my birthday?",
        answers: [
            {text: "6th", correct: false},
            {text: "4th", correct: true},
            {text: "5th", correct: false},
            {text: "10th", correct: false},
        ]
    },
    {
        question: "What is my comfort food?",
        answers: [
            {text: "Ramen", correct: true},
            {text: "Burger", correct: false},
            {text: "Chips", correct: false},
            {text: "Grass", correct: false},
        ]
    },
    {
        question: "What is my favorite TV show?",
        answers: [
            {text: "Modern Family", correct: true},
            {text: "New Girl", correct: false},
            {text: "Star Trek", correct: false},
            {text: "Game of Thrones", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("ans-button");
const nextButton = document.getElementById("next-btn");
const finalGif = document.getElementById("gif4");
const gif5 = document.getElementById("gif5");
const hoverImage = document.getElementById("hover-image1");
const hoverImage2 = document.getElementById("hover-image2");
const hoverImage3 = document.getElementById("hover-image3");

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false; // New flag to track if an answer has been selected

function startQuiz() {
    resetState();
    currentQuestionIndex = 0;
    score = 0;
    answerSelected = false; // Reset flag
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        } else {
            const hoverImage = document.getElementById(`hover-image${index + 1}`);
            button.addEventListener("mouseover", () => {
                if (!answerSelected) {
                    hoverImage.style.display = "block";
                }
            });
            button.addEventListener("mouseout", () => {
                if (!answerSelected) {
                    hoverImage.style.display = "none";
                }
            });
        }

        button.addEventListener("click", selectAnswer);
    });
}


function resetState() {
    nextButton.style.display = "none";
    finalGif.style.display = "none";
    gif5.style.display = "none";


    for (let i = 1; i <= 3; i++) {
        const hoverImage = document.getElementById(`hover-image${i}`);
        if (hoverImage) {
            hoverImage.style.display = "none";
        }
    }


    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
    answerSelected = false; // Reset flag
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct == "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }

    answerSelected = true; // Set flag when an answer is selected
    hoverImage.style.display = "none"; // Hide hover image immediately

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

    if (score == 3) {
        finalGif.style.display = "block";
    } else {
        gif5.style.display = "block";
    }
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
