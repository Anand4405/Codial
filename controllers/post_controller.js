const Post = require('../modals/post');
const Comment = require('../modals/comment')
const postMailer = require('../mailers/post_mailer');
const Like = require('../modals/like');

module.exports.create = async function(req,res){
  try{
      var post = await  Post.create({
        content:req.body.content,
        user:req.user._id
    });

    
    post = await post.populate("user", "name email");
    postMailer.newPost(post);

    if(req.xhr){
        return res.status(200).json({
            data:{
                post:post
            },
            message: "Post Created!!"
        })
    }

    req.flash('success','Post Published');
    return res.redirect('back');}
    catch(err){
       req.flash('Error',err);
        return;
    }
}

module.exports.destroy =  function(req,res){
    Post.findById(req.params.id,function(err,post){
        // .id means converting object id into string
        if(post.user == req.user.id){
            Like.deleteMany({likeable:post,onModel:'Post'});
            Like.deleteMany(({_id: {$in:post.comments}}))
            post.remove();
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post deleted"
                })
            }
            Comment.deleteMany({post:req.params.id},function(err){
                req.flash('success',"Post deleted successfully");
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}