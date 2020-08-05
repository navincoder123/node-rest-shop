const mongoose=require('mongoose');

const schema= new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {type: String, required: true},
    price: { type: Number, required: true}
});

module.exports=mongoose.model('Shop', schema);