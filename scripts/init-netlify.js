const util = require('util');
const { log, err } = require('./utils/cli');

const exec = util.promisify(require('child_process').exec);

const run = async () => {
    let output = await exec('netlify init');
    log(output.stdout);
    if (output.stderr) {
        err(output.stderr);
    }
}

module.exports = run;
