const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('save-score');
const finalScore = document.getElementById('final-score');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;
finalScore.innerText = mostRecentScore;
username.addEventListener('keyup', () => {
  console.log(username.value);
  saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e) => {
  console.log("clicked!");
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value
  };
  highScores.push(score);

  highScores.sort((a,b)=> b.score - a.score)
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/");
  console.log(highScores);
}