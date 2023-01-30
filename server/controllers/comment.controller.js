const Comment = require('../models/comment.model')

module.exports = {
    createComment: (req,res) => {
        Comment.create(req.body)
            .then(newComment => res.json(newComment))
            .catch(err => res.status(400).json(err))
    },
    fetchAllComments: (req,res) => {
        Comment.find().populate('post').populate('user')
            .then(allComments => res.json(allComments))
            .catch(err => res.json(err))
    },
    fetchCommentById: (req,res) => {
        Comment.find({_id:req.params.id}).populate('post').populate('user')
            .then(thisComment => res.json(thisComment))
            .catch(err => res.json(err))
    },
    fetchCommentsByPostId: (req,res) => {
        Comment.find({post:req.params.id}).populate('post').populate('user')
            .then(postComments => res.json(postComments))
            .catch(err => res.json(err))
    },
    updateComment: (req,res) => {
        Comment.updateOne({_id:req.params.id}, req.body, {runValidators:true})
            .then(results => res.json(results))
            .catch(err => res.status(400).json(err))
    },
    deleteComment: (req,res) => {
        Comment.findByIdAndDelete({_id:req.params.id})
            .then(results => res.json(results))
            .catch(err => res.json(err))
    }
}