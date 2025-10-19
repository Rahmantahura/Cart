import React, { useState } from 'react';


export default function ProductItem({ product, onAddToCart }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <button
            onClick={() => onAddToCart(product)}
             className="mt-2 bg-indigo-500 text-white p-2 rounded">Add to Cart</button>
        </div>
    )
}

