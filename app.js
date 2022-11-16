const admin = require("./dbAdmin");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
// const url = "mongodb+srv://<username>:<password>@clustername.mongodb.net/dailyjournalDB?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true";
//string interpolation using javascript string template
const uri = `mongodb+srv://${admin.dbAdmin.userName}:${admin.dbAdmin.password}@cluster0.uxrwxyx.mongodb.net/dailyjournalDB?retryWrites=true&w=majority`;
// const posts = [
//   {
//     postTitle:"Day1",
//     postContent:"hjfkhdfkfh ffhekfueafu ewf wefuiwhfkieufhuefhw fwa fiuhefiuhaeifkuhaeifhafi af hiefuheafiheifuhefue hfuehfiawehf weaf aewufhauiw fhaefufhaewfhaehfauwhfeuikaef kef kewufh",
//     postPath:"Day1"
//   }
// ];
mongoose.connect(uri);
const postSchema = new mongoose.Schema({
  postTitle:String,
  postContent:String
});
const Post = mongoose.model("Post",postSchema);
let post1 = new Post({
  postTitle:"newDay1",
  postContent:"hjfkhdfkfh ffhekfueafu ewf wefuiwhfkieufhuefhw fwa fiuhefiuhaeifkuhaeifhafi af hiefuheafiheifuhefue hfuehfiawehf weaf aewufhauiw fhaefufhaewfhaehfauwhfeuikaef kef kewufh",
  // postPath:"Day1"
});

// savePost(post1);

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Enim blandit volutpat maecenas volutpat blandit aliquam. Sit amet justo donec enim diam vulputate ut pharetra sit. Pellentesque massa placerat duis ultricies. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Erat imperdiet sed euismod nisi porta. Ipsum a arcu cursus vitae congue. Mollis aliquam ut porttitor leo a diam sollicitudin tempor. Nascetur ridiculus mus mauris vitae ultricies leo. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem. Ac feugiat sed lectus vestibulum mattis ullamcorper velit. Rhoncus est pellentesque elit ullamcorper. Ultrices eros in cursus turpis. Molestie ac feugiat sed lectus vestibulum. Arcu felis bibendum ut tristique et egestas quis ipsum suspendisse. Faucibus turpis in eu mi bibendum neque egestas congue. Amet dictum sit amet justo donec enim diam vulputate ut.";
const contactContent = "Aenean euismod elementum nisi quis eleifend quam adipiscing. Dapibus ultrices in iaculis nunc sed augue. Mi proin sed libero enim. Tempus egestas sed sed risus pretium. Erat nam at lectus urna duis. Tellus cras adipiscing enim eu turpis. Enim lobortis scelerisque fermentum dui. Etiam erat velit scelerisque in. Quis auctor elit sed vulputate mi sit amet. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum. Placerat in egestas erat imperdiet sed euismod nisi porta. Arcu non odio euismod lacinia at quis risus sed. Nunc id cursus metus aliquam.";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get("/",function(req,res){
  // console.log(posts);
  getAllposts(req,res);

})



app.get("/about",function(req,res){
  res.render("about",{aboutContent: aboutContent});
})

app.get("/contact",function(req,res){
  res.render("contact",{contactContent: contactContent});
})

app.get("/compose",function(req,res){
  res.render("compose");
})

app.post("/compose",function(req,res){

  let postPath = _.replace(req.body.postTitle," ","-");
  console.log(postPath);

  let post = new Post({
    postTitle:req.body.postTitle,
    postContent:req.body.postContent,
  });
  post.save(function(err,doc){
    if(!err){
      console.log("doc saved successfully "+doc.postTitle);
      res.redirect("/");
    }else{
      console.log("some problem saving the doc");
    }
  })
})

app.get("/posts/:postId",function(req,res){
  Post.findOne({_id:postId},(err,doc)=>{
    res.render("post",{post: doc});
  })
})
let port = process.env.PORT || 3000;
app.listen(port ,function(){
  console.log("server running on port "+port);
});

async function savePost(post){
  const res = await post.save();
  console.log(res);
}

async function getAllposts(req,res){
  try{
    const posts = await Post.find({});
    console.log(posts);
    res.render("home",{homeContent: homeStartingContent,posts: posts});
  }catch(err){
    console.log(err);
  }
}
