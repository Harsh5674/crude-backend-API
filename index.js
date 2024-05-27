import express from "express";
import mongoose from "mongoose";
//const Product = require('./models/product_model.js');
import Product from './models/product_model.js';
import bodyparser from "body-parser"

const app = express();
const port = 4000;

app.use(express.json());
//app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:false}));

app.get("/",(req,res) => {
     res.send("Node API");
});

app.get('/api/products', async (req,res) => {
   try{
    const products = await Product.find({});
    res.status(200).json(products);
   }
   catch(error){
     res.status(500).json({message: error.message});
   }
});

app.get('/api/products/:id', async (req,res) => {
    try{
         const { id } = req.params;
         const product = await Product.findById(id);
         if(!product){
            return res.status(404).json({message: "Product not found"});
        }
         res.status(200).json(product);
    } 
    catch(error){
        res.status(500).json({message: error.message});
    }
});

app.post('/api/products', async (req,res) => {
    try{
       const product =  await Product.create(req.body);
       res.status(200).json(product);
    }
    catch(error){
         res.status(500).json({message: error.message}); 
    }
});

// update a product
app.put('/api/products/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        const updatedproduct = await Product.findById(id);
        res.status(200).json(updatedproduct);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
})

//delete a product
app.delete('/api/products/:id', async (req,res) => {
    try{
         const {id} = req.params;
         const product = await Product.findByIdAndDelete(id);

         if(!product){
            return res.status(404).json({message: "product not found"});
         }
         res.status(200).json({message: "Product deleted succefully!"});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
})

app.listen(port,() => {
       console.log(`Server is running on port ${port}`);
});

mongoose.connect('mongodb+srv://fugah:harsh271203@backenddb.4zuybfx.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB')
  .then(() => {
        console.log("Connected to Database!");
  })
  .catch(() => {
       console.log("Connection to Database failed!");
  });

// const Connection = async() => {
//         const URL = `mongodb+srv://fugah:harsh#2712@backenddb.4zuybfx.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB`;
//         try{
//             await mongoose.connect(URL,{ useUnifiedTopology: true, useNewUrlParser: true });
//             console.log("Connected to Database!");
//         }
//         catch(error){
//             console.log("Connection to Database failed!", error);
//         }
// }