const Post = require('../models/post.model')

module.exports = {
    createPost: (req,res) => {
        Post.create(req.body)
            .then(newPost => res.json(newPost))
            .catch(err => res.status(400).json(err))
    },
    fetchAllPost: (req,res) => {
        Post.find().populate('user').sort({createdAt:-1})
            .then(allPosts => res.json(allPosts))
            .catch(err =>  res.json(err))
    },
    fetchPostById: (req,res) => {
        Post.find({_id:req.params.id}).populate('user')
            .then(thisPost => res.json(thisPost))
            .catch(err => res.json(err))
    },
    fetchAllPostByUserId: (req,res) => {
        Post.find({user:req.params.id}).populate('user').sort({createdAt:-1})
            .then(allPosts => res.json(allPosts))
            .catch(err =>  res.json(err))
    },
    UpdatePost: (req,res) => {
        Post.updateOne({_id:req.params.id}, req.body, {runValidators:true})
            .then(results => res.json(results))
            .catch(err => res.status(400).json(err))
    },
    deletePost: (req,res) => {
        Post.findByIdAndDelete({_id:req.params.id})
            .then(results => res.json(results))
            .catch(err => res.json(err))
    }
}