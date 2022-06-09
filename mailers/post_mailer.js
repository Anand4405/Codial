const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newPost = (post)=>{
   
    let htmlString = nodeMailer.renderTemplate({post:post},'/posts/new_post.ejs')

    nodeMailer.transporter.sendMail({
        from:'anandpatil4405@gmail.com',
        to:post.user.email,
        subject:"New Post published",
        html:htmlString
    }, (err,info)=>{
        if(err){
            console.log('Error in sending the mail ',err);
            return ;
        }
        console.log('Mail delivered ', info);
        return;
    })
}