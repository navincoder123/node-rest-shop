var express=require('express');
const router=express.Router();
const mongoose= require('mongoose');
const Order= require('../model/order');
const Shop=  require('../model/product');

router.get('/', (req, res, next)=>{
    Order.find()
    .select("product quantity _id")
    .exec()
    .then(data=>{
        const response={
            count: data.length,
            order: data.map(data=>{
                return{
                product: data.product,
                quantity: data.quantity,
                _id: data._id,
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/order/"+data.id
                }
            }
         })
        
        }
        res.status(200).json({response});
    })
    .catch(err=>{
        console.log(err);
        res.status(404).json({
            error: err     
        });
    });
});

router.post('/', (req, res, next)=>{

    Shop.findById(req.body.product)
    .exec()
    .then(data=>{
        const order= new Order({
            _id: new mongoose.Types.ObjectId(),
            product: req.body.product,
            quantity: req.body.quantity
        });
        return order.save();
    })
        .then(data=>{
           console.log(data);
            res.status(200).json({
                message: "SuccessFully Ordered The Product",
                OrderCreated: data
            });
        })
        .catch(err=>{
            console.log(err),
            res.status(404).json({
                error: err
            });
        });
        

    });
    

router.get('/:id' , (req, res, next)=>{
    const id= req.params.id;
    Order.find({_id: id})
    .select("product quantity _id")
    .exec()
    .then(data=>{
        console.log(data);
        res.status(200).json(data);
    })
    .catch(err=>{
        console.log(err);
        res.status(200).json({
            error: err
        });
    });
});
module.exports= router;