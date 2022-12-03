const router = require('express').Router();
const User= require('../models/User');
const bcrypt = require('bcrypt');
router.post("/register", async (req,res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser= await new User ({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
         });
        const user = await newUser.save();
        res.status(200).send(user);
    } catch {
        console.error("oops there is something wrong");
    }
})

router.post("/login", async (req,res)=> {
    try {
        const user= await User.findOne({email: req.body.email})
        !user && res.status(404).send("user doesn't exists");
        const passComp = await bcrypt.compare(req.body.password, user.password);
        !passComp && res.status(404).send("Invalid password");

        res.status(200).send(user);
    }
    catch {
        console.log("oops there is something wrong");
    }
})

module.exports= router;