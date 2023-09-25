
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser =require("body-parser")

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const port = 8000;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,


  });
  const contact = mongoose.model('contact', contactSchema);



// Express Specific stuff

app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded({ extended: true })); 
// app.use('/static', express.static('static')) // For serving static files
// app.use(express.urlencoded())


// //PUG Specific Stuff
app.set('view engine', 'pug')//set the template engine as pug
app.set('views', path.join(__dirname,'views'))//set the views directory

//Endpoints
app.get('/', (req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params);

})
app.get('/contact', (req,res)=>{
    const params={ }
    res.status(200).render('contact.pug',params);

})
app.post('/contact', (req,res)=>{
    var mydata =new contact(req.body);
    mydata.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not save in the database")
    });


})
//start the server
app.listen(port, ()=>{
    console.log(`the application started sucessfully on port ${port}`);
});