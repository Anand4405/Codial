const passport = require('passport');
const env = require('./environment')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../modals/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret:env.google_client_secret,
    callbackURL: env.google_call_back_url


},function(accessToken,refreshToken,profile,done){
    // find user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log("error in google strategy ",err);
            return;
        }
        // console.log(profile);
        // if found set this user as req.user
        if(user){
            return done(null,user);
        }else{
            // if not found create the new user set it as req.user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log('Error in creating user ',err);
                    return;
                }
                return done(null,user);
            })
        }
    })
}


))

module.exports = passport;

