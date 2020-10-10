#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { ROOT_DIR, CONFIG_PATH } = require('./constants');
const { prompt,log } = require('./utils/cli');

const gatsbyConfigFileTemplatePath = path.join(ROOT_DIR, 'templates/__gatsby-config.js');
const gatsbyConfigFilePath = path.join(ROOT_DIR, "gatsby-config.js")
const PROJECT_ID_KEY = "\"@@_ProjectID_@@\""
const DATASET_KEY = "\"@@_DatasetName_@@\"";
const TOKEN_KEY = "\"@@_Token_@@\"";



const run = async (options) => {
    // const cmsConfig = JSON.parse(fs.readFileSync(CONFIG_PATH, { encoding: 'utf8', flag: 'r' }));

    const {env, private } = options;
    const ENV_PATH = path.join(ROOT_DIR, `.env.${env}`)
    // require('dotenv').config(ENV_PATH);
    let tokenParam = private ? `process.env.NODE_ENV === "${env}" ? process.env.SANITY_${env.toUpperCase()}_TOKEN : process.env.SANITY_TOKEN` : '';

    const gatsbyConfigTemplate = fs.readFileSync(gatsbyConfigFileTemplatePath, { encoding: 'utf8', flag: 'r' });
    // let projectID = null;
    // let dataset = null;
    // let projectName = null;
    // const projectID = await prompt("Enter the Sanity IO Project ID: ");
    // const dataset = await prompt("Enter the Sanity IO Dataset: ");
    // const sanityProjects = Object.keys(cmsConfig.sanity);
    // if(sanityProjects.length > 1) {
    //     // prompt...
    // }
    // else if (sanityProjects.length === 1) {
    //     projectName = sanityProjects[0];
    // }

    // const sanityDatasets = Object.keys(cmsConfig.sanity[projectName]);
    // if(sanityDatasets.length > 1) {
    //     // prompt...
    // }
    // else if (sanityDatasets.length === 1) {
    //     dataset = sanityDatasets[0];
    // }

    // projectID = cmsConfig.sanity[projectName][dataset].projectID;
    const gatsbyConfigContents = gatsbyConfigTemplate
        .replace(PROJECT_ID_KEY, 'process.env.SANITY_PROJECT_ID')
        .replace(DATASET_KEY, 'process.env.SANITY_DATA_SET')
        .replace(TOKEN_KEY, tokenParam);

    fs.writeFileSync(gatsbyConfigFilePath, gatsbyConfigContents, { encoding: 'utf8', flag: 'w' })
}

module.exports = run;
