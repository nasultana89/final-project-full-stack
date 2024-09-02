// db/conn.mjs
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// config mongoURI
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // Simplified connection without deprecated options
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;