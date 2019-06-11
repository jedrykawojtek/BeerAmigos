var express = require('express');
var router = express.Router();
var Beer = require("../models/beer")
var User = require("../models/user")
var mongoose = require('mongoose')
var multer  = require('multer')
var path = require("path")
var upload = multer({ dest: `${__dirname}/../public/uploads` })

router.post("/beer", upload.single('beer-pic'), (req,res)=> {
    debugger
    Beer.create( { 
        creator: req.session.user._id, 
        ...req.body,
        pic: req.file.filename

    })
    .then(beer =>{
        User.findOneAndUpdate({
            _id:req.session.user._id, 
            $push:{ beersCreated: beer._id} 
        })
        .then(updatedUser => {
            res.status(200).json({message:"user updated"})
        })
        .catch(err => {
            res.status(500).json({message:err});
        })
    })
    .catch(err => {
        res.status(500).json({message:err});
    })
   
})

router.get("/user-beers", (req, res)=> {
    User.findById(req.session.user._id)
        .populate("beersCreated")
        .then( user => {
            res.status(200).json({beers : user.beersCreated})
        })
        .catch((err)=> {
            res.status(500).json({message:err});
        })

    // use beer model to fetch all the beers
    // return the beers in json 
})

router.get("/delete", (req, res)=> {
    debugger
    // run with debugger
    // req.query.id in right format? mongoosche.types.ObjectId?
    Beer.findOne({_id: req.query.id})
        .then((beer)=> {
            if(beer.creator == req.session.user._id) {
                beer.remove()
                    .then(()=> {
                        res.status(204).json({message: "Beer was removed"})
                    })
            }
            else  {
                res.status(403).json({message: "This is not your beer pall."})
            }
        })
        .catch(err=> {
            res.status(500).json({message: err})
        })
})

router.get("/all", (req, res)=> {

    Beer.find({})
        .then(beers => {
            res.status(200).json(beers)
        })
        .catch(err => {
            res.status(500).json({message:err});
        })

})

router.get("/edit", (res, req)=>{
    Beer.findOne({_id: req.query.id})
    .then((beer)=> {
        res.json(beer)
    })
    .catch(err=> {
        res.status(500).json({message: err})
    })

})

router.post("/edit", (res, req)=>{
    if(beer.creator == req.session.user._id)
    Beer.findOneAndUpdate ({_id: req.query.id}, {new: true})
     .then ((beer)=> {
        res.status(204).json(beer)
    })
    .catch(err=> {
        res.status(500).json({message: err})
    })

})
// updating creator with a new beer
// router.get("/CreateBeer/:userId" , (req, res) => {

module.exports = router;