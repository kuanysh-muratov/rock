function getComputerChoice(){
    let choiceNumber=Math.floor(Math.random()*3)+1;
    if(choiceNumber===1)
        return "rock";
    else if(choiceNumber===2)
        return "paper";
    return "scissors";
}


function getHumanChoice(){
    let humanChoice;
    while(true){
        humanChoice=prompt("Rock or Paper or Scissors?");
        if(!humanChoice)
            continue;
        humanChoice=humanChoice.trim().toLowerCase();
        if(humanChoice==="rock" || humanChoice==="paper" || humanChoice==="scissors")
            return humanChoice;
    }
}


function createMessage(winnerChoice, loserChoice, decision){
    let message;
    if(decision===1)
        message=`You win! ${winnerChoice} beats ${loserChoice}!`;
    else if(decision===-1)
        message=`You lose! ${winnerChoice} beats ${loserChoice}!`;
    else
        message=`Draw! Both chose ${winnerChoice}!`;
    
    console.log(message);
}


function determineWinner(humanChoice, computerChoice){
    let decision;
    if(humanChoice===computerChoice)
        decision=0;
    else{
        if(humanChoice==="rock"){
            if(computerChoice==="paper")
                decision=-1;
            else
                decision=1;
        }
        else if(humanChoice==="paper"){
            if(computerChoice==="scissors")
                decision=-1
            else
                decision=1;
        }
        else{
            if(computerChoice==="rock")
                decision=-1;
            else
                decision=1;
        }
    }
    return decision;
}


function playGame(){
    let rounds=0, humanScore=0, computerScore=0;
    while(rounds<5){
        playRound();
        rounds++;
    }

    let finalDecision = humanScore > computerScore ? "You won!" : humanScore === computerScore ? "It's a draw!" : "Computer won!";
    console.log(`Final Score - Human: ${humanScore}, Computer: ${computerScore}. ${finalDecision}`);

    function playRound(){
        let computerChoice=getComputerChoice();
        let humanChoice=getHumanChoice();
        let decision=determineWinner(humanChoice, computerChoice);

        if(decision===1){
            humanScore++;
            createMessage(humanChoice, computerChoice, decision);
        }
        else if(decision===-1){
            computerScore++;
            createMessage(computerChoice, humanChoice, decision);
        }
        else
            createMessage(humanChoice, computerChoice, decision);
        
    }
}

playGame();