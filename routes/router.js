const express = require('express');
const controllers = require('../files');

const router = express.Router();

router.route('/').get(controllers.getFiles).post(controllers.createFile);
router.route('/:fileName').get(controllers.getFile).delete(controllers.deleteFile);

module.exports = router;