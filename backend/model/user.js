const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
    address:{type :String},
    city: {type :String},
    state: {type :String},
    country: {type :String},
    zipCode: {type :String}
 });

var User = mongoose.model("users",  new mongoose.Schema({
    firstName:{type : String},
    lastName:{type : String},
    phoneNo:{type : Number},
    email: {type : String},
    image: {type:String},
    password: {type : String},
    isVendor : {type : Boolean},
    billingAddress:addressSchema,
}));

module.exports = User ;