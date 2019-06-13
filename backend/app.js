var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose")
var cors = require("cors")
var session = require('express-session')
var bodyParser = require('body-parser')
require("dotenv").config()
const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI)
    .then(()=> {
        console.log("connected to mongo")
    })
    .catch((err)=> {
        console.log("not connected to mognod", err)
    })

var app = express();
app.use(cors({
    origin: ["http://localhost:3000", "localhost:3000", "localhost:3000/", "http://localhost:3000/"],
    credentials: true
}))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/build')));

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'));

const Beer = require("./models/beer")
app.get("/beers/all", (req, res)=> {
    Beer.find({})
        .then(beers => {
            res.status(200).json(beers)
        })
        .catch(err => {
            res.status(500).json({message:err});
        })
})

app.use('/beers', protect, require('./routes/beers'));


function protect(req, res, next) {
    if(req.session.user) next()
    else res.status(403).json({message: "not logged in"})
}
 module.exports = app;