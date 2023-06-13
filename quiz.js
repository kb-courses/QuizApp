const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const quizze = Array.from(document.getElementsByClassName('btn'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progress-bar-full');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 5;

let dpokal_questions = [];
fetch("buli_questions.json")
  .then( res => {
    return res.json();
}).then(loadedQuestions => {

})

let buli_questions = [
  {
    question: "Was ist der Rekord für die meisten in einer Saison geschossenen Tore eines Spieler?",
    choice1: "44",
    choice2: "41",
    choice3: "40",
    choice4: "39",
    answer: 2
  },
  {
    question: "Wer hält den Rekord mit den meisten Toren in einer Saison?",
    choice1: "Gerd Müller",
    choice2: "Pierre-Emerick Aubameyang",
    choice3: "Robert Lewandowski",
    choice4: "Erling Haaland",
    answer: 3
  },
  {
    question: "Wer ist Rekordmeister?",
    choice1: "FC Bayern München",
    choice2: "Hamburger SV",
    choice3: "Borussia Dortmund",
    choice4: "Schalke 04",
    answer: 1
  },
  {
    question: "Wie viele Vereine in der Saison 2022/23 kommen aus Nordrhein-Westfalen?",
    choice1: "3",
    choice2: "5",
    choice3: "4",
    choice4: "6",
    answer: 4
  },
  {
    question: "Wer sind die beiden Direktabsteiger der Saison 2022/23?",
    choice1: "Hertha BSC und Schalke 04",
    choice2: "Augsburg und Hertha BSC",
    choice3: "Hertha BSC und Stuttgart",
    choice4: "Schalke 04 und Stuttgart",
    answer: 1
  }
]

let cl_questions = [
  {
    question: "Wer ist der Rekordspieler? (Die meisten Championsleague Spiele)",
    choice1: "Cristiano Ronaldo",
    choice2: "Lionel Messi",
    choice3: "Gianluigi Buffon",
    choice4: "Iker Casillas",
    answer: 1
  },
  {
    question: "Wer ist der Rekordsieger?",
    choice1: "FC Barcelona",
    choice2: "AC Mailand",
    choice3: "Real Madrid",
    choice4: "FC Liverpool",
    answer: 3
  },
  {
    question: "Wie oft gewann der FC Bayern München?",
    choice1: "5",
    choice2: "7",
    choice3: "8",
    choice4: "6",
    answer: 4
  },
  {
    question: "Wer hält die längste Ungeschlagenserie in Gruppenspielen?",
    choice1: "FC Bayern München",
    choice2: "FC Barcelona",
    choice3: "Real Madrid",
    choice4: "AC Mailand",
    answer: 1
  },
  {
    question: "Wer ist der Rekordtorschütze des Wettbewerbs?",
    choice1: "Robert Lewandowski",
    choice2: "Raúl",
    choice3: "Cristiano Ronaldo",
    choice4: "Lionel Messi",
    answer: 3
  },
]

chooseQuestions = () => {
  const selectedGame = window.location.href;
  console.log(selectedGame);
  if(selectedGame.includes("buli_quiz.html")){
    console.log("Bundesliga Quiz ausgewählt!")
    fetch("buli_questions.json")
    .then( res => {
      return res.json();
    })
    .then(loadedQuestions => {
      buli_questions = loadedQuestions;
    }).catch(err => {
      console.error(err);
    });
    return buli_questions;
  }
  else if(selectedGame.includes("dpokal_quiz.html")){
    console.log("DFB-Pokal Quiz ausgewählt!");
    fetch("dpokal_questions.json")
    .then( res => {
      return res.json();
    })
    .then(loadedQuestions => {
      dpokal_questions = loadedQuestions;
    }).catch(err => {
      console.error(err);
    });
    return dpokal_questions;
  }
  else if(selectedGame.includes("cl_quiz.html")){
    console.log("Championsleague Quiz ausgewählt!");
    fetch("cl_questions.json")
    .then( res => {
      return res.json();
    })
    .then(loadedQuestions => {
      cl_questions = loadedQuestions;
    }).catch(err => {
      console.error(err);
    });
    return cl_questions;
  }
}

startGame = () => {
  questionCounter = 0;
  score = 0;
  let questions = chooseQuestions();
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
}

getNewQuestion = () => {

  if(availableQuestions.length==0||questionCounter>=MAX_QUESTIONS){
    localStorage.setItem('mostRecentScore', score);
    //go to end
    
    return window.location.assign("/end.html");
  }

  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
  
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    choices.forEach(choice => {
      const number = choice.dataset['number'];
      choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

}

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if(classToApply == "correct"){
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    
    setTimeout(()=>{
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 500);

  })
} )

incrementScore = num => {
  score +=num;
  scoreText.innerText = score;
}

startGame();