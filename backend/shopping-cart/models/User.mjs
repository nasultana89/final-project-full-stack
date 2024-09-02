import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema(
{
name: {
type: String,
required: true,
trim: true,
},
email: {
type: String,
required: true,
unique: true,
trim: true,
lowercase: true,
},
password: {
type: String,
required: true,
},
role: {
type: String,
enum: ['user', 'admin'], // Can be expanded based on your needs
default: 'user',
},
},
{
timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
}
);

// Compile the schema into a model
const User = mongoose.model('User', userSchema);

export default User;