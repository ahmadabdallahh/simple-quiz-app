// IDEA: Simple Quiz App

const questions = [
  {
    question: 'What is the Smallest Country In the World?',
    answers: [
      { text: 'Vatican City', correct: true },
      { text: 'Monaco', correct: false },
      { text: 'Nauru', correct: false },
      { text: 'San Marino', correct: false },
    ],
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answers: [
      { text: 'Earth', correct: false },
      { text: 'Mars', correct: true },
      { text: 'Jupiter', correct: false },
      { text: 'Venus', correct: false },
    ],
  },
  {
    question: 'Who wrote "Romeo and Juliet"?',
    answers: [
      { text: 'William Shakespeare', correct: true },
      { text: 'Charles Dickens', correct: false },
      { text: 'Jane Austen', correct: false },
      { text: 'Mark Twain', correct: false },
    ],
  },
  {
    question: 'What is the capital of Japan?',
    answers: [
      { text: 'Beijing', correct: false },
      { text: 'Seoul', correct: false },
      { text: 'Tokyo', correct: true },
      { text: 'Bangkok', correct: false },
    ],
  },
  {
    question: 'What is the chemical symbol for water?',
    answers: [
      { text: 'O2', correct: false },
      { text: 'H2O', correct: true },
      { text: 'CO2', correct: false },
      { text: 'NaCl', correct: false },
    ],
  },
  {
    question: 'Which continent is the Sahara Desert located on?',
    answers: [
      { text: 'Asia', correct: false },
      { text: 'Africa', correct: true },
      { text: 'Australia', correct: false },
      { text: 'South America', correct: false },
    ],
  },
  {
    question: 'Who painted the Mona Lisa?',
    answers: [
      { text: 'Vincent van Gogh', correct: false },
      { text: 'Pablo Picasso', correct: false },
      { text: 'Leonardo da Vinci', correct: true },
      { text: 'Claude Monet', correct: false },
    ],
  },
  {
    question: 'What is the largest mammal in the world?',
    answers: [
      { text: 'African Elephant', correct: false },
      { text: 'Blue Whale', correct: true },
      { text: 'Giraffe', correct: false },
      { text: 'Hippopotamus', correct: false },
    ],
  },
  {
    question: 'Which language is primarily spoken in Brazil?',
    answers: [
      { text: 'Spanish', correct: false },
      { text: 'Portuguese', correct: true },
      { text: 'French', correct: false },
      { text: 'English', correct: false },
    ],
  },
  {
    question: 'What is the boiling point of water at sea level?',
    answers: [
      { text: '100°C', correct: true },
      { text: '0°C', correct: false },
      { text: '50°C', correct: false },
      { text: '212°C', correct: false },
    ],
  },
];

const questionElement = document.querySelector('#main-question');
const answerBtns = document.getElementsByClassName('answer-btns')[0];
const nextBtn = document.querySelector('.next-btn');

console.log(questionElement);

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = 'Next';
  showQuestions();
}

function showQuestions() {
  restState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.textContent = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    button.classList.add('option');
    answerBtns.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function restState() {
  nextBtn.style.display = 'none';
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}

function selectAnswer(e) {
  // NOTE: Get the button that was clicked
  let selectBtn = e.target;
  // IDEA: Check if the selected answer is correct
  const isCorrect = selectBtn.dataset.correct === 'true';

  // HACK: Apply appropriate class to the clicked button
  if (isCorrect) {
    selectBtn.classList.add('correct');
    // NOTE: Increment score when answer is correct
    score++;
  } else {
    selectBtn.classList.add('incorrect');
  }

  // HACK: Disable all buttons to prevent multiple selections
  Array.from(answerBtns.children).forEach((button) => {
    // Prevent further clicks
    button.disabled = true;

    // Show which answers were correct
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
  });

  // Show the next button
  nextBtn.style.display = 'block';
}

function showScore() {
  restState();
  questionElement.innerHTML = `You Scored Is : ${score} , Out of : ${questions.length}!`;
  nextBtn.innerHTML = 'Play Again';
  nextBtn.style.display = 'block';
}

function handleNextBtn() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestions();
  } else {
    showScore();
  }
}

nextBtn.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

startQuiz();
