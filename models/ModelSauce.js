const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: {type: Number, required: true}, //level of spicy
    likes: {type: Number, required: false},
    dislikes: {type: Number, required: false},
    //usersLiked: {type: [ "String <userId>" ], required: true},
    //usersDisliked: {type: [ "String <userId>" ], required: true},
});

module.exports = mongoose.model('ModelSauce', sauceSchema);