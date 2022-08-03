const mongoose = require('mongoose');

var Product = mongoose.model("product", {
    name: {type : String},
    price: {type : String},
    fileName:{type : String},
    vendorId : {type : String}
});

module.exports = Product ;