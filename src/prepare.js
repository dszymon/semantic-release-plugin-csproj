const fs = require('fs').promises;
const path = require('path');

module.exports.prepare = async ({projectFile}, {cwd, nextRelease, logger}) => {
    const projectFilePath = path.join(cwd, projectFile);

    logger.log('Write version %s to %s', nextRelease.version, projectFilePath);
    const xml = (await fs.readFile(projectFilePath)).toString();

    let match = xml.match(/<Version>(.*?)<\/Version>/);
    let nextContent = xml;

    if (match === null) {
        match = xml.match(/( *)<TargetFramework>.*/);

        if (match === null) {
            throw new Error('Invalid project file');
        }

        nextContent = xml.replace(
            match[0],
            match[0] + '\n' + match[1] + `<Version>${nextRelease.version}</Version>`,
        );
    }
    else {
        nextContent = xml.replace(match[0], match[0].replace(match[1], nextRelease.version));
    }

    await fs.writeFile(projectFilePath, nextContent);
};
