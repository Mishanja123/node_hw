const { program } =  require('commander');
const fs = require('fs').promises;
const readline = require('readline');
require('colors');

program.option('-f, --file <type>', 'file for saving ggame results', 'game_results.txt');

program.parse(process.argv)

// rceate readline interface to interact with user 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
//Counter of user attempts
let counter = 0;

//Guessed number from 1 to 10
const mind = Math.ceil(Math.random() * 10);

//Path to log file 
const logFile = program.opts().file

/**
 * Write log result into the log file
 * @param {string} msg - massage to save into file
 * @returns {Promise<void>} - it means returning promise with no data
 */
const loger = async (msg) => {
    try {
        await fs.appendFile(logFile, `${new Date().toLocaleString('uk-UA')}: ${msg}\n`);

        console.log(`Successfully saved game result to the log file ${logFile}`.yellow)
    } catch(err) {
        console.log(`Something went very very wrong.. ${err.message}`.red)
    }
};

/**
 * Simple input number validation.
 * 
 * @param {number} num - value to validate
 * @returns  {boolean}
 */
const isValid = (num) => {
    if (!Number.isNaN(num) && num > 0 && num <= 10) {
        return true
    };

    if (Number.isNaN(num)) {
        console.log('Please, enter a number!'.red);
    }
    if (num < 1 || num > 10) {
        console.log('Number should be between 1 and 10'.red);
    }
    return false;
}

//Main game process.
const game = () => {
    rl.question('Please, enter any whole number between 1 and 10!!\n'.blue, (value) => {
        //Convert value to number.
        //Number(value)
        const number = +value;

        //Validate number.
        if (!isValid(number)) {

            return game()
        };

        //counter = counter + 1;
        //counter += 1;
        //++counter;
        counter++;

        //if number is not equal guessed
        if(number !== mind) {
            console.log('Oh no! Try again'.red);

            return game();
        }

        const winningMessage = (`Congratulations! You guassed the number in ${counter} step(s) -_-`);

        console.log(winningMessage.magenta);
        loger(winningMessage);

        rl.close();
    })
}

//Launch game.
game()


// example how to use readline
// rl.on('line', (txt) => {
//     console.log(txt)
//     process.exit();
// })