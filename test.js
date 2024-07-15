const readline = require('readline');

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function userInput(query){
    return new Promise(answer => terminal.question(query, answer));  
}

async function test(){
    let n = await userInput("\nPlace x at: ");

    console.log(n);
    terminal.close();
    return n;
}

test();