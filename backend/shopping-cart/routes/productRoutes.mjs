
import express from 'express';
import Product from '../models/Product.mjs'; // Make sure this model is defined correctly
import mongoose from 'mongoose';

import {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.mjs'; // Import the product controller functions

const router = express.Router(); // Ensure this is defined before using it

// Define product routes using the controller functions
router.get('/', getAllProducts);           // GET all products
router.post('/', createProduct);           // POST a new product
router.get('/:id', getProductById);        // GET a product by ID
router.put('/:id', updateProduct);         // PUT update a product by ID
router.delete('/:id', deleteProduct);      // DELETE a product by ID

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
});

// POST a new product
router.post('/', async (req, res) => {
    const { name, price, description, stock } = req.body; // Adjust fields as per your Product schema

    if (!name || !price || !description || !stock) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newProduct = new Product({ name, price, description, stock });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error });
    }
});

// GET a product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ message: 'Invalid Product ID format' });
        }
        res.status(500).json({ message: 'Error fetching product', error });
    }
});

// PUT update product by ID
router.put('/:id', async (req, res) => {
    const { name, price, description, stock } = req.body; // Adjust fields as per your Product schema

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description, stock }, // Only update fields provided in the request
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error });
    }
});

// DELETE product by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});

export default router;