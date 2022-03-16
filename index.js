const express = require('express');
const path = require('path');
const app = express();

const port = 8000;


app.listen(port,function(err){
    if(err){
        // console.log("Error: ",err);
        console.log(`Error in the running of server : ${err}`); // in this way we can also print
    }
    console.log(`Server is running on port : ${port}`);
})