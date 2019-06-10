var express = require('express');
var router = express.Router();
var Beer = require("../models/beer")
var User = require("../models/user")
var mongoose = require('mongoose')
var multer  = require('multer')
var path = require("path")

router.post("/beer", (req,res)=> {
    Beer.create( { 
        creator: req.session.user._id, 
        ...req.body
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

router.get("/all", (req, res)=> {

    Beer.find({})
        .then(beers => {
            res.status(200).json(beers)
        })
        .catch(err => {
            res.status(500).json({message:err});
        })


        // .then((beers)=> {
        //     // send back in json
        // })
        // .catch((err)=> {
        //     // send err back in json with erro status code
        // })
})


// updating creator with a new beer
// router.get("/CreateBeer/:userId" , (req, res) => {

module.exports = router;