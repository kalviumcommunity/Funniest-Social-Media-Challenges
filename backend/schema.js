const mongoose = require('mongoose');

// Define the schema for challenges
const challengeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
   
    challenge: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

});


// Create and export the model
const Challenge = mongoose.model("Challenge", challengeSchema);
module.exports = Challenge;