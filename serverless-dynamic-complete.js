/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const YAML = require('yaml-js');

/**
 * This is used to load all the functions dynamically from each
 * .yml configuration file into the general serverless.yml file
 */

const main = async () => {
    let consolidated = [];
    const apps = fs
        .readdirSync('./src', {
            withFileTypes: true
        })
        .filter((folder) => folder.isDirectory())
        .filter((folder) => folder.name !== 'Modules');
    for (app of apps) {
        const files = fs.readdirSync(`./src/${app.name}`, {
            withFileTypes: true,
        });

        const newYaml = await files
            .filter((folder) => folder.name !== '.serverless')
            .filter((folder) => folder.name !== '.build')
            .filter((folder) => folder.name !== 'node_modules')
            .filter((folder) => folder.isDirectory())
            .map((folder) => fs.readFileSync(`./src/${app.name}/config.yml`, 'utf8'))
            .map((raw) => YAML.load(raw))
            .reduce((result, serverless) => Object.assign(result, serverless), {});

        if (Object.keys(newYaml).length > 0) {
            newYaml[app.name]['handler'] = `src/${app.name}/handler/index.handler`;
            consolidated = consolidated.concat(newYaml);
        }
    }
    console.log('--------------------');
    console.log(consolidated);
    console.log('--------------------');
    return consolidated;
};

module.exports = main();