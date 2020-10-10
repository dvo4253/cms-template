const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const CONFIG_PATH = path.join(ROOT_DIR, '.cms-config.json')
module.exports = {
    ROOT_DIR,
    CONFIG_PATH
}