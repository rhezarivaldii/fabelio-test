let express = require('express');
let router = express.Router();
let commentController = require('../controllers/comment');

router.post('/', commentController.createComment);
router.post('/delete/:id', commentController.deleteComment);

module.exports = router;