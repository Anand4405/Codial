const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment)=>{
   
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')

    nodeMailer.transporter.sendMail({
        from:'anandpatil4405@gmail.com',
        to:comment.user.email,
        subject:"New comment published",
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