const express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('../model/user');
const multer = require("multer");
const Order = require('../model/order');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './profile');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + '-' + file.originalname)
  }
});
var upload = multer({
  storage
});

router.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email,
    isVendor: req.body.isVendor
  }).then(user => {
    if (user) {
      bcrypt.compare(req.body.password, user.password).then(result => {
        let token = jwt.sign({
          email: user.email,
          isVendor: user.isVendor
        }, "This_is _the_unique_token_for_encryption", {
          expiresIn: '1h'
        });
        if (user) {
          res.status(200).json({
            token: token,
            message: "AUTH Success",
            expiresIn: 3600,
            result: user
          })
        }
      })
    } else {
      res.status(200).json({
        message: "Invalid authentication credentials!",
        result: null
      })
    }
  });
});
router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    User.findOne({
      email: req.body.email
    }).then(user => {
      if (user) {
        return res.status(200).json({
          error: {
            message: "User Exists"
          }
        });
      } else {
        new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNo: req.body.phoneNo,
          email: req.body.email,
          password: hash,
          isVendor: req.body.isVendor
        }).save().then(result => {
          res.status(201).json({
            message: "User created!",
            result: result
          })
        })
      }
    })
  })
});
router.post('/fetch', (req, res) => {
  User.findOne({
    _id: req.body.id
  }).then(user => {
    if (user) {
      res.status(200).json({
        user: user,
      })
    } else {
      res.status(200).json({
        message: "Invalid authentication credentials!",
        result: null
      })
    }
  });
});
router.post('/updateUser', upload.single('image'), (req, res) => {
  if (req.file) {
    let url = req.protocol + "://" + req.get('host');
    req.body['image'] = url + "/uploads/" + req.file.filename;
  }
  if (req.body.billingAddress) {
    req.body.billingAddress = JSON.parse(req.body.billingAddress);
  }
  User.findOneAndUpdate({
    _id: req.body.id
  }, req.body).then(docs => {
    res.send(docs);
  });
});
router.post('/order', (req, res) => {
  Order.find({
    userId: req.body.userId
  }).then(order => {
    if (order) {
      res.status(200).json({
        orders: order,
      })
    } else {
      res.status(200).json({
        message: "Invalid authentication credentials!",
        result: null
      })
    }
  });
});
module.exports = router;
