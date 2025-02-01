function getComputerChoice() {
    let choiceNumber = Math.floor(Math.random() * 3) + 1;
    if (choiceNumber === 1) return "rock";
    else if (choiceNumber === 2) return "paper";
    else if (choiceNumber === 3) return "scissors";
}


// draw -> decision=0.  human win -> decision=1.  human loss -> decision=-1.
function determineWinner(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) return 0;
    else if (humanChoice === "rock") return computerChoice === "paper" ? -1 : 1;
    else if (humanChoice === "paper") return computerChoice === "scissors" ? -1 : 1;
    return computerChoice === "rock" ? -1 : 1;
}


function printMessage(winnerChoice, loserChoice, decision) {
    let message;
    if (decision === 1) message = `You win! ${winnerChoice} beats ${loserChoice}!`;
    else if (decision === -1) message = `You lose! ${winnerChoice} beats ${loserChoice}!`;
    else message = `Draw! Both chose ${winnerChoice}!`;
    document.querySelector("h3.decision").textContent = message;
}


function playGame() {
    let rounds = 0, humanScore = 0, computerScore = 0;

    function updateScores() {
        document.querySelector("h3.human-status").textContent = `Human score: ${humanScore}`;
        document.querySelector("h3.computer-status").textContent = `Computer score: ${computerScore}`;
        document.querySelector("h4.rounds").textContent = `Rounds: ${rounds}`;
    }

    function printFinalMessage() {
        let finalDecision = humanScore > computerScore ? "You won!" : humanScore === computerScore ? "It's a draw!" : "Computer won!";
        document.querySelector("h2.final-decision").textContent = finalDecision;
    }

    function playRound(humanChoice, computerChoice) {
        let decision = determineWinner(humanChoice, computerChoice);
        if (decision === 1) {
            humanScore++;
            printMessage(humanChoice, computerChoice, decision);
        } else if (decision === -1) {
            computerScore++;
            printMessage(computerChoice, humanChoice, decision);
        } else {
            printMessage(humanChoice, computerChoice, decision);
        }
        rounds++;
        updateScores();
        if (rounds === 5) {
            printFinalMessage();
            document.querySelectorAll("button.option").forEach(option => {
                option.removeEventListener('click', handleOptionClick);
            });
        }
    }

    function handleOptionClick(e) {
        playRound(e.currentTarget.getAttribute("id"), getComputerChoice());
    }

    document.querySelectorAll("button.option").forEach(option => {
        option.addEventListener('click', handleOptionClick);
    });

    updateScores();
    document.querySelector("h3.decision").textContent = "";
    document.querySelector("h2.final-decision").textContent = "";
}


document.querySelector("button.game").addEventListener('click', () => {
    playGame();
});