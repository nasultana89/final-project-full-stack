import Order from '../models/Order.mjs';
import mongoose from 'mongoose';

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('products.product');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

// Create a new order
export const createOrder = async (req, res) => {
    const { user, products, totalAmount, status } = req.body;

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
};

// Get an order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user').populate('products.product');

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
};

// Update an order by ID
export const updateOrder = async (req, res) => {
    const { user, products, totalAmount, status } = req.body;

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
};

// Delete an order by ID
export const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error });
    }
};