const util = require('util');
const { ROOT_DIR } = require('./constants');

const run = async () => {
    const exec = util.promisify(require('child_process').exec);
    await exec('npm i', { cwd: ROOT_DIR })

    const runSanityInit = require('./init-sanity');
    const runGatsbyInit = require('./init-gatsby');

    const options = await runSanityInit();
    await runGatsbyInit(options);
}

run();