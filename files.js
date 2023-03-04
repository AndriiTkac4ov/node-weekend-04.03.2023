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

    fsPromises.writeFile(path.join(__dirname, './files', fileName), content, 'utf-8')
        .then(() =>
            console.log(chalk.green('File created success!')))
        .catch(error => console.log(error));

    ;
};

const getFiles = () => {
    fsPromises.readdir(path.join(__dirname, './files'))
        .then(data => {
            if (!data.length) {
                console.log(chalk.red('There are no files in this directory'));

                return;
            }

            data.forEach(file => console.log(chalk.blueBright(file)))
        })
        .catch(error => console.log(error));
};

const getFile = (file) => {
    fsPromises.readdir(path.join(__dirname, './files'))
        .then(data => {
            if (!data.includes(file)) {
                console.log(chalk.red(`The file with name "${file}" is not found`));

                return;
            }

            fsPromises.readFile(path.join(__dirname, './files', file), 'utf-8')
                .then(text => {
                    fsPromises.stat(path.join(__dirname, './files', file)).then(data => 
                        console.log({
                            message: "Success",
                            fileName: file,
                            content: text,
                            extention: checkExtention(file).extention,
                            size: data.size,
                            data: data.birthtime.toLocaleTimeString(),
                        })
                    );
                });
        })
        .catch(error => console.log(error));
};

module.exports = {
    createFile,
    getFiles,
    getFile,
};