const Comment = require('../db/index').comment;
const Vote = require('../db/index').vote;
const voteController = require('./vote');
const responseDto = require("../core/utils/responseDto");

let commentController = {
    createComment: (req, res, next) => {
        Comment.create({
            comment: req.body.comment,
            ProductId: req.body.ProductId
        })
        .then(result => {
            let body = {
                CommentId: result.id
            }

            voteController.initVote(body, res, (e) => {
                if (e) {
                    res.status(500).json(responseDto(false, null, e));
                    return
                }

                getCommentByProduct(req, res, (result) => {
                    if (result.success) {
                        res.status(200).json(result);
                    } else {
                        res.status(500).json(result);
                    }
                })
            })

        })
        .catch(error => {
            console.log(error);
            res.status(500).json(responseDto(false, null, error))
        }) 
    },
    deleteComment: (req, res, next) => {
        Comment.destroy({
            where: {id: req.params.id}
        })
        .then(result => {
            res.status(200).json(responseDto(true, result, "Comment has been deleted"));
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(responseDto(false, null, error))
        });
    },
}

let getCommentByProduct = (req, res, next) => {
        Comment.findAll({
            where: {
                ProductId: req.body.ProductId
            },
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: Vote,
                    order: [["createdAt", "DESC"]],
                    as: "votes"
                }
            ]
        })
        .then(result => {
            next(responseDto(true, result, "Fetched"));
        })
        .catch(err => {
            next(responseDto(false, null, err));
        })
}

module.exports = commentController;