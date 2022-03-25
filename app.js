const express = require("express");
// const { parseCIDR } = require("ipaddr.js");
const port = 80;
const app = express();

//Mongoose Define And Import
const mongoose = require("mongoose");

//Body-Parser Install and Define
const bodyParser = require("body-parser");


//Connecting With mongoDb Compass
app.use(bodyParser.urlencoded({extended: true}))
mongoose.connect("mongodb://localhost:27017/RegistrationForm", {
    useNewUrlParser:true
}).then(()=>{
    console.log("MongoDB Compass Connection succesful");
})
.catch((error)=>{
    console.log("Connection With MongoDb Was Intrupted");
})
    
//Home Page Calling
app.get("/",(req,res)=>{
    // console.log('Hello Guys  ');
    app.use(express.static('static'));
    app.use('/style.css', express.static(__dirname + '/style.css'));
    res.sendFile(__dirname + "/index.html");
})

const notesSchema = {
    firstName : String,
    lastName : String,
    phone : String,
    email : String,
    password : String,
    rePassword : String,
}


const Note = mongoose.model("Note",notesSchema);

app.post("/",function(req,res){
    let newNote = new Note({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        phone : req.body.phone,
        email : req.body.email,
        password : req.body.password,
        rePassword : req.body.rePassword
    })
    newNote.save()
    app.use(express.static('static'));
    app.use('/style2.css', express.static(__dirname + '/style2.css'));
    res.sendFile(__dirname + "/index2.html");
})


//Server Start
app.listen(port , ()=>{
    console.log(`Server Started Succesfully At Port :: ${port}`);
})