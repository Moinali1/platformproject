const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/learning', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("!!connection is successfully")
});

const learningSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    pin: String,
    address: String
});
const contact = mongoose.model('contact', learningSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var resultdata=new contact(req.body);
    resultdata.save().then(()=>{
        res.send("The details are saved succesfully, we will shortly contact you.");
    }).catch(()=>{
        res.status(400).send("details not saved");
    })
    
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
