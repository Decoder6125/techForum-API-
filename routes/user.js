const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { findById } = require('../models/User');

//update an user
router.put("/:id", async (req,res) => {
    if(req.body.userId === req.params.id) {
       if(req.body.password) {
        const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try{
        const updatedUser= await User.findByIdAndUpdate(req.params.id, 
            {
                $set: req.body,
            },
            {
                new: true
            }
            );
        res.status(200).json(updatedUser);
    }
    catch {
        res.status(500).json(err);
    }

} else {
         res.status(401).json("You can update your account only");
      }  

});
//delete an user
router.delete("/:id", async (req,res) => {
    if(req.body.userId === req.params.id) {
    try{
        const deletedUser= await User.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedUser);
    }
    catch {
        res.status(500).json(err);
    }
    
} else {
         res.status(401).json("You can delete your account only");
      }  

});
// get an user
router.get("/:id", async (req,res) => {
    try{
        const user = await User.findOne({_id: req.params.id});  //Data.findById(id).exec()
        const {password, ...other} = user._doc;
        
        res.status(200).json(other);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
//follow an user
router.put("/:id/follow", async (req,res)=> {
    if(req.body.userId !== req.params.id) {
     
     try{
      const user = await User.findById(req.params.id);
      const currUser = await User.findById(req.body.userId);
      if(!user.followers.includes(req.body.userId)) 
      {
        await user.updateOne({$push: {followers: req.body.userId} });
        await currUser.updateOne({$push: {following: req.params.id} });
        res.status(200).json("You started following");
      }
      else {
        res.status(403).json("you already follow");

      }
     }catch(err) {
        res.status(500).json(err);
     }

    }
    else {
     res.status(404).json("You cannot follow yourself");
    }
});
//unfollow of an user
router.put("/:id/unfollow", async (req,res)=> {
    if(req.body.userId !== req.params.id) {
     
     try{
      const user = await User.findById(req.params.id);
      const currUser = await User.findById(req.body.userId);
      if(user.followers.includes(req.body.userId)) 
      {
        await user.updateOne({$pull: {followers: req.body.userId} });
        await currUser.updateOne({$pull: {following: req.params.id} });
        res.status(200).json("You unfollowed");
      }
      else {
        res.status(403).json("you donot already follow");

      }
     }catch(err) {
        res.status(500).json(err);
     }

    }
    else {
     res.status(404).json("You cannot unfollow yourself");
    }
});

module.exports= router;