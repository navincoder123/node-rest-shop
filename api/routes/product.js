var router= require('express')();

const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/shop', {useUnifiedTopology:true ,  useNewUrlParser:true});
mongoose.promise= global.promise;

//mongoose.connect('mongodb+srv://navingupta:<Sambalpur@5>@navin.wjzkh.mongodb.net/<rest-shop>?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology:true});
/*
var schema= new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    price: Number
});
var shop= mongoose.model('Shop' , schema);

var shop1= new shop({
    name: 'navin Kumar Gupta',
    price : 150
});

shop1.save(function(err, Shop)
{
    if(err)
    {
        console.log("Sorry ! Encountered with error");
    }
    else{
        console.log(Shop);
        console.log('Successfully Saved');
    }
});*/




//var Shop=mongoose.model('Shop', schema);
//handling get ?product
//router.set('view-engine', 'ejs');

const Shop= require('../model/product');
router.get('/', (req, res, next)=>
{
    Shop.find()
    .select("name, price _id")
    .exec()
    .then(data=>{
        const response={
            count: data.length,
            products: data.map(data=>{
                return{
                    name: data.name, 
                    price: data.price,
                    _id: data._id,
                    response1: {
                        type: 'GET',
                        url: "http://localhost:3000/product/" +data.id
                    }
                }
            })
            
        }
        res.status(200).json({response});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message: "Sorrry its an Error",
            error: err
        });
    }) ;
});
router.post('/', (req, res, next)=>{
 
 
    var data= new Shop({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });

    data.save().then(data => {
        console.log(data);
        res.status(200).json({data});
    })
    .catch(err=>{ console.log(err)
    res.status(500).json({
      error:err
        });
  
    });
});

router.get('/:productId', (req, res, next)=>{
    const id=req.params.productId;
 /*   res.status(200).json({
    message:"Products Handller with id",*/

    Shop.find({_id: id})
    .select("name price _id")
    .exec()
    .then(data=> {
        console.log(data);
        if(data!=null){
        res.status(200).json(data);}
        else{
                console.log("Sorry Invalid Id Try Again");
        }
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:productname', (req, res, next)=>{
    const name= req.params.productname;
    Shop.remove({name : name})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({result});
    })
    .catch(err =>{
     console.log(err);
    res.status(500).json({
        error: err
    });
})
});


module.exports= router;