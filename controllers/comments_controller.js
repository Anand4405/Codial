const Comment = require('../modals/comment');
const Post = require('../modals/post');

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
        post = await post.populate("user", "name email");
   
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
        }else{
            return res.redirect('back');
        }
    });
}

