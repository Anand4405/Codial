const User = require('../modals/user');


module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user){

        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user
        })
    });
}

module.exports.update = function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back');
        })
    }else{
        return res.status(401).send('Unauthorized');
    }
}


// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}





// sign in and create session
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
    // // find user
    // User.findOne({email:req.body.email},function(err,user){
    //     if(err){
    //         console.log("Error in signing in");
    //         return;
    //     }
    //     // handle user found
    //     if(user){
    //         // 
    //         if(user.password != req.body.password){
    //             return res.redirect('back');
    //         }else{
    //             // handle creating session
    //             res.cookie('user_id ',user.id);
    //                 return res.redirect('/users/profile');
                
    //         }
    //     }else{
    //         return res.redirect('back');
    //     }
    // })
    
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','You are logged Out!!')
    return res.redirect('/');
}

