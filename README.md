<!-- # final-project-full-stack

A user friendly electronics shopping app where user can shop electronics which has description and prices...user can also add the product,delete it and edit the cart and also use login and signup page...

Technologies Used

Backend Technologies:
Node.js: 
Express.js:
MongoDB: 
Mongoose: 
dotenv: 
Nodemon: 


Endpoints
1. Product Endpoints (/api/products)
2. User Endpoints (/api/users) 
3. Order Endpoints (/api/orders)  

Models
Product Model (models/Product.js): Defines the schema for products.
User Model (models/User.js): Defines the schema for users.
Order Model (models/Order.js): Defines the schema for orders.

3. Controllers
Product Controller (controllers/productController.mjs): Handles CRUD operations for products.
User Controller (controllers/userController.mjs): Handles registration and login for users.
Order Controller (controllers/orderController.mjs): Handles order creation and retrieval.

4. Routes
Product Routes (routes/productRoutes.mjs): Routes for CRUD operations on products.
User Routes (routes/userRoutes.mjs): Routes for user registration and login.
Order Routes (routes/orderRoutes.mjs): Routes for creating and fetching orders.

5. Connecting to MongoDB::Database Connection (db/conn.mjs)
Running the Backend Server

Frontend Technologies:
React: 
Vite: 
React Router: 
Axios:

 Main Components and Pages
Components:

Navbar.jsx: Navigation bar with links to different pages.
Footer.jsx: Footer of the application.
ProductCard.jsx: Displays individual product information with add to cart/remove options.

Pages:

HomePage: Landing page with basic navigation.
LoginPage: Handles user login and signup.
ShoppingPage: Displays products and allows adding/removing items to/from the cart.
CheckoutPage: Displays cart items and allows users to proceed with checkout.

services:api.js -api using axios


3. Cart State Management
Context API (context/CartContext.jsx): Used to manage the cart state globally.

4. API Service
services/api.js: Handles all API requests (products, users, orders).
Running the Frontend 