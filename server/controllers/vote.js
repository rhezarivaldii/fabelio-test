const Vote = require('../db/index').vote;
const responseDto = require("../core/utils/responseDto");

let voteController = {
    initVote: (req, res, next) => {
        Vote.create({
            CommentId: req.CommentId
        })
        .then(result => {
            next()
        })
        .catch(error => {
            next(error);
        }) 
    },
    upVote: (req, res, next) => {
        Vote.findOne({where: {CommentId: req.params.CommentId}})
            .then(vote => {
                Vote.update({
                    voteUp: (vote.voteUp + 1)
                }, { where: {CommentId: req.params.CommentId}})
                .then(result => {
                    res.status(200).json(responseDto(true, result, "Vote has been submitted"))
                })
                .catch(error => {
                    res.status(500).json(responseDto(false, null, error));
                })
            })
            .catch(error => {
                res.status(500).json(responseDto(false, null, error));
            })
    },
    downVote: (req, res, next) => {
        Vote.findOne({where: {CommentId: req.params.CommentId}})
        .then(vote => {
            Vote.update({
                voteDown: (vote.voteDown + 1)
            }, { where: {CommentId: req.params.CommentId}})
            .then(result => {
                res.status(200).json(responseDto(true, result, "Vote has been submitted"))
            })
            .catch(error => {
                res.status(500).json(responseDto(false, null, error));
            })
        })
        .catch(error => {
            res.status(500).json(responseDto(false, null, error));
        })
    }
}

module.exports = voteController;
