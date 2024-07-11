const readline = require('readline');

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function userInput(query){
    return new Promise(answer => terminal.question(query, answer));  
}

let boardState = Array(9).fill(" ")

async function game(){
    while (true){
        drawBoard(boardState);
        boardState = turnPlayer(boardState);
        drawBoard(boardState);
        if (endGame(boardState)){break}
        boardState = turnAI(boardState);
        drawBoard(boardState);
        if (endGame(boardState)){break}
    }
}

function drawBoard(boardState){
    console.log(` `)
    console.log(` ${boardState[0]} | ${boardState[1]} | ${boardState[2]} `)
    console.log(`---|---|---`)
    console.log(` ${boardState[3]} | ${boardState[4]} | ${boardState[5]} `)
    console.log(`---|---|---`)
    console.log(` ${boardState[6]} | ${boardState[7]} | ${boardState[8]} `)
    console.log(` `)
}

async function turnPlayer(boardState){
    while (true){
        let n = await userInput("\nPlace x at: ");
        if (boardState[n] === " "){
            boardState[n] = 'x';
            return boardState;
        }
        console.log("Invalid choice")
    }
}    

function turnAI(boardState){
    let empty = 0;
    for (i = 0; i < boardState.length; i++){
        if (boardState[i] === " "){empty++;}
    }
    let n = Math.floor(Math.random() * empty)
    for (i = 0; i < boardState.length; i++){
        if (boardState[i] === " "){
            if (n === 0){
                boardState[i] = 'o';
                return boardState;
            } else {
                n--;
            }
        }
    }
}

function endGame(boardState){
    let winner = false;
    if (boardState[0] === boardState[1] && boardState[1] === boardState[2]){if (boardState[0] != ' '){winner= boardState[0]}}
    if (boardState[3] === boardState[4] && boardState[4] === boardState[5]){if (boardState[3] != ' '){winner= boardState[3]}}
    if (boardState[6] === boardState[7] && boardState[7] === boardState[8]){if (boardState[6] != ' '){winner= boardState[6]}}

    if (boardState[0] === boardState[3] && boardState[3] === boardState[6]){if (boardState[0] != ' '){winner= boardState[0]}}
    if (boardState[1] === boardState[4] && boardState[4] === boardState[7]){if (boardState[1] != ' '){winner= boardState[1]}}
    if (boardState[2] === boardState[5] && boardState[5] === boardState[8]){if (boardState[2] != ' '){winner= boardState[2]}}

    if (boardState[0] === boardState[4] && boardState[4] === boardState[8]){if (boardState[0] != ' '){winner= boardState[0]}}
    if (boardState[2] === boardState[4] && boardState[4] === boardState[6]){if (boardState[2] != ' '){winner= boardState[2]}}

    if (winner = 'x'){
        console.log("\nPlayer wins!");
        return true;
    }
    if (winner = 'o'){
        console.log("\nComputer wins!");
        return true;
    }
    let empty = 0;
    for (i = 0; i < boardState.length; i++){
        if (boardState[i] === " "){empty++;}
    }

    if (empty === 0){
        console.log("It's a draw!");
        return true;
    }
return false;
}

game();
terminal.close();