const mongoose = require('mongoose');

const orderSchema= new mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    product: {type: mongoose.Types.ObjectId, ref: 'Shop', required: true},
    quantity: {type: Number, default: 1}
});

module.exports= mongoose.model('Order', orderSchema);   