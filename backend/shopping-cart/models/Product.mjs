import mongoose from 'mongoose';

// Define the Product schema
const productSchema = new mongoose.Schema(
{
name: {
type: String,
required: true,
trim: true,
},
price: {
type: Number,
required: true,
min: 0, // Ensures the price is not negative
},
description: {
type: String,
required: true,
},
stock: {
type: Number,
required: true,
min: 0, // Ensures stock is not negative
},
category: {
type: String,
trim: true,
default: 'General', // Default category if none is provided
},
image: {
type: String,
default: '', // URL to the product image
},
},
{
timestamps: true,
}
);

// Compile the schema into a model
const Product = mongoose.model('Product', productSchema);

export default Product;