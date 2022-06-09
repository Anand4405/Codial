const Post = require('../modals/post');
const User = require('../modals/user');
module.exports.home = async function(req, res){
    try{

        let posts=  await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
            // ,
            // populate:{
            //     path:'likes'
            // }
        })//.populate('likes');
       
        let users = await User.find({})
    
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users:users
        });
    }catch(err){
        console.log("Error ",err);
        return;
    }
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });

    // populate the user of each post
   

        

   

}