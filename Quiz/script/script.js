let questionNumber = 1;
let score = 0;
let currentRadioValue;
let changeQuestionNumber = true;

function onClick() {

    currentRadioValue = document.querySelector('input[name="q1"]:checked').value;

    if(currentRadioValue == null){
        alert("Selecione uma das opções")
    } else if(questionNumber == 1) {
        if(currentRadioValue == 'b'){
            score++
        }
        createQuestionTwo()
    } else if(questionNumber == 2) {
        if(currentRadioValue == 'c') {
            score++;
        }
        createQuestionThree()
        
    } else if(questionNumber == 3) {
        if(currentRadioValue == 'a') {
            score++
        }
        createQuestionFour()
    } else if(questionNumber == 4){
        if(currentRadioValue == 'b'){
            score++
        }
        createQuestionFive()
    } else if(questionNumber == 5) {
        if(currentRadioValue == 'c'){
            score++;
        }
        showButton()
        document.getElementById('nextQuestion').hidden = true
        changeQuestionNumber = false
    }

    questionNumber++;
    if(changeQuestionNumber){
        document.getElementById("questionNumber").innerHTML = "Pergunta " + questionNumber + ":";

    }
}

function loadPage() {
    createFirstQuestion()
    hideButton()
}

function onSubmitButtonClick() {
    localStorage.setItem('score', score)
    localStorage.setItem('quantityOfQuestions', (questionNumber-1))
    window.open("nextpage.html", '_self')
}

function hideButton() {
    document.getElementById('submitButton').hidden = true
}

function showButton() {
    document.getElementById('submitButton').hidden = false
}

function createFirstQuestion() {
    createQuestion(
        'Qual o nome do framework que facilita a criação de um microsserviço web?',
        'Spring Batch',
        'Spring Boot',
        'React Native'
    )
} 

function createQuestionTwo() {
    createQuestion(
        'Qual destas linguagem de programação é brasileira?',
        'Python',
        'Cobol',
        'Lua'
        )
}

function createQuestionThree() {
    createQuestion(
        "Qual linguagem conta mais rápido até um bilhão?",
        "C",
        "Python",
        "Java"
    )
}

function createQuestionFour() {
    createQuestion(
        "Qual dos seguintes frameworks é usado para desenvolver aplicativos móveis?",
        "Angular",
        "React Native",
        "Ruby on Rails"
    )
}
function createQuestionFive() {
    createQuestion(
        "Qual dos seguintes frameworks é usado para desenvolver aplicações web em Python?",
        "Flask",
        "Spring",
        "Express"
    )
}

function createQuestion(question, a, b, c) {
    document.getElementById('question').innerHTML = question
    document.getElementById('itemA').innerHTML = a
    document.getElementById('itemB').innerHTML = b
    document.getElementById('itemC').innerHTML = c
}

function loadScoreNumber() {
    const currentScore = localStorage.getItem('score')
    const quantityOfQuestions = localStorage.getItem('quantityOfQuestions')
    document.getElementById('score').innerHTML = currentScore + '/' + quantityOfQuestions
    if(currentScore <= 1) {
        document.body.style.background = 'red'
    } else if (currentScore <= 3) {
        document.body.style.background = 'yellow'
    } else {
        document.body.style.background = 'green'
    }
}