import mongoose from 'mongoose';

// Define the Order schema
const orderSchema = new mongoose.Schema(
{
user: {
type: mongoose.Schema.Types.ObjectId,
ref: 'User', // References the User model
required: true,
},
products: [
{
product: {
type: mongoose.Schema.Types.ObjectId,
ref: 'Product', // References the Product model
required: true,
},
quantity: {
type: Number,
required: true,
min: 1, // Minimum quantity is 1
},
},
],
totalAmount: {
type: Number,
required: true,
min: 0, // Ensures total amount is not negative
},
status: {
type: String,
enum: ['pending', 'completed', 'shipped', 'cancelled'],
default: 'pending', // Default status
},
paymentMethod: {
type: String,
enum: ['credit_card', 'paypal', 'cash_on_delivery'],
default: 'credit_card',
},
},
{
timestamps: true,
}
);

// Compile the schema into a model
const Order = mongoose.model('Order', orderSchema);

export default Order;