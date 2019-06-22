let express = require('express');
let router = express.Router();
let voteController = require('../controllers/vote');

router.post('/', voteController.initVote);
router.post('/downVote/:CommentId', voteController.downVote);
router.post('/upVote/:CommentId', voteController.upVote);

module.exports = router;