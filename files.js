const fsPromises = require('fs').promises;
const path = require('path');

const chalk = require('chalk');

const dataValidator = require('./helpers/dataValidator');
const checkExtention = require('./helpers/checkExtention');

const createFile = (fileName, content) => {
    const data = {
        fileName,
        content,
    }

    const result = dataValidator(data);
    // console.log(result.error.details[0]);
    if (result.error) {
        console.log(chalk.red(`Please specify ${result.error.details[0].context?.key} parametr`));

        return;
    }

    const checkData = checkExtention(fileName);
    if (!checkData.isCorrected) {
        console.log(chalk.red(`Sorry, application doesn't support ${checkData.extention} extention`));

        return;
    }

    fsPromises.writeFile(path.join(__dirname, './files', fileName), content, 'utf-8');

    console.log(chalk.green('File corrected success!'));
}

module.exports = {
    createFile,
}