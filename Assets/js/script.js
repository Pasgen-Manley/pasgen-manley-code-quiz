var timer = document.querySelector("#timer");
var viewHighscores = document.querySelector("#highscore");
var startQuizButton = document.querySelector(".start-quiz-btn");

var questionEl = document.querySelector(".question");
var answer1 = document.querySelector(".answer-1");
var answer2 = document.querySelector(".answer-2");
var answer3 = document.querySelector(".answer-3");
var answer4 = document.querySelector(".answer-4");
var mcqSection = document.querySelector(".mcq-section");

var questionResult = document.querySelector("#correct-or-incorrect");

var initialsSection = document.querySelector(".initials-section");
var submitButton = document.querySelector(".submit-btn");

var ScoreEl = document.querySelector("#score");
var scoreList = document.querySelector(".score-list")
var highscoreSection = document.querySelector(".highscore-section");

var goBackBtn = document.querySelector("#go-back");
var clearScrBtn = document.querySelector("#clear-highscores");

// Question Arrays
//array that contains all questions
var question1 = "Commonly used data types do NOT include:"
var question2 = "The condition in an if / else statement is enclosed within ____."
var question3 = "Arrays in Javascript can be used to store ____."
var question4 = "String values must be enclosed within ____ when being assigned to variables."
var question5 = "A very useful tool used during development and debugging for printing content to the debugger is:"
var questionsArray = [question1, question2, question3, question4, question5]

//Answers
var quizAnswers1 = {
    content1: "a. strings", 
    content2: "b. booleans",
    content3: "c. alerts",
    content4: "d. numbers"
}
var quizAnswers2 = {
    content1: "a. quotes",
    content2: "b. curly brackets",
    content3: "c. parentheses",
    content4: "d. square brackets"
}

var quizAnswers3 = {
    content1: "a. numbers and strings",
    content2: "b. other arrays",
    content3: "c. booleans",
    content4: "d. all of the above"
}

var quizAnswers4 = {
    content1: "a. commas",
    content2: "b. curly brackets",
    content3: "c. quotes",
    content4: "d. parentheses"
}

var quizAnswers5 = {
    content1: "a. console.log",
    content2: "b. terminal/bash",
    content3: "c. for loops",
    content4: "d. javascript"
}
//array that contains answers objects
var answersArray = [quizAnswers1, quizAnswers2, quizAnswers3, quizAnswers4, quizAnswers5]

//all correct answers
var correctAnswer1 = quizAnswers1.content3;
var correctAnswer2 = quizAnswers2.content3;
var correctAnswer3 = quizAnswers3.content4;
var correctAnswer4 = quizAnswers4.content3;
var correctAnswer5 = quizAnswers5.content1;
var correctAnswersArray = [correctAnswer1, correctAnswer2, correctAnswer3, correctAnswer4, correctAnswer5]

//When Start Quiz botton is clicked
    //timer starts
    startQuizButton.addEventListener("click", startTimer)

    //hide quiz intro and show quiz questions
    startQuizButton.addEventListener("click", function(){
        document.querySelector(".jumbotron").style.display = "none";
        mcqSection.style.display = "block";
        })
    //display first quiz question
    startQuizButton.addEventListener("click", goToNextQuestion)


    var correctIndex = 0;  
    //Go to next Question function
    function goToNextQuestion(){
    //if all questions answered, take user to initials page to enter info
    if (correctIndex === questionsArray.length) {
        setTimeout(function(){mcqSection.style.display = "none";
        initialsSection.style.display = "inline";
    }, 500);
        //timer stops 
        setTimeout(function(){clearInterval(timerInterval)}, 500);
    //if not all questions are answered, go to next question
    } else {
        questionEl.textContent = questionsArray[correctIndex];
        answer1.textContent = answersArray[correctIndex].content1;
        answer2.textContent = answersArray[correctIndex].content2;
        answer3.textContent = answersArray[correctIndex].content3;
        answer4.textContent = answersArray[correctIndex].content4;
    }
    }
    
    //Timer function
    var secondsLeft = 76;
    var timerInterval;
    function startTimer(){
        timerInterval = setInterval(function() {
            secondsLeft --;
            timer.textContent =  "Time: " + secondsLeft + "s";
        
            //if time runs out or all questions are completed go straight to user initial page to record score
            if (secondsLeft === 0 || correctIndex >= 5) {
              clearInterval(timerInterval);
              mcqSection.style.display = "none";
              initialsSection.style.display = "inline";
              ScoreEl.textContent = secondsLeft;
            }
          }, 1000);
        return timerInterval;
    }   

mcqSection.addEventListener("click", determineCorrectAnswer)

//determine correct answer function
function determineCorrectAnswer(event){
    if(event.target.matches(".btn-mcq")){
        var chosenAnswer = event.target.textContent;
        
        questionResult.textContent = " ";
        questionResult.style.display = "block";
            if (chosenAnswer === correctAnswersArray[correctIndex]){
                questionResult.textContent = "Correct!!!";
                setTimeout(function(){ questionResult.style.display = "none"}, 500);
            } else {
                questionResult.textContent = "Incorrect!"
                setTimeout(function(){ questionResult.style.display = "none"}, 500);
                secondsLeft -= 10;
                timer.textContent =  "Time: " + secondsLeft + "s";
            }
            correctIndex++;
    }
    return secondsLeft;
};

//Go to next question when any answer is clicked
mcqSection.addEventListener("click", function(event){
    if(event.target.matches(".btn-mcq")){
        goToNextQuestion();
    }})



//submit buttion: 
submitButton.addEventListener("click", function(event){
    event.preventDefault();
    //record user info
    newUser();        
        //show recorded user initials and user score
        initialsSection.style.display = "none";
        document.querySelector(".highscore-section").style.display = "block";
})

//function that record user in local storage and pushes to html
function newUser() {
    var userInitial = document.querySelector("#initials").value;
    if (userInitial === "") {
        userInitial = "";
    } 
        localStorage.setItem(userInitial, secondsLeft);
        document.querySelector(".score-list").textContent = " ";
        var li = document.createElement("li");
        li.textContent = userInitial + ": " + secondsLeft;
        scoreList.appendChild(li);
        document.querySelector(".score-list").appendChild(li);

        for (i = 0; i < li.length; i++) {
            li = document.createElement('li');
        }
    
}

function orderHighscores(event) {
    event.preventDefault();

    scoreList.sort(function(a, b){ a - b});
       
}

//start the quiz again when "go back" button is pressed
document.querySelector("#go-back").addEventListener("click", function(){
    //reset question number index
    correctIndex = 0;
    //reset timer seconds
    secondsLeft = 76;
    timer.textContent =  "Time: 76s";
    //go to quiz start page
    document.querySelector(".jumbotron").style.display = "block";
    //hide highscore section
    highscoreSection.style.display = "none";
})


//clear highscore function
document.querySelector("#clear-highscores").addEventListener("click", function(){
    localStorage.clear();
    //reset score list content
    document.querySelector(".score-list").textContent = " ";
    document.querySelector(".score-list").style.display = "none";

});

//view highscores link
viewHighscores.addEventListener("click", function(){
    //stop timer if goes to highscore panel
    clearInterval(timerInterval);
    document.querySelector(".jumbotron").style.display = "none";
    mcqSection.style.display = "none";
    initialsSection.style.display = "none";
    highscoreSection.style.display = "block";
    scoreList.style.display = "block";

    //reset previous content on highscore panel and loop through local storage to push all keys and values onto html
    document.querySelector(".score-list").textContent = " ";
    for (let i = 0; i< localStorage.length; i++) {
        var li = document.createElement("li");
        var user = localStorage.key(i);
        var scores = localStorage.getItem(localStorage.key(i));
        li.textContent = user + ": " + scores;
        document.querySelector(".score-list").appendChild(li);}
    })
