const mongoose = require('mongoose');
const { Schema } = mongoose;

var Cart = mongoose.model("carts", {
    productId:{type :Schema.Types.ObjectId,ref:'product'},
    quantity: {type:Number},
    userId: {type:String},
    unitPrice: {type:Number}
});

module.exports = Cart ;