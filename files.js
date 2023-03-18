const fsPromises = require('fs').promises;
const path = require('path');

const dataValidator = require('./helpers/dataValidator');
const checkExtention = require('./helpers/checkExtention');

exports.createFile = async (req, res) => {
    try {
        const { fileName, content } = req.body;

        const result = dataValidator(req.body);
    
        if (result.error) {
            res.status(400).json({
                message: `Please specify ${result.error.details[0].context?.key} parameter`
            });

            return;
        }

        const checkData = checkExtention(fileName);

        if (!checkData.isCorrected) {
            res.status(400).json({
                message: `Sorry, application doesn't support ${checkData.extention} extention`
            });

            return;
        };

        await fsPromises.writeFile(path.join(__dirname, './files', fileName), content, 'utf-8');

        res.status(201).json(fileName);
    } catch (error) {
        res.status(500).json({ message: 'Server error'});
    }
};

exports.getFiles = async (req, res) => {
    try {
        const files = await fsPromises.readdir(path.join(__dirname, './files'));

        if (!files.length) {
            res.status(404).json({ message: 'There are no files in this directory' });

            return;
        };

        res.status(200).json(files);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error'});
    }
};

exports.getFile = async (req, res) => {
    try {
        const { fileName } = req.params;

        const files = await fsPromises.readdir(path.join(__dirname, './files'));

        if (!files.includes(fileName)) {
            res.status(404).json({ message: `The file with name "${fileName}" is not found`});

            return;
        };

        const file = files.find(file => file === fileName);

        const text = await fsPromises.readFile(path.join(__dirname, './files', fileName), 'utf-8');

        const stat = await fsPromises.stat(path.join(__dirname, './files', file));

        res.status(200).json({
            file,
            content: text,
            extention: checkExtention(file).extention,
            fileSize: stat.size,
            data: stat.birthtime.toString(),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error'});
    };
};

exports.deleteFile = async (req, res) => {
    try {
        const { fileName } = req.params;

        const files = await fsPromises.readdir(path.join(__dirname, './files'));

        if (!files.includes(fileName)) {
            res.status(404).json({ message: `The file with name "${fileName}" is not found`});

            return;
        };

        await fsPromises.unlink(path.join(__dirname, './files', fileName));
        const newFiles = await fsPromises.readdir(path.join(__dirname, './files'));

        res.status(200).json(newFiles);
    } catch (error) {
        res.status(500).json({ message: 'Server error'});
    }
}
