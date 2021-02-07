'use strict';

const questions = [ 
    'What kind of clothes do lawyers wear?',
    'What can travel around the world while staying in a corner?',
    'What comes down but never goes up?',
    'What has a neck but no head?',
    'What has to be broken before you can use it?',
    'What do you throw out when you want to use it, but take in when you don’t want to use it?',
    'What belongs to you but others use it more than you do?',
    'We hurt without moving. We poison without touching. We bear the truth and the lies. We are not to be judged by our size. What are we?',
    'What do you fill with empty hands?',
    'Without fingers, I point, without arms, I strike, without feet, I run.What am I?',
    ' What teaches without talking? ',
    'What invention lets you look right through a wall?'
]

const answers = [
    'LAWSUITS',
    'STAMP',
    'RAIN',
    'BOTTLE',
    'EGG',
    'ANCHOR',
    'NAME',
    'WORDS',
    'GLOVE',
    'CLOCK',
    'BOOK',
    'WINDOW'
]

let guess;
let currentQuestion;
let showingAnswer = [];
let displayAnswer = '';
let TemporaryAnswer = [];
let userScore = 9;


initialState();

// A user starts the game

document.querySelector('.game-start-button').addEventListener('click', function() {
    
    gameReset();
    currentQuestion = generateRandom();
    createHiddenAnswer();
    createTemporaryAnswer();
    displayQuestion(questions[currentQuestion]);

});


// A user clicks on Enter button

document.querySelector('.enter-button').addEventListener('click', function() {
    
    guess = document.querySelector('.input-text').value.toUpperCase();
    document.querySelector('input').value = '';
    
     if(TemporaryAnswer.indexOf(guess) !== -1) {
         for(let i = 0; i <= TemporaryAnswer.length; i++){
             if(TemporaryAnswer[i] === guess) {
             showingAnswer[i] = guess;
             updateAnswerString();  
             };
         };
         checkWinner();
         
     } else {
          if (userScore <= 1) {
              gameOver();
              
          }else{
              userScore--;
              console.log(userScore);
              updatePicture(userScore);
          }
     }
    
    
    
// 
    }
    
);

// A user selects to show answer and start a new game

document.querySelector('.show-answer-start-new-game').addEventListener('click', function(){
    gameOver();
})

// A USER WON THE GAME AND CLICKS ON START NEW BUTTON

document.querySelector('.new-game').addEventListener('click', function(){
    gameReset();
    currentQuestion = generateRandom();
    createHiddenAnswer();
    createTemporaryAnswer();
    displayQuestion(questions[currentQuestion]);
})


    
/// FUNCTIONS 


// Initial state of the game

function initialState(){
   document.querySelector(".question").style.display = "none";
   document.querySelector(".new-game").style.display = "none";
   document.querySelector(".answer-section").style.display = "none";
   document.querySelector(".game-over").style.display = "none";
    document.querySelector(".enter-button").style.display = "none";
    document.querySelector(".show-answer-start-new-game").style.display = "none";
}

// Chooses a random question

function generateRandom(){
    return Math.trunc(Math.random() * questions.length);
   
}

//Game over

function gameOver() {
    document.querySelector(".hangman-image").src = "img/gameover.jpg";
    document.querySelector(".enter-button").style.display = "none";
    document.querySelector(".game-over").style.display = "block";
    document.querySelector("html").style.backgroundColor = "#ffe7e6";
    document.querySelector(".input-text").style.display = "none";
     document.querySelector(".answer-section").textContent = answers[currentQuestion];
    document.querySelector(".show-answer-start-new-game").style.display = 'none';
    document.querySelector(".new-game").style.display = 'block';
    document.querySelector(".game-over").textContent= 'Game Over';
    document.querySelector(".game-over").style.color = "red";
    
    
    
}

// Displaying answer


function createHiddenAnswer(){
    
    displayAnswer = '';
    
    for (let i = 0; i < answers[currentQuestion].length; i++) {
        showingAnswer.push('_');
        
        displayAnswer = displayAnswer + showingAnswer[i];
    }
        document.querySelector('.answer-section').textContent = displayAnswer;
}

// A function that makes an array from the answer 

function createTemporaryAnswer() {
    TemporaryAnswer = [];
    
    for (let i = 0; i < answers[currentQuestion].length; i++) {
        
     TemporaryAnswer.push(answers[currentQuestion][i]);
            
     }
    console.log(TemporaryAnswer);
    
}

// A function that creates a string with the display of answer

function updateAnswerString(){
    
    displayAnswer = '';
    
    for (let i = 0; i < answers[currentQuestion].length; i++) {
         
        displayAnswer = displayAnswer + showingAnswer[i];
    }
        document.querySelector('.answer-section').textContent = displayAnswer;
}

// a function that updates the picture if the answer is not correct

function updatePicture(userScore) {
    
    let neededImage = `img/p${userScore}.png`;

    
    if (userScore < 1) {
        neededImage = "img/gameover.jpg";
    }
    
    document.querySelector(".hangman-image").src = neededImage;
     
    
 
};

// a function that checks if the player won the game

function checkWinner() {
    if (displayAnswer === answers[currentQuestion]){
        document.querySelector(".hangman-image").src = "img/win.jpg";
        document.querySelector(".new-game").textContent = 'Start a new game';
        document.querySelector(".new-game").style.display = "block";
        document.querySelector(".game-over").style.display = "block";
        document.querySelector(".show-answer-start-new-game").style.display = "none";
        document.querySelector(".game-over").textContent = 'You won the game!';
        document.querySelector(".new-game").style.backgroundColor = "#84bfa2";
        document.querySelector(".enter-button").style.display = "none";
        document.querySelector(".game-over").style.color = "#187843";
    }
}

// FUNCTION THAT RESETS THE GAME

function gameReset() {
    
    showingAnswer = [];
    displayAnswer = '';
    TemporaryAnswer = [];
    userScore = 9;
    
    document.querySelector(".game-over").style.display = "none";
    document.querySelector(".new-game").style.display = "none";
    document.querySelector(".hangman-image").src = "img/p0.png";
    document.querySelector("input").value = "";
    document.querySelector("input").style.display = "inline-block";
    document.querySelector(".question").style.display = "block";
   document.querySelector(".show-answer-start-new-game").style.display = "block";
   document.querySelector(".answer-section").style.display = "block";
   document.querySelector(".starting-paragraph").textContent = 'Your question is...'
   displayQuestion(questions[currentQuestion]);
   document.querySelector(".enter-button").style.display = "inline-block";
   
    document.querySelector("html").style.backgroundColor = "#d4ffe7";
}

// function that displays the question

function displayQuestion(question){
    document.querySelector(".question").textContent = question;
}