const util = require('util');
const { ROOT_DIR } = require('./constants');

const run = async () => {
 
    const runSanityInit = require('./init-sanity');
    const runGatsbyInit = require('./init-gatsby');

    const options = await runSanityInit();
    await runGatsbyInit(options);
}

run();