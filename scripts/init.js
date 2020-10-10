const util = require('util');
const { ROOT_DIR } = require('./constants');

const run = async () => {
    const exec = util.promisify(require('child_process').exec);
    let output = await exec('npm i', { cwd: ROOT_DIR })
    const { log, err } = require('./utils/cli');
    log(output.stdout);
    if (output.stderr) {
        err(output.stderr);
    }
    const runSanityInit = require('./init-sanity');
    const runGatsbyInit = require('./init-gatsby');

    const options = await runSanityInit();
    await runGatsbyInit(options);
}

run();