//const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

let password = process.env.DB_PASS;

mongoose.connect("mongodb+srv://yourSkill:"+password+"@cluster0-otay8.mongodb.net/test?retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser: true},(err,client)=>{
    if(err){
        console.log('Error connecting to Mongoose Mainbase!! ',err )
    }else{
        console.log('MongoDB Database connected...');
        console.log('WARNING: MongoDB requires a network connection... Server may not be running if there isn\'t a stable connection...');
    }
});

module.exports = mongoose;
