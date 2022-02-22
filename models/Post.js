const mongoose  = require("mongoose");

const postSchema= mongoose.Schema({
    pimg:String,
    pname:String,
    pcaption:String,
});

const postModel= mongoose.model("post",postSchema,"post");

module.exports=postModel;
