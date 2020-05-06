//Declare variables
const A = 0
const B = 1
const C = 2
const D = 3
let index = 0;
let totalScore = 0;

//UI Selectors
const quizContainer = document.querySelector('.quiz-container');
const quiz = document.querySelector('#quiz');
const formEnd = document.querySelector('.form-end');
const nextBtn = document.querySelector('#next');
const finishBtn = document.querySelector('#finish');
const submitBtn = document.querySelector('#replay');
const questionCounter = document.querySelector('#question-counter');
const scoreCounter = document.querySelector('#score-counter');
const result = document.querySelector('#result');
const header = document.querySelector('.header');
const navigation = document.querySelector('.navigation');


//Event Listeners
document.querySelector('#replay').addEventListener('click', playAgain);
document.querySelector('#next').addEventListener('click', nextSlide);

//List of Questions
const questions = [
  {
     question: "What is a closure?",
     options: {
        a: 'Local var made global.',
        b: 'Var made private.',
        c: 'Local var kept alive at return.',
        d: 'None of the above.'
     },
     correct: 2,
     chosen: null
  },
  {
     question: "Why do we use === instead of == ?",
     options: {
        a: 'To compare two instances',
        b: 'To assign a value to a var',
        c: 'To check for val and obj type',
        d: 'None of the above.'
     },
     correct: 2,
     chosen: null
  },
  {
     question: "In javascript what is { }",
     options: {
        a: 'Empty String',
        b: 'An array of strings',
        c: 'An array of objects',
        d: 'An object'
     },
     correct: 3,
     chosen: null
  },
  {
    question: "A function with no return value is called",
    options: {
      a: 'Procedures',
      b: 'Method',
      c: 'Static function',
      d: 'Dynamic function'
    },
    correct: 0,
    chosen: null
  },
  {
    question: "A linkage of series of prototype objects is called as :",
    options: {
      a: 'Prototype stack',
      b: 'Prototype chain',
      c: 'Prototype class',
      d: 'Prototypes'
    },
    correct: 1,
    chosen: null
  }
]

//Display questions in UI
function displayQuestions(questions){
  result.style.display = 'none';

  let html = '';
  let question = '';
  let options = '';
  let name = 0;

  //Loop through questions array to create a div for each question
  questions.forEach(function(currentQuestion){
     let id = 0;

     question = `
     <h4 class="question">${currentQuestion.question}</h4>
     `

     for(i in currentQuestion.options){
      options += `
        <div class="option-container">
            <label class="option">
              <input type="radio" name="question-${name}" value="option-${id}">
              ${currentQuestion.options[i]}
            </label>
        </div>
      `
      id++;
     }
     html = question + options;

     //Create a div for each question
     const div = document.createElement('div');
     div.id = name
     div.className = 'slide';
     div.innerHTML = html;
     
     //Insert div in parent
     quiz.insertBefore(div, formEnd);
     //Reset options value
     options = '';
     //Increment name
     name += 1;
  })
  updateScore(null, null)
}
displayQuestions(questions);

//Get value of clicked radio button
document.querySelector('.quiz-container').addEventListener('click', function(e){
  if(e.target.type === 'radio'){
     const name = e.target.name;
     const options = document.getElementsByName(`${name}`);
     let value;
     let parentID;

     options.forEach(function(option){
        if(option.checked){
           value = option.value;
           parentID = option.parentElement.parentElement.parentElement.id;
           
        }
        option.disabled = true;
     })

     updateAnswer(parentID, value);
     updateScore(e.target.parentElement, parentID);
  }
})

//Get chosen option
const getOption = function(option) {
  switch (option) {
    case "option-0":
      return A
    case "option-1":
      return B
    case "option-2":
      return C
    case "option-3":
      return D
  }
}

//Update chosen answer
const updateAnswer = function(id, value) {
  index = parseInt(id)
  questions[index].chosen = getOption(value)
}

//Update Total Score and Validate Answer
function updateScore(element, index) {
  if(element && index) {
    const options = document.getElementsByName(`question-${index}`);

    if(questions[index].correct === questions[index].chosen){
      element.style.backgroundColor = 'green';
      element.style.color = 'white'
      totalScore += 1;
    } else {
      element.style.backgroundColor = 'red';
      element.style.color = 'white'
      options.forEach(option => {
        if(option.value === `option-${questions[index].correct}`) {
          option.parentElement.style.backgroundColor = 'green';
          option.parentElement.style.color = 'white';
        }
      })
    }
  }
  scoreCounter.textContent = `Score: ${totalScore} / ${questions.length}`;
}

//Pagination
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

//Show current slide
function showSlide(n){
  questionCounter.textContent = `Question ${n+1} / ${questions.length}`

  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;

  if(currentSlide === 0){
     nextBtn.style.display = 'none';
  }

  if(currentSlide === slides.length - 1){
     nextBtn.style.display = 'none';
     finishBtn.style.display = 'inline-block';
  } else {
     finishBtn.style.display = 'none';
     nextBtn.style.display = 'inline-block';
  }
  decutible = true;
}
showSlide(currentSlide)

finishBtn.addEventListener('click', (e) => {
  const finalScore = document.querySelector('#finalScore');
  finalScore.textContent = `Your Score: ${totalScore}`;
  result.style.display = 'block';
  header.style.display = 'none';
  quiz.style.display = 'none';
  navigation.style.display = 'none';


  e.preventDefault;
})

function nextSlide(){
  showSlide(currentSlide + 1);
}

function playAgain() {
  window.location.reload();
}