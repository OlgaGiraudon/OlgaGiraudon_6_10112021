const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
//1 user - 1  email
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);