const fs = require('fs');
const rfs = require('rotating-file-stream');
const path  =require('path');

const logDirectory = path.join(__dirname,'../production_logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream  = rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});

const development = {
    name:'development',
    asset_path:'./assests',
    session_cookie_key:'blahsomething',
    db:'codial_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'anandpatil4405@gmail.com',
            pass:'anand4405'
        }
    
    },
    google_client_id: "55391896152-73qel4puje3m5ob1k8h709o2ni7fj5oq.apps.googleusercontent.com",
    google_client_secret:"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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codial',
    morgan:{
        mode:'dev',
        options:{stream : accessLogStream}
    }
}

const production = {
    name:'production',
    asset_path:process.env.CODIAL_ASSEST_PATH,
    session_cookie_key:process.env.CODIAL_SESSION_COOKIE,
    db:process.env.CODIAL_DB,
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.CODIAL_GMAIL_USERNAME,
            pass:process.env.CODIAL_GMAIL_PASSWORD
        }
    
    },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret:process.env.GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODIAL_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.CODIAL_JWT_SECRET, // localhost:8000 need to be change 

    morgan:{
           mode:'combined',
           options:{stream : accessLogStream}
       }
    }



module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);