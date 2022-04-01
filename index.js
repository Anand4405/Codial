const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts); // we need to use layouts before the routes
app.use(express.static('./assests'));
// extract styles and scripts from sub pages into layout
app.set('layout extractStyles');
app.set('layout extractScripts');
// use express router
app.use('/', require('./routes'));


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});

