
import express from 'express';
import Order from '../models/Order.mjs'; // Make sure this model is defined correctly
import mongoose from 'mongoose';
import {
    getAllOrders,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
} from '../controllers/orderController.mjs'; // Import the order controller functions

const router = express.Router();

// Define order routes using controller functions
router.get('/', getAllOrders);           // GET all orders
router.post('/', createOrder);           // POST a new order
router.get('/:id', getOrderById);        // GET an order by ID
router.put('/:id', updateOrder);         // PUT update an order by ID
router.delete('/:id', deleteOrder);      // DELETE an order by ID



// GET all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('products'); // Populate related data if needed
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
});

// POST a new order
router.post('/', async (req, res) => {
    const { user, products, totalAmount, status } = req.body; // Adjust fields as per your Order schema

    if (!user || !products || !totalAmount) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newOrder = new Order({ user, products, totalAmount, status });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: 'Error creating order', error });
    }
});

// GET an order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user').populate('products');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ message: 'Invalid Order ID format' });
        }
        res.status(500).json({ message: 'Error fetching order', error });
    }
});

// PUT update order by ID
router.put('/:id', async (req, res) => {
    const { user, products, totalAmount, status } = req.body; // Adjust fields as per your Order schema

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { user, products, totalAmount, status },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: 'Error updating order', error });
    }
});

// DELETE order by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
});

export default router;