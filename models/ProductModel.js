const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    brand:{
        type: String,
        enum: ["Apple","Samsung","Lenovo"]
    },
    quantity:{
        price: Number
    },
    sold: {
        type: Number
    },
    images:{
        type: Array
    },
    color:{
        type: String,
        enum: ["Black","Brown","Red"]
    },
    ratings: [
        {
            star: Number,
            postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "ser"}
        }
    ]
});

//Export the model
module.exports = mongoose.model('Product', productSchema);