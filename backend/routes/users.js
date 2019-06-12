var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt")
var User = require("../models/user")
var multer  = require('multer')
var path = require("path")

var upload = multer({ dest: path.join(__dirname, '../public/images/') })

router.post('/signup', function(req, res, next) {
  User.find({username: req.body.username})
    .then((user)=> {

      if(user.length > 0 ) res.status(403).json({message: "Username already taken"})
      else {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
              if(err) res.status(500).json({message: err})
              else {
                User.create({
                  username: req.body.username,
                  password: hash
                })
                .then((user)=> {
                  console.log(user)
                  req.session.user = user
                  res.status(200).json({message: "Signed up"})
                })
                .catch((err)=> {
                  res.status(500).json({message: err})
                })
              }
          });
        });
      }
    })
});

router.post('/login', function(req, res, next) {
  User.findOne({username: req.body.username}).populate("beersCreated")
    .then((user)=> {
      if(user) {
        bcrypt.compare(req.body.password, user.password, function(err, match){
          if(err) res.status(500).json({message: err}) 
          else if(match) {
            delete user.password
            req.session.user = user
            res.status(200).json({message: "Logged in."})
          } else {
            res.status(403).json({message: "Invalid credentials."})
          }
        })
      } else {
        res.status(403).json({message: "Invalid credentials."})
      }
    })
    .catch((err)=> {
      res.status(500).json({message: err}) 
    })
});

router.post("/get-user", (req, res)=> {
  if(req.session.user) {
    res.status(200).json(req.session.user)
  } else {
    res.status(403).json({message: "Not logged in"})
  }
})
router.post("/update", upload.single('profilePic'), (req, res)=> {
  User.findOneAndUpdate({_id: req.session.user._id}, {profilePic: req.file.filename}, {new: true},)
    .then((updatedUser)=> {
      req.session.user.profilePic = updatedUser.profilePic
      res.status(200).json({message: "User updated", user: updatedUser })
    })
    .catch((err)=> {
      res.status(500).json({err: err})
    })
})

router.post("/logout", (req, res)=> {
  if(req.session.user) {
    req.session.destroy()
    // res.redirect('/login');
    res.status(200).json({message: "Logged out"})
  } else {
    res.status(403).json({message: "Not logged in"})
  }
})

module.exports = router;