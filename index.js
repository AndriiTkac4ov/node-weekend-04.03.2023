const { createFile } = require('./files');
const argv = require('yargs').argv;

const invokeAction = ({ action, fileName, content }) => {
    switch (action) {
        case 'create':
            createFile(fileName, content);
            break;
    
        default:
            console.warn('Unknown action type');
    }
}

invokeAction(argv);