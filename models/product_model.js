import mongoose from "mongoose";

const Productschema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true,
            default: "Enter Name:"

        },

        quantity: {
            type: Number,
            required: true,
            default: 0
        },

        price: {
             type: Number,
             required: true,
             default: 0
        }
    },
    {
        timestamps: true,
    }
    
    );

    const Product = mongoose.model("Product",Productschema);

    //module.exports=Product;
    export default Product;