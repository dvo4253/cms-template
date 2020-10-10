#!/usr/bin/env node
const util = require('util');
const fs = require('fs');
const path = require('path');
const open = require('open');
const { ROOT_DIR, CONFIG_PATH } = require('./constants');
const { prompt, log, err } = require('./utils/cli');

const exec = util.promisify(require('child_process').exec);

const createSanityCmd = ({ projectName, dataset, projectDir }) => {

    // --template moviedb
    // 
    return `sanity init -y --create-project "${projectName}" --dataset ${dataset} --output-path ${path.join(ROOT_DIR, projectDir)}`
}

const run = async () => {
    try {
        let token = null;
        const env = await prompt("Enter an environment (ie. development): ");

        const ENV_PATH = path.join(ROOT_DIR, `.env.${env}`);

        const projectName = prompt("Enter a Sanity IO Project Name: ");
        const dataset = prompt("Enter the dataset name: ");
        const private = (prompt("Is the dataset private (y/n)")) === "y" ? true : false;
        const projectDir = projectName.replace(' ', '-').toLowerCase();

        const sanityConfig = { projectName, projectDir, dataset, private };
        log(`Creating the sanity.io project, ${projectName}, with the dataset ${dataset}.`)
        log();
        const sanityCmd = createSanityCmd(sanityConfig);
        log(`Running...`)
        log(sanityCmd);
        let sanityCmdOutput = await exec(sanityCmd);

        log(sanityCmdOutput.stdout);
        if (sanityCmdOutput.stderr) {
            err(sanityCmdOutput.stderr);
        }
        let sanityProjectsOutput = await exec('sanity projects list');
        const projectRegex = new RegExp(`^([\\d|\\w]*)\\s*.*${projectName}.*`, "m");
        const projectID = projectRegex.exec(sanityProjectsOutput.stdout)[1];
        if (private) {
            await exec('sanity dataset visibility get cms-test', { cwd: path.join(ROOT_DIR, projectDir) });
            await exec('sanity dataset visibility set cms-test private', { cwd: path.join(ROOT_DIR, projectDir) });
            await exec('sanity dataset visibility get cms-test', { cwd: path.join(ROOT_DIR, projectDir) });
            
            open('https://manage.sanity.io/');
            token = prompt("Please retrieve an api token: ", {hide: true})
        }

        fs.writeFileSync(ENV_PATH, 
`SANITY_PROJECT_ID=${projectID}
SANITY_DATA_SET=${dataset}
SANITY_PRIVATE=${private}
${private ? `SANITY_${env.toUpperCase()}_TOKEN="${token}"` : ''}`
        );

        fs.writeFileSync(CONFIG_PATH, JSON.stringify({
            sanity: {
                [sanityConfig.projectName]: {
                    [sanityConfig.dataset]: {
                        private,
                        projectDir,
                        projectID
                    }
                }
            }
        }), { encoding: 'utf8', flag: 'w' });
        await exec('sanity graphql deploy --playground', { cwd: path.join(ROOT_DIR, projectDir) });

        return {env, private};
    }
    catch (error) {
        err(error.message);
    }
}

module.exports = run;