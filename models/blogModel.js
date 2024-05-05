const mongoose = require('mongoose'); 

var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    numViews:{
        type:Number,
        default:0,
    },
    isLiked:{
        type:String,
        required:false,
    },
    isDisliked:{
        type:Boolean,
        required:false,
    },
    likes:[{
        type: Types.ObjectId,
        ref: "User"
    }],
    likes:[{
        type: Types.ObjectId,
        ref: "User" 
    }],
    image:{
        type:string,
        default:"https://www.bing.com/images/search?view=detailV2&ccid=tvabjwNj&id=C3674F52A951075EEA7569CF11C1519B373EE361&thid=OIP.tvabjwNjlbY0mkD9OQbLZAHaE8&mediaurl=https%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2019%2f09%2f611582-blog-blogger-computer-internet-typography-text-media-blogging-social.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.b6f69b8f036395b6349a40fd3906cb64%3frik%3dYeM%252bN5tRwRHPaQ%26pid%3dImgRaw%26r%3d0&exph=3400&expw=5100&q=blog+images&simid=608046634012723503&FORM=IRPRST&ck=14730F63DB01700960E325454F63FA27&selectedIndex=0&itb=0&idpp=overlayview&ajaxhist=0&ajaxserp=0"
    },
    author:{
        type:"string",
        default:admin
    },
},
{
toJSON:{
    virtuals: true
},
toObject:{
    virtuals: true

},
timestamps: true
}
);

//Export the model
module.exports = mongoose.model('Blog', blogSchema);