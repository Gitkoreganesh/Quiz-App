const questions = [
    {
        question: "What is the full form of CSS?",
        answers: [
            { text: "Cascading Structure Sheet", correct: false },
            { text: "Cascading Scenario Sheet", correct: false },
            { text: "Cascading Style Sheet", correct: true },
            { text: "Cascading Sub Sheet", correct: false },
        ]
    },
    {
        question: "Which of this XML document is not supported by CSS?",
        answers: [
            { text: "XML", correct: false },
            { text: "SVG", correct: false },
            { text: "XUL", correct: false },
            { text: "XSL", correct: true },
        ]
    },
    {
        question: "CSS is widely used to design____ pages?",
        answers: [
            { text: "Java", correct: false },
            { text: "HTML", correct: true },
            { text: "Servlet", correct: false },
            { text: "Python", correct: false },
        ]
    },
    {
        question: "HTML, CSS and Javascript together can be used for______?",
        answers: [
            { text: "Web Designing", correct: true },
            { text: "Software Designing", correct: false },
            { text: "Tool Designing", correct: false },
            { text: "Framework Designing", correct: false },
        ]
    },
    {
        question: "Which of this is not advantage of CSS?",
        answers: [
            { text: "Solves a big problem", correct: false },
            { text: "Not useful through XHTML", correct: true },
            { text: "Saves a lot of time", correct: false },
            { text: "Provide more attributtes", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    ShowQuestion();
}

function ShowQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
   questionElement.innerHTML = questionNo + ". " + currentQuestion.
   question;

   currentQuestion.answers.forEach(answer =>{
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
   });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.
    length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        ShowQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();