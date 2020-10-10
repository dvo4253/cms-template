const chalk = require('chalk');

const prompt = (q, {hide} = {}) => {
    const readlineSync = require('readline-sync');
    // const readline = require('readline').createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    // })

    return readlineSync.question(chalk.white(q), {hideEchoBack: hide})
    
};

const log = (...args) => console.log(chalk.white(...args));
const err = (...args) => console.error(chalk.red(...args));
module.exports = {
    log,
    err,
    prompt
}