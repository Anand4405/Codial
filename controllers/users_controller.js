// module.exports.profile = function(req,res){
//    return res.end('<h1> User Profile </h1>');
// }

const User = require('../modals/user.js');

module.exports.profile = function(req, res){
  return  res.render('user_profile',{
      title: "User Profile"
  });
}
// render the sign Up page
module.exports.signUp = function(req,res){

    return res.render('user_sign_up',{
        title: "Codial | SignUp"
    })
}
// render the sign In page
module.exports.signIn = function(req,res){

    return res.render('user_sign_in',{
        title: "Codial | SignIn"
    })
}

// get the sign Up data

module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log("Error in signing up ") 
        return;}
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log("Error in creating user in signup ")
                 return;}
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    })

}


// sign in and create session
module.exports.createSession = function(req,res){

    // do later
}