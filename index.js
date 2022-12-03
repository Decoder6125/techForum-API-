const express = require('express');
const app= express();
const userRoutes= require('./routes/user');
const authRoutes= require('./routes/auth');
const postRoutes = require('./routes/posts');
const mongoose= require('mongoose');
const helmet= require('helmet');
const morgan= require('morgan');
const dotenv= require('dotenv');
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.get("/", (req,res)=> {
    res.send("Api is working");
})
mongoose.connect(process.env.MONGO_URL, ()=> {
    console.log("Database connected");
});
app.listen(5000, ()=> {
    console.log("Server running on 5000");
})