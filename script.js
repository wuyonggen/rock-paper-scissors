const CHOICES = ["rock", "paper", "scissors"];
const ICONS = { rock: "✊", paper: "✋", scissors: "✌️" };

let humanScore = 0;
let computerScore = 0;
let roundNumber = 0;

function getComputerChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function playRound(roundNum, playerChoice, computerChoice) {
  const resultDiv = document.querySelector("#result");
  const playerIcon = ICONS[playerChoice] || "";
  const computerIcon = ICONS[computerChoice] || "";

  const base = `Round ${roundNum} - Player ${playerIcon} ${playerChoice}, Computer ${computerIcon} ${computerChoice}`;
  if (playerChoice === computerChoice) {
    resultDiv.innerHTML = `<p>${base}.<br>This round is a tie 🤝!<br><strong>Current score:</strong> Player ${humanScore} - Computer ${computerScore}</p>`;
    return;
  }

  const playerWins =
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper");
  if (playerWins) {
    humanScore++;
    resultDiv.innerHTML = `<p>${base}.<br>Player wins this round 🎉!<br><strong>Current score:</strong> Player ${humanScore} - Computer ${computerScore}</p>`;
  } else {
    computerScore++;
    resultDiv.innerHTML = `<p>${base}.<br>Computer wins this round 😈!<br><strong>Current score:</strong> Player ${humanScore} - Computer ${computerScore}</p>`;
  }

  if (humanScore >= 5 || computerScore >= 5) {
    const winnerText =
      humanScore > computerScore
        ? `Congratulations! You won 🎉 Final score: Player ${humanScore} - Computer ${computerScore}`
        : `Game over: You lost 😢 Final score: Player ${humanScore} - Computer ${computerScore}`;
    resultDiv.innerHTML += `<p><strong>${winnerText}</strong></p>`;
    const choiceButtons = document.querySelectorAll(".choice");
    choiceButtons.forEach((btn) => (btn.disabled = true));
  }
}

function playGame() {
  humanScore = 0;
  computerScore = 0;
  roundNumber = 0;

  const gameArea = document.querySelector("#gameArea");
  gameArea.style.display = "block";

  const startButton = document.querySelector("#startGame");
  startButton.innerHTML = "Restart Game";

  const resultDiv = document.querySelector("#result");
  resultDiv.innerHTML = "";

  const choiceButtons = document.querySelectorAll(".choice");
  choiceButtons.forEach((b) => (b.disabled = false));
}

const button = document.querySelector("#startGame");
button.addEventListener("click", playGame);

const choiceButtons = document.querySelectorAll(".choice");
choiceButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const humanChoice = btn.dataset.choice;
    const computerChoice = getComputerChoice();
    roundNumber += 1;
    playRound(roundNumber, humanChoice, computerChoice);
  });
});
