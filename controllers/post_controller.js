const Post = require('../modals/post');
const Comment = require('../modals/comment')
module.exports.create = async function(req,res){
  try{
      let post = await  Post.create({
        content:req.body.content,
        user:req.user._id
    });

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