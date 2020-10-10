const { ROOT_DIR } = require('./constants');
const exec = util.promisify(require('child_process').exec); const runSanityInit = require('./init-sanity');
const runGatsbyInit = require('./init-gatsby');

const run = async () => {
    await exec('npm i -D open readfile-sync chalk', { cwd: ROOT_DIR })
    const options = await runSanityInit();
    await runGatsbyInit(options);
}

run();