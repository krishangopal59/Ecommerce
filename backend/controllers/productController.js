const express = require('express');
var router = express.Router();
const multer = require("multer");
const dotenv = require('dotenv');
dotenv.config();
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads');
  },
  filename: function(req, file, cb){
      cb(null, new Date().getTime()+'-' + file.originalname)
  }
});
var upload = multer({storage});
var Products = require('../model/products.js');
var Cart = require('../model/cart.js');
const Order = require('../model/order.js');
const Stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

router.post('/', upload.single('image'), (req,res)=>{
    let url = req.protocol+"://"+req.get('host');
    new Products({
        name: req.body.name,
        price: req.body.price,
        fileName: url+"/uploads/"+req.file.filename,
        vendorId:req.body.vendorId
    }).save((err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            res.send("error in adding Products=>"+err);
        }
    });
});
router.get('/',(req,res)=>{
    Products.find().then(docs=>{
        res.send(docs);
    });
});
router.post('/vendor',(req,res)=>{
    Products.find({vendorId:req.body.vendorId}).then(docs=>{
        res.send(docs);
    });
});
router.post('/delete',(req,res)=>{
    Products.deleteOne({_id:req.body.productId}).then(docs=>{
        if(docs.deletedCount > 0){
            res.send({message :'deleted sucessfully'});
        }
    });Product
})
router.post('/fetch',(req,res)=>{
    Products.findOne({_id:req.body.productId,vendorId:req.body.vendorId}).then(docs=>{
        res.send(docs);
    });
});
router.post('/update',(req,res)=>{
    Products.findOneAndUpdate({_id:req.body.productId,vendorId:req.body.vendorId},{name:req.body.name,price:req.body.price}).then(docs=>{
        res.send(docs);
    });
});
router.post('/addToCart',(req,res)=>{
    new Cart (req.body).save((err,docs)=>{
        res.send(docs);
    })
});
router.post('/fetchCart',(req,res)=>{
    Cart.find({userId:req.body.userId}).populate({path:'productId'}).then(docs=>{
        res.send(docs);
    });
});
router.post('/remove',(req,res)=>{
    Cart.deleteOne(req.body).populate({path:'productId'}).then(docs=>{
        res.send(docs);
    });
});
router.post('/payment',async(req,res)=>{
    try {
        let data = [];
        let currency = "usd";
        let tax  = 0.12;
        let stripeData = [];
        
        await Cart.find({userId:req.body.userId}).populate({path:'productId'}).then(docs=>{
            stripeData = docs.map((item=>{
                return {
                    price_data:{
                        currency:currency,
                        product_data:{
                            name:item.productId.name,
                        },
                        unit_amount:Math.round((item.productId.price*100)*0.80+((item.productId.price*100)*0.80)*0.12),
                    },
                    quantity:item.quantity,
                }
            }));
        });
        const session = await Stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode:'payment',
            line_items:stripeData,
            success_url:'http://localhost:3000/product/paymentSuccess?userId='+req.body.userId,
            cancel_url:'http://localhost:4200/error',
        })
        res.json({url : session.url})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
});
router.get('/paymentSuccess',async (req,res)=>{
    let cart = [] ; 
    const paymentIntent = await Stripe.paymentIntents.update(
        'pi_3KZZauEQOU9gQDfz1OYPLDF2',
      );
      if(paymentIntent.status == 'succeeded'){
          await Cart.find({userId:req.query.userId}).populate({path:'productId'}).then(docs=>{
              cart = docs;
          });
          await Cart.deleteMany({userId:req.query.userId}).then(docs=>{
          })
          await new Order ({
              userId:req.query.userId,
              products:JSON.stringify(cart),
              totalAmount: (paymentIntent.amount_received)/100,
              paymentSuccess:true
          }).save((err,docs)=>{
              res.redirect("http://localhost:4200/")
          })
      }else
      {res.redirect("http://localhost:4200/checkout?status='unpaid'")}

})
module.exports = router,Stripe;
