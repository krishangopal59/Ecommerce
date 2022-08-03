const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce',(err)=>{
    if(!err){
        console.log("connection suceeded");
    }
    else{
        console.log("error in connnecting with database" + JSON.stringify(err,undefined,2));
    }
}); 
module.exports = mongoose;