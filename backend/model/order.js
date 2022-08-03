const mongoose = require('mongoose');
const { Schema } = mongoose;

var Order = mongoose.model("orders", {
    userId: {type:String},
    products:{type:String},
    totalAmount: {type:Number},
    paymentSuccess:{type:Boolean}
});

module.exports = Order ;