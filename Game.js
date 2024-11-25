import { FairNumberGenerator } from "./FairNumberGenerator.js";
import readline from 'readline';
import { InputParser } from "./InputParser.js";
import { DiceProbability } from "./DiceProbability.js";
import { ProbabilityTable } from "./ProbabilityTable.js";

let table;
export class Game{
    async start(input){
        let whoMoves, computerDice, userDice, computerResult, userResult;
    
        try {
            let diceArray = readInput(input);
            table = new ProbabilityTable(diceArray);
            whoMoves = await determineWhoMoves();
    
            if(whoMoves == "Computer"){
                console.log('I won, I make the first move');
                computerDice = getRandomDice(diceArray);
                diceArray = deleteFromArray(computerDice, diceArray);
                computerResult = await getComputerResult(computerDice);
    
                userDice = await getUserDice(diceArray);
                userResult = await getUserResult(userDice);
    
                printWinner(userResult,computerResult);
                
            } else {
                console.log('You won, you make the first move');
                userDice = await getUserDice(diceArray);
                diceArray = deleteFromArray(userDice, diceArray);
                userResult = await getUserResult(userDice);
    
                computerDice = getRandomDice(diceArray);
                computerResult = await getComputerResult(computerDice);
    
                printWinner(userResult,computerResult);
            }
        } catch(err){
            console.log(err.message);
            process.exit(0);
        }
    
    }
}









// asks questions asynchronously
async function ask(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const answer = await new Promise(resolve => rl.question(question, ans => {
        rl.close();
        resolve(ans);
    }));

    if(answer.toUpperCase() == 'X'){
        console.log('Exiting program');
        process.exit(0);
    }else if(answer == '?'){
        table.print();
        return ask(question);
    } else {
        return answer;
    }
}

//create dices from input
function readInput(input){
    try {
        return InputParser.inputToDiceArray(input);
    }catch (e) {
        throw e;
    }
}


function printTable(diceArray){
    console.log(DiceProbability.ProbabilityOfWinning(diceArray[0], diceArray[1]));
}

async function getComputerResult(computerDice){
    let userNumber, computerRoll, computerResult, computerNumber;

    console.log(`I choose the ${computerDice.getSides()} dice.\n` +
    `It's time for my throw.`);

    computerNumber = FairNumberGenerator.generateNumber(0,5);

    console.log(`I selected a random value in the range 0..5 (HMAC = ${computerNumber.getHmac()}\n`);

    userNumber = await getUserNumber();
    userNumber = parseInt(userNumber);

    computerRoll = (computerNumber.getNumber() + userNumber) % 6;
    computerResult = computerDice.roll(computerRoll);

    console.log(`Your selection: ${userNumber}\n`+
    `My number is ${computerNumber.getNumber()} (KEY = ${computerNumber.getKey()}).\n`+
    `The result is ${computerNumber.getNumber()} + ${userNumber} = ${computerRoll} (mod 6).\n`+
    `My throw is ${computerResult}.\n`
    );

    return computerResult;
}

async function getUserResult(userDice){
    let computerNumber = FairNumberGenerator.generateNumber(0,5);
            console.log(`It's time for your throw.
I selected a random value in the range 0..5 (HMAC = ${computerNumber.getHmac()}).
Add your number modulo 6.
`)
            let userNumber = await getUserNumber();
            userNumber = parseInt(userNumber);
            let userRoll = (computerNumber.getNumber() + userNumber) % 6
            let userResult = userDice.roll(userRoll);

            console.log(`Your selection: ${userNumber}\n`+
                `My number is ${computerNumber.getNumber()} (KEY = ${computerNumber.getKey()}).\n`+
                `The result is ${userNumber}  + ${computerNumber.getNumber()} = ${userRoll} (mod 6).\n`+
                `Your throw is ${userResult}.\n`
            );
    return userResult;
}

async function determineWhoMoves(){
    let randomNumber = FairNumberGenerator.generateNumber(0,1);

    let firstQuestion = `Let's determine who makes the first move.\n`+
    `I selected a random value in the range 0..1 HMAC = ${randomNumber.getHmac()}\n`+
    `Try to guess my selection\n`+
    `0 - 0\n`+
    `1 - 1\n`+
    `X - exit\n`+
    `? - help\n`;
    const number = await ask(firstQuestion);

    switch (number) {
        case '0':
        case '1':
            console.log(`Your number is :${number}\n`+
            `My number is: ${randomNumber.getNumber()} (KEY= ${randomNumber.getKey()})\n`+
            `You can check the validity of my number using the hmac and key for the hash (SHA3-256)\n`+
            `here: https://www.lddgo.net/en/encrypt/hmac\n`);

            return number == randomNumber.getNumber() ?  "User" : "Computer"; 

}

}

function getRandomDice(diceArray){
    let computerDice = diceArray[FairNumberGenerator.generateNumber(0, diceArray.length - 1).getNumber()]; 
    return  computerDice;
}

async function getUserDice(diceArray){
    let question = "Choose your dice: \n";
    for(let i=0; i<diceArray.length; i++ ){
        question += `${i} - ${diceArray[i].getSides()}\n`;

    }
    question += `X - exit \n? - help\n`;
    let diceResponse = await ask(question);
    diceResponse = parseInt(diceResponse);
    return diceArray[diceResponse];
}

function getUserNumber(){
    let question = `Add your number modulo 6\n`+
    `0 - 0\n`+
    `1 - 1\n`+
    `2 - 2\n`+
    `3 - 3\n`+
    `4 - 4\n`+
    `5 - 5\n`+
    `X - exit\n`+
    `? - help\n`
return ask(question);
}

function printWinner(userNum, myNum){
    if(userNum > myNum) console.log(`You win (${userNum} > ${myNum})!`);
    else if(myNum > userNum) console.log(`I win (${myNum} > ${userNum})!`);
    else console.log(`I's a tie (${myNum} = ${userNum})!`);
}

function deleteFromArray(targetDice, diceArray){
    return diceArray.filter(dice => dice !== targetDice);
}