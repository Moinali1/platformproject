//for mongo atlas deploy
require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 80;
const mongoose = require('mongoose');
// const bodyparser = require('body-parser');
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("!!connection is successfully") 
});

const learningSchema = new mongoose.Schema({
    name:{type:String,
          required:true},
    phone:{type:Number,
             required:true},
    email:  {type:String,
             required:true,
            //  unique:true
            },
    gender: {type:String,
             required:true},
    course: {type:String,
             required:true},
    pin:    {type:String,
             required:true},
    address:{type:String,
             required:true}
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
app.get('/about', (req, res)=>{
    const params = {}
    res.status(200).render('about.pug', params);
})
app.get('/courses', (req, res)=>{
    const params = {}
    res.status(200).render('courses.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var resultdata=new contact({
    name:req.body.name,
    phone:req.body.phone,
    email:req.body.email,
    gender:req.body.gender,
    course:req.body.course,
    pin:req.body.pin,
    address:req.body.address
    })
    resultdata.save().then(()=>{
        res.send("The details are saved succesfully, we will shortly contact you.");
    }).catch(()=>{
        res.status(400).send("Details not saved,check there is some mistake in entey or email is already used");
    })
    
})

// app.post('/contact', (req, res)=>{
//     var resultdata=new contact(req.body);
//     resultdata.save().then(()=>{
//         res.send("The details are saved succesfully, we will shortly contact you.");
//     }).catch(()=>{
//         res.status(400).send("details not saved");
//     })
    
// })

app.get('/why-us', (req, res)=>{
    const params = {}
    res.status(200).render('why-us.pug', params);
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});







//for simple heroku deploy

// const express = require("express");
// const path = require("path");
// const app = express();
// const port = process.env.PORT || 8000;

// // EXPRESS SPECIFIC STUFF
// app.use('/static', express.static('static')) // For serving static files
// app.use(express.urlencoded())

// // PUG SPECIFIC STUFF
// app.set('view engine', 'pug') // Set the template engine as pug
// app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// // ENDPOINTS
// app.get('/', (req, res)=>{
//     const params = {}
//     res.status(200).render('home.pug', params);
// })
// app.get('/contact', (req, res)=>{
//     const params = {}
//     res.status(200).render('contact.pug', params);
// })

// // START THE SERVER
// app.listen(port, ()=>{
//     console.log(`The application started successfully on port ${port}`);
// });








//-------for pc localhost mongo compass

// const express = require("express");
// const path = require("path");
// const app = express();
// const port = process.env.PORT || 8000;
// const mongoose = require('mongoose');
// const bodyparser = require('body-parser');
// mongoose.connect('mongodb://localhost:27017/learning', {useNewUrlParser: true, useUnifiedTopology: true});

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log("!!connection is successfully")
// });

// const learningSchema = new mongoose.Schema({
//     name: String,
//     phone: String,
//     email: String,
//     pin: String,
//     address: String
// });
// const contact = mongoose.model('contact', learningSchema);

// // EXPRESS SPECIFIC STUFF
// app.use('/static', express.static('static')) // For serving static files
// app.use(express.urlencoded())

// // PUG SPECIFIC STUFF
// app.set('view engine', 'pug') // Set the template engine as pug
// app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// // ENDPOINTS
// app.get('/', (req, res)=>{
//     const params = {}
//     res.status(200).render('home.pug', params);
// })
// app.get('/contact', (req, res)=>{
//     const params = {}
//     res.status(200).render('contact.pug', params);
// })
// app.post('/contact', (req, res)=>{
//     var resultdata=new contact(req.body);
//     resultdata.save().then(()=>{
//         res.send("The details are saved succesfully, we will shortly contact you.");
//     }).catch(()=>{
//         res.status(400).send("details not saved");
//     })
    
// })

// // START THE SERVER
// app.listen(port, ()=>{
//     console.log(`The application started successfully on port ${port}`);
// });
