
import React from 'react';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, onAddToCart, onDelete }) => {
    return (
        <div className={styles.card}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={onAddToCart} className="btn-add-to-cart">
                Add to Cart
            </button>
            <button onClick={onDelete} className="btn-delete">
                Remove
            </button>
        </div>
    );
};

export default ProductCard;