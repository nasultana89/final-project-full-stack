//  Imports  
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './db/conn.mjs'
import userRoutes from './routes/userRoutes.mjs';
import productRoutes from './routes/productRoutes.mjs';
import orderRoutes from './routes/orderRoutes.mjs';
import cors from 'cors';

// Use CORS middleware
const app = express();
app.use(cors()); // Add the cors middleware
app.use(express.json());


// Load environment variables
dotenv.config();



// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define a test route
app.get('/', (req, res) => res.send('API is running...'));

// Define the routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Set the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

