const STORE = [
  {
    questionNumber: 1,
    question: 'What is one of the purposes of \"marking\" a customer?',
    ans1:'To signal to your fellow bartenders that a customer is already being helped',
    ans2:'To signal security',
    ans3:'To close a tab',
    ans4:'To cutoff a customer',
    ans5:'To call a cab',
    correctAnswer:'To signal to your fellow bartenders that a customer is already being helped'
  },
  {
    questionNumber: 2, 
     question: 'Which of these does not belong to the LIT family?',
      ans1:'Long Island Iced Tea',
      ans2:'AMF',
      ans3:'Tokyo Tea',
      ans4:'Margarita',
      ans5:'Long Beach Iced Tea',
      
      correctAnswer: 'Margarita'
  },
  {
    questionNumber: 3, 
     question: 'How many oz is a 6 count?',
      ans1:'1 oz',
      ans2:'1.25 oz',
      ans3:'1.5 oz', 
      ans4:'1.75 oz', 
      ans5:'2 oz',
      correctAnswer: '1.5 oz'
  },
  {
    questionNumber: 4, 
    question:'What is in a Bay Breeze that is not in a Sea Breeze?',
     ans1:'cranberry juice', 
     ans2:'orange juice',
     ans3:'pineapple juice',
     ans4:'blue curacao', 
     ans5:'rum',
      correctAnswer: 'pineapple juice'
  },
  { 
    questionNumber: 5,
     question: 'What is the standard Martini ratio of gin to vermouth?',
     ans1:'5 to 1',
     ans2:'4 to 3', 
     ans3:'10 to 1', 
     ans4:'6 to 1',
     ans5:'2 to 3',
     correctAnswer: '5 to 1'
  },
  {
    questionNumber: 6,
     question: 'Which of these is NOT an ingredient in a Scooby-Snack?',
     ans1:'whipped cream', 
     ans2:'malibu', 
     ans3:'pineapple juice',
     ans4:'Jaegermeister',
     ans5:'Midori Sour',    
     correctAnswer: 'Jaegermeister'
  },
  {
    questionNumber: 7, 
     question: 'How many counts is 2 oz of liquid?',
     ans1:'2 counts',
     ans2:'5 counts',
     ans3:'6 counts',
     ans4:'8 counts',
     ans5:'9 counts',
     correctAnswer: '8 counts'
    
  },
  {
    questionNumber: 8, 
     question: 'What is in a flag garnish?',
     ans1:'cherry and lime',
     ans2:'orange and cherry', 
     ans3:'orange and lime',
     ans4:'cherry and basil',
     ans5:'lemon twist and cherry',
     correctAnswer: 'orange and cherry'
  },
  {
    questionNumber: 9, 
    question: 'What is the order of the speed rack?',
    ans1:'Vodka, Gin, Tequila, Rum',
    ans2:'Gin, TripleSec, Rum, Vodka',
    ans3:'Vodka, Rum, Tequila, Gin',
    ans4:'Rum, Gin, Vodka, TripleSec',
    ans5:'Vodka, Gin, Rum, TripleSec',
    correctAnswer: 'Vodka, Gin, Rum, TripleSec'
  },
  {
    questionNumber: 10,
    question: 'which of these is NOT an ingredient of a Mai Tai?',
    ans1:'white rum', 
    ans2:'dark rum',
    ans3:'grenadine',
    ans4:'pineapple juice',
    ans5:'orange juice',
    correctAnswer: 'orange juice'
  }

  ];
  
const STARTING_QUESTION = 0, STARTING_SCORE = 0;
let questionNumber = STARTING_QUESTION;
let score = STARTING_SCORE;

function questionForm(score, quizQuestion, questionsAnswered) {
  return `
  <section id= "questionPage">

    <h2>${quizQuestion.question}</h2> 
    
  <form>
    <fieldset>
    <legend>Bartending Quiz</legend> 
      <label class="ans">
        <input type="radio" name="answer" id="answer-1" value="0"></input>
        <p>${quizQuestion.ans1}</p>
      </label>
      
  
      <label class="ans">
        <input type="radio" name="answer" id="answer-2" value="0"></input>
        <p>${quizQuestion.ans2}</p>
      </label>
  
      <label class="ans">
        <input type="radio" name="answer" id="answer-3" value="0"></input>
        <p>${quizQuestion.ans3}</p>
      </label> 
  
      <label class="ans">
        <input type="radio" name="answer" id="answer-4" value="0"></input>
        <p>${quizQuestion.ans4}</p>
      </label> 
  
      <label class="ans">
        <input type="radio" name="answer" id="answer-5" value="0"></input>
        <p>${quizQuestion.ans5}</p>
      </label>
    </fieldset>
  
  <button id='js-submit-button' type="submit" form="form1" value="Submit">Submit</button>

    
  </form> 
  </section>
  `;
}


function setScore(sc) {
  $('.score').html(sc);
}

//First Question -->click submit-->feedback page
function handleAnswerSubmit() {
    event.preventDefault();
    
    const answer = $('input:checked').siblings('p'); 
    
    const userIsCorrect = checkUserAnswer(answer); 
    if(userIsCorrect) {
      generateCorrectFeedback(); 
      score++;
      setScore(score);
      
    } else {
      generateIncorrectFeedback(); 
    }
}

//code for selected label on click
$('body').on('click', 'label', function() {
      $('label.active').removeClass('active');
      $(this).addClass('active');
});


//feedback page --> next question-->loop back to handleAnswerSubmit
function handleNextQuestion() {
   if(questionNumber===10) {
      resultsPage(); 
    } else {
      nextQuestion();
    }
}

//if last question, go to handleQuizCompletion, otherwise back to next question
function handleQuizComplete() {
  //resets questions and score
  questionNumber = STARTING_QUESTION; 
  setScore(STARTING_SCORE);
  
  nextQuestion(); 
}

function nextQuestion() {
  questionNumber++; 
  $('.questionNumber').html(questionNumber);
  
  const quizQuestion = STORE[questionNumber -1];
  
  const questionsAnswered = questionNumber -1; 
  
  $('#container').html(questionForm(score, quizQuestion, questionsAnswered)); 
} 


function checkUserAnswer(answer) {
  if (answer.text() === STORE[questionNumber-1].correctAnswer) {
    return true; 
  } else {
    return false; 
  }
}


function generateCorrectFeedback() {
  $('#container').html(correctFeedback); 
}

const correctFeedback = 
  `<section class="feedback-page" role="main">
    <h2>Correct!</h2> 
    <button id="js-next-button">Next</button>
  </section>`; 
  
function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedback(questionNumber)); 
}

function incorrectFeedback(questionNumber) {
  return `
  <section class="feedback-page" role="main"> 
    <h2>Incorrect</h2>
    <p>The correct answer is:
    <br><span>${STORE[questionNumber-1].correctAnswer}</span> </p>
    <button id="js-next-button">Next</button>
  </section>`;
}

function resultsPage() {
  $('#container').html (`
    <section id="last-page">
      <h2>Final Score: ${score} out of 10 </h2>
      <button id="js-restart-button">Try Again</button>
      </section>`);
}

function handleQuiz() {
  $('#js-start-button').on('click', nextQuestion);
  $('#container').on('click', '#js-submit-button', handleAnswerSubmit);
  $('#container').on('click', '#js-next-button', handleNextQuestion);
  $('#container').on('click', '#js-restart-button', handleQuizComplete);
}

//when the page loads, call `handleQuiz`
$(handleQuiz);