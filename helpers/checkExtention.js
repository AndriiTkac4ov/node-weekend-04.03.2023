const checkExtention = (fileName) => {
    const EXTENTIONS = ['json', 'txt', 'js', 'xml', 'yml'];

    const extention = fileName.slice(fileName.lastIndexOf('.') + 1);
    return {
        extention,
        isCorrected: EXTENTIONS.some(item => item === extention),
    }
};

module.exports = checkExtention;