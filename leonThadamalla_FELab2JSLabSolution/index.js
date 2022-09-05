
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.questionText = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}


var questions = [
    new Question("JavaScript supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery", "Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect to Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a", ["Language", "Programming Language", "Development", "All"], "Programming Language")
]

let quiz = new Quiz(questions);

function loadQuestions() {
    if (quiz.isEnded()) {
        showscores();
    } else {
        let question = quiz.getQuestionByIndex();
        var element = document.getElementById("question");
        element.innerHTML = question.questionText;
        var choices = question.choices;
        for (let i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i]);
        }
        showProgressBar();
    }

}

function showscores() {
    let percentage = quiz.score / quiz.questions.length * 100;
    let scoreHTML = "<h1>Result</h1>";
    scoreHTML += "<h2 id='score'>Your score: " + quiz.score + "/" + quiz.questions.length + ". " + percentage + "% questions answered correctly" + "</h2>"
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = scoreHTML;
}

function showProgressBar() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress");
    progressElement.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function handleOptionButton(id, choice) {
    let button = document.getElementById(id);
    button.onclick = function () {
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}

loadQuestions();


