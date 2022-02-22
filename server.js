const express = require('express')
const mongoose = require("mongoose");
const app = express()
const port = 4000
app.use(express.json())
app.get('/', (req, res) => res.send('Hello World!'))

mongoose
    .connect("mongodb://127.0.0.1:27017/socialMedia")
    .then(console.log("Mongoose Connected........."))
const userModel=require('./models/User');
const postModel=require('./models/Post');

app.post("/api/login",async(req,res)=>{
    const username= req.body.username;
    const password=req.body.password;

    const user= await userModel.findOne({username:username,password:password})
    console.log(user);
    if(user != null){
        return res.json({data:"login Successfully",user:user})    
    }else{
        return res.json({data:"Wrong Credentials"})
    }
});

app.post("/api/register",(req,res)=>{
    const user=req.body;
    userModel.create(user);
    return res.json({data:"Registration successfully"});
});

//add post
app.post("/api/addpost",(req,res)=>{
    const post=req.body;
    postModel.create(post);
    return res.json({data:"Post add successfully"});

});

//delete
app.post("/api/deletepost",async(req,res)=>{
    console.log(req.body.id)
    const id=req.body.id;
   const deletedpost= await postModel.findOneAndDelete({_id:id});
   if(deletedpost != null){
    return res.json({data:"Post Deleted Successfully"});
   } else{
    return res.json({data:"Can't deleted "});
   }
})

app.put("/api/updatepost/:id",async(req,res)=>{
    console.log("id : ",req.body)
    const post=await postModel.findByIdAndUpdate(
        {_id:req.params.id},
        {pimg:req.body.pimg,
        pname:req.body.pname,
        pcaption:req.body.pcaption},
        {new:true})
    return res.json({data:"Post Update Successfully",post:post})
})

app.get("/api/get",async(req,res)=>{
    const postlist= await postModel.find({});
    if(postlist.length === 0){
        return res.json({data:"no Post fond"})
    }
   // console.log(postlist)
    return res.json({data:postlist})
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))