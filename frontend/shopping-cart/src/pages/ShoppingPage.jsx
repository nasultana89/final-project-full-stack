
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext'; // Use the Cart context

const ShoppingPage = () => {
    const [products, setProducts] = useState([]);
    const { addToCart, removeFromCart } = useCart(); // Access cart functions

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        getProducts();
    }, []);

    return (
        <div>
            <h2>Shopping Page</h2>
            <div className="product-list">
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onAddToCart={() => addToCart(product)} // Add to cart
                        onDelete={() => removeFromCart(product._id)} // Remove from cart
                    />
                ))}
            </div>
        </div>
    );
};

export default ShoppingPage;