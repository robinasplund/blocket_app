const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
// Create a schema for a town
let userSchema = new Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  phone: { type: Number, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  articles:[{type: Schema.Types.ObjectId, ref: 'Article'}]
  //articles:[String]

});
 
// pre save let's us replace/changed data
// before we save a document
userSchema.pre('save', async function(){
  // here we replace the password with the encrypted password
  this.password = await bcrypt.hash(this.password + passwordSalt, 10);
});
 
module.exports = db.model('User', userSchema);