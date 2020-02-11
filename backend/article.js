const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let Article=new Schema({
  name: { type: String },
  category: { type: String },
  price: { type: Number },
  description: { type: String },
  purchases: { type:Number },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date:{
    type: Date,
    default: Date.now
    } 
});

module.exports=mongoose.model('Article',Article);

/*
 user:{type:String},
 */