var express = require('express');
var router = express.Router();
var Beer = require("../models/beer")
var User = require("../models/user")
var mongoose = require('mongoose')
var multer  = require('multer')
var path = require("path")
var upload = multer({ dest: `${__dirname}/../public/uploads` })

router.post("/beer", upload.single('beer-pic'), (req,res)=> {
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


router.get("/edit", (res, req)=>{
    debugger
    Beer.findOne({_id: req.query.id})
    .then((beer)=> {
        if(beer.creator == req.session.user._id) {
                beer.update()
                    .then(()=> {
                        res.status(204).json({message: "Beer is updated"})
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

router.post("/edit", upload.single('beer-pic'), (req, res)=>{
    debugger
    console.log(req.body, req.session.user._id)
    console.log(req.files)

    Beer.findById(req.body.id).then(beer => {
    
        if(beer.creator == req.session.user._id) {
            let updatedBeer = {
                type: req.body.type,
                tagline: req.body.tagline,
                description: req.body.description,
                name: req.body.name,
            }
            
            if(req.file) updatedBeer.pic = req.file.filename
            
            Beer.findOneAndUpdate ({_id: req.body.id}, updatedBeer, {new:true})
            .then ((beer)=> {
                res.status(200).json(beer)
            })
            .catch(err=> {
                res.status(500).json({message: err})
            })
        } else {
            res.status(403).json({message: "This is not your beer pall."})
        }
    }).catch(err => {
        res.status(500).json({message: err});

    })
})
// updating creator with a new beer
// router.get("/CreateBeer/:userId" , (req, res) => {

module.exports = router;