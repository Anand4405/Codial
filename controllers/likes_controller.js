const Like  =require('../modals/like');
const Comment = require('../modals/comment');
const Post = require('../modals/post');

module.exports.toggleLike = async function(req,res){


    try{
        
        // likes/toggle/?id=abcd&type=Post
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');

        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');

        }
        // check if like alredy exist
        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel: req.query.type,
            user:req.user._id
        })

        // if like already exists then delete it else make a new like
        
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        }else{
            let newLike = await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
            });
         likeable.likes.push(newLike._id);
            likeable.save();
        }
        // return res.redirect('back');
        return res.json(200,{
            message:"Request Succesful",
            data:{
                deleted:deleted
            }
        // return res.redirect('back');
        })

    }catch(err){
        console.log(err);

        return res.json(500,{
            message:"Internal server error"
        })
    }

}