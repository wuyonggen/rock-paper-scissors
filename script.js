const CHOICES = ["rock", "paper", "scissors"];
const ICONS = { rock: "✊", paper: "✋", scissors: "✌️" };

let humanScore = 0;
let computerScore = 0;

function playGame() {
  const playRound = (roundNum, humanChoice, computerChoice) => {
    const humanIcon = ICONS[humanChoice] || "";
    const computerIcon = ICONS[computerChoice] || "";
    const base = `Round ${roundNum} - Player ${humanIcon} ${humanChoice}, Computer ${computerIcon} ${computerChoice}`;
    if (humanChoice === computerChoice) {
      alert(`${base}.\nThis round is a tie 🤝!\nCurrent score: Player ${humanScore} - Computer ${computerScore}`);
      return;
    }
    const humanWins =
      (humanChoice === "rock" && computerChoice === "scissors") ||
      (humanChoice === "paper" && computerChoice === "rock") ||
      (humanChoice === "scissors" && computerChoice === "paper");
    if (humanWins) {
      humanScore++;
      alert(`${base}.\nPlayer wins this round 🎉!\nCurrent score: Player ${humanScore} - Computer ${computerScore}`);
    } else {
      computerScore++;
      alert(`${base}.\nComputer wins this round 😈!\nCurrent score: Player ${humanScore} - Computer ${computerScore}`);
    }
  };

  humanScore = 0;
  computerScore = 0;
  for (let i = 0; i < 5; i++) {
    const roundNum = i + 1;
    try {
      const humanSelection = getHumanChoice(roundNum);
      const computerSelection = getComputerChoice();
      playRound(roundNum, humanSelection, computerSelection);
    } catch (error) {
      alert(error.message);
      return;
    }
  }

  if (humanScore > computerScore) {
    alert(`Congratulations! You won 🎉\nFinal score: Player ${humanScore} - Computer ${computerScore}`);
  } else if (humanScore < computerScore) {
    alert(`Game over: You lost 😢\nFinal score: Player ${humanScore} - Computer ${computerScore}`);
  } else {
    alert(`Game over: It's a tie 🤝\nFinal score: Player ${humanScore} - Computer ${computerScore}`);
  }
}

function getComputerChoice() {
  return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function getHumanChoice(round) {
  while (true) {
    const raw = prompt(`Round ${round} - Please enter your choice (rock/paper/scissors or r/p/s):`, "");
    if (raw === null) {
      throw new Error("User canceled the game");
    }
    const normalized = normalizeChoice(raw);
    if (normalized && CHOICES.includes(normalized)) return normalized;
    alert("Invalid input. Please enter: rock/paper/scissors or r/p/s.");
  }
}

function normalizeChoice(raw) {
  if (typeof raw !== "string") return null;
  const s = raw.trim().toLowerCase();
  const map = {
    r: "rock",
    rock: "rock",

    p: "paper",
    paper: "paper",

    s: "scissors",
    scissors: "scissors",
  };
  return map[s] || null;
}

const button = document.querySelector("#startGame");
button.addEventListener("click", playGame);
