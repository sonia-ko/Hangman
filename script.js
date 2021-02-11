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
    'What invention lets you look right through a wall?',
    'What has a face and two hands but no arms or legs?',
    'I do not have wings, but I can fly. I don’t have eyes, but I can cry! What am I?'
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
    'WINDOW',
    'CLOCK',
    'CLOUD'
    
]

let guess;
let currentQuestion;
let showingAnswer = [];
let displayAnswer = '';
let TemporaryAnswer = [];
let userScore = 9;

// VARIABLES FOR HTML ELEMENTS

let enterButton = document.querySelector('.enter-button');
let inputLetter = document.querySelector('.input-text');
let gameStartButton = document.querySelector('.game-start-button');
let showAnswerButton = document.querySelector('.show-answer-start-new-game');
let newGameWinnerButton = document.querySelector(".new-game");
let questionUI = document.querySelector(".question");
let answerSection = document.querySelector(".answer-section");
let gameOverMessage =  document.querySelector(".game-over");
let inputInstruction =  document.querySelector(".input-instruction"); 


initialState();

// A user starts the game

gameStartButton.addEventListener('click', function() {
    
    gameReset();
    currentQuestion = generateRandom();
    createHiddenAnswer();
    createTemporaryAnswer();
    displayQuestion(questions[currentQuestion]);

});


// A user clicks on Enter button

enterButton.addEventListener('click', checkAnswer);

// a function that checks the answer 

function checkAnswer() {
    guess = document.querySelector('.input-text').value.toUpperCase();
    inputLetter.value = '';
    
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
};

// A user selects to show answer and start a new game

showAnswerButton.addEventListener('click', gameOver);

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
   questionUI.style.display = "none";
   newGameWinnerButton.style.display = "none";
   answerSection.style.display = "none";
   gameOverMessage.style.display = "none";
   enterButton.style.display = "none";
   showAnswerButton.style.display = "none";
}

// Chooses a random question

function generateRandom(){
    return Math.trunc(Math.random() * questions.length);
   
}

//Game over

function gameOver() {
    document.querySelector(".hangman-image").src = "img/gameover.jpg";
    enterButton.style.display = "none";
    gameOverMessage.style.display = "block";
    document.querySelector("html").style.backgroundColor = "#ffe7e6";
    inputLetter.style.display = "none";
    answerSection.textContent = answers[currentQuestion];
    showAnswerButton.style.display = 'none';
    newGameWinnerButton.style.display = 'block';
    gameOverMessage.textContent= 'Game Over';
   gameOverMessage.style.color = "red";
    
    
    
}

// Displaying answer


function createHiddenAnswer(){
    
    displayAnswer = '';
    
    for (let i = 0; i < answers[currentQuestion].length; i++) {
        showingAnswer.push('_');
        
        displayAnswer = displayAnswer + showingAnswer[i];
    }
       answerSection.textContent = displayAnswer;
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
        answerSection.textContent = displayAnswer;
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
        newGameWinnerButton.textContent = 'Start a new game';
        newGameWinnerButton.style.display = "block";
        gameOverMessage.style.display = "block";
        showAnswerButton.style.display = "none";
        gameOverMessage.textContent = 'You won the game!';
        newGameWinnerButton.style.backgroundColor = "#84bfa2";
        enterButton.style.display = "none";
        gameOverMessage.style.color = "#187843";
        inputInstruction.style.display="none";
        document.querySelector('.input-text').style.display="none";

    }
}

// FUNCTION THAT RESETS THE GAME

function gameReset() {
    
    showingAnswer = [];
    displayAnswer = '';
    TemporaryAnswer = [];
    userScore = 9;
    
    gameOverMessage.style.display = "none";
    newGameWinnerButton.style.display = "none";
    document.querySelector(".hangman-image").src = "img/p0.png";
    document.querySelector("input").value = "";
    inputLetter.style.display = "inline-block";
    questionUI.style.display = "block";
    showAnswerButton.style.display = "block";
    answerSection.style.display = "block";
    document.querySelector(".starting-paragraph").textContent = 'Your question is...'
    displayQuestion(questions[currentQuestion]);
    enterButton.style.display = "inline-block";
    inputInstruction.style.display="block";
   
    document.querySelector("html").style.backgroundColor = "#d4ffe7";
}

// function that displays the question

function displayQuestion(question){
    questionUI.textContent = question;
}

/// MODAL WINDOW FUNCTIONALITY

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.rules');

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

btnOpenModal.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  console.log(e.key);
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
