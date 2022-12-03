const router = require('express').Router();
const Post = require('../models/Post');
const { findById } = require('../models/User');
//create post
router.post("/createpost", async (req,res)=> {
  const newPost = new Post(req.body);
    try { 
  const savePost = await newPost.save();
  res.status(200).json(savePost);
   } catch(err) {
    res.status(404).json(err);
   }
});
//update post
router.put("/:id", async (req, res)=> {
  try { 
 const post = await Post.findById(req.params.id);
  if(post.userId === req.body.userId) {
     await Post.updateOne({$set: req.body});
    res.status(200).json("post updated");
  }
  else {
     res.status(403).json("You can't update other's posts");
  }
  } catch(err) {
    res.status(403).json(err);
  }
});
//delete post
router.delete("/:id", async (req, res)=> {
    try { 
   const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
       await Post.deleteOne();
      res.status(200).json("post deleted");
    }
    else {
       res.status(403).json("You can't delete other's posts");
    }
    } catch(err) {
      res.status(403).json(err);
    }
  });
//like post
router.put("/:id/like", async (req,res)=> {
    
     try{
      const post = await Post.findById(req.params.id);
      if(!post.likes.includes(req.body.userId)) 
      {
        await post.updateOne({$push: {likes: req.body.userId} });
       
        res.status(200).json("post is liked");
      }
      else {
        await post.updateOne({$pull: {likes: req.body.userId} });
       
        res.status(200).json("post is disliked");

      }
     }catch(err) {
        res.status(500).json(err);
     }

    
});
//get Posts
router.get("/:id", async (req,res)=> {
    try {
    const posts = await Post.findById(req.params.id);
  res.status(200).json(posts);
    } catch(err) {
     res.status(403).json(err);
    }
});


module.exports = router;