const path = require('path')
const util = require('util');
const { log, err } = require('./utils/cli');
const {ROOT_DIR } = require('./constants');
const exec = util.promisify(require('child_process').exec);

// const exec = require('child_process').exec;
const args = process.argv.slice(2);
const run = async (options) => {
    const [ env ] = options;
    const envPath = path.join(ROOT_DIR,`.env.${env}` )
    let output = await exec(`netlify env:import ${envPath}`);
    log(output.stdout);
    if (output.stderr) {
        err(output.stderr);
    }

}
run(args);
module.exports = run;
