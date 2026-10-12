let userScore = 0;
let computerScore = 0;
let roundsPlayed = 0;
let gameOver = false;
let resetTimeoutId;

const userScoreElement = document.querySelector("#user-score");
const computerScoreElement = document.querySelector("#computer-score");
const messageElement = document.querySelector("#msg");
const roundCountElement = document.querySelector("#round-count");
const possibleChoices = ["rock", "paper", "scissors"];
const pointsToWin = 10;
const winnerMessageDuration = 3000;

const choices = document.querySelectorAll(".choice");
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        playRound(choice.id);
    });
});

document.querySelector("#reset-game").addEventListener("click", resetGame);

function playRound(userChoice) {
    if (gameOver) {
        return;
    }

    const computerChoice =
        possibleChoices[Math.floor(Math.random() * possibleChoices.length)];
    roundsPlayed += 1;
    roundCountElement.textContent = `Rounds played: ${roundsPlayed}`;

    if (userChoice === computerChoice) {
        messageElement.textContent = `It's a tie! You both chose ${userChoice}.`;
    } else {
        const userWins =
            (userChoice === "rock" && computerChoice === "scissors") ||
            (userChoice === "paper" && computerChoice === "rock") ||
            (userChoice === "scissors" && computerChoice === "paper");

        if (userWins) {
            userScore += 1;
            userScoreElement.textContent = userScore;
            messageElement.textContent = `You win! ${userChoice} beats ${computerChoice}.`;
        } else {
            computerScore += 1;
            computerScoreElement.textContent = computerScore;
            messageElement.textContent = `You lose! ${computerChoice} beats ${userChoice}.`;
        }
    }

    if (userScore >= pointsToWin || computerScore >= pointsToWin) {
        gameOver = true;
        choices.forEach((choice) => choice.classList.add("game-over"));

        if (userScore >= pointsToWin) {
            messageElement.textContent = `You win the game ${userScore}–${computerScore}! Starting a new game...`;
        } else {
            messageElement.textContent = `Computer wins the game ${computerScore}–${userScore}! Starting a new game...`;
        }

        resetTimeoutId = window.setTimeout(resetGame, winnerMessageDuration);
    }
}

function resetGame() {
    if (resetTimeoutId !== undefined) {
        window.clearTimeout(resetTimeoutId);
        resetTimeoutId = undefined;
    }

    userScore = 0;
    computerScore = 0;
    roundsPlayed = 0;
    gameOver = false;
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
    roundCountElement.textContent = `Rounds played: ${roundsPlayed}`;
    messageElement.textContent = "Play your move.";
    choices.forEach((choice) => choice.classList.remove("game-over"));
}