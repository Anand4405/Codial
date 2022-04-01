const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codial_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error in connecting MongoDB"));

db.once('open',function(){
console.log("Server is succesfully connected to :: MongoDB");
})

module.exports = db;