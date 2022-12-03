const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    
  userId: {
         type: String,
         require: true,
  }, 
  shortDesc: {
         type: String,
         require: true,
  },
  longDesc: {
         type: String,
         require: true,
  },
  img: {
         type: String,
  },
  likes: {
         type: Array,
         default: [],
  },
},   
    

{timeStamps : true},
);
module.exports = mongoose.model("Post", PostSchema);