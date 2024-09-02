import express from 'express';
import User from '../models/User.mjs'; // Assuming you have this model defined properly
import mongoose from 'mongoose';
import {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
} from '../controllers/userController.mjs'; // Import the user controller functions

const router = express.Router();

// Define user routes using controller functions
router.get('/', getAllUsers);            // GET all users
router.post('/', createUser);            // POST a new user
router.get('/:id', getUserById);         // GET a user by ID
router.put('/:id', updateUser);          // PUT update a user by ID
router.delete('/:id', deleteUser);       // DELETE a user by ID



// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// POST a new user
router.post('/', async (req, res) => {
    const { name, email, password } = req.body; // Adjust fields as per your User schema

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
});

// GET a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        // Check if error is due to invalid ObjectId format
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ message: 'Invalid User ID format' });
        }
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

// PUT update user by ID
router.put('/:id', async (req, res) => {
    const { name, email, password } = req.body; // Adjust fields as per your User schema

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, password }, // Only update fields provided in the request
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
    }
});

// DELETE user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

export default router;