const Comment = require('../modals/comment');
const Post = require('../modals/post');
const commentMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like = require('../modals/like');


module.exports.create = async function(req, res){
    let post = await Post.findById(req.body.post)
    
    if (post){
        let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
            
        })

        post.comments.push(comment);
        post.save();
        comment = await comment.populate("user", "name email");

    //   commentMailer.newComment(comment);
    let job  = queue.create('emails',comment).save(function(err){
        if(err){
            console.log("error in creating queue ",err);
            return;
        }
        console.log("Job enqued " ,job.id);
    });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    comment:comment
                },
                message:"Post Published"
            })
        }
        return res.redirect('back');
		

}}


module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })
         Like.deleteMany(({likeable:comment._id,onModel:'Comment'}));
        }else{
            return res.redirect('back');
        }
    });
}

