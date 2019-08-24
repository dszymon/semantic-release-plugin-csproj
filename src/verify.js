const fs = require('fs');
const path = require('path');

module.exports.verify = async ({projectFile}, {cwd}) => {
    if (typeof projectFile !== 'string') {
        throw new Error('Missing argument "projectFile"');
    }

    const projectFilePath = path.resolve(cwd, projectFile);

    if (!fs.existsSync(projectFilePath)) {
        throw new Error(`Project file "${projectFilePath}" does not exist`);
    }
};
