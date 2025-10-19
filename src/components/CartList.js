import React from 'react';
import CartItem from './CartItem';

export default function CartList({ cart, onDelete }) {
    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg border border-indigo-200 mt-12">
            <h3 className="text-3xl font-extrabold text-indigo-800 mb-6 border-b pb-3">
                Shopping Cart ({cart.length} Items)
            </h3>

            {cart.length === 0 && (
                <p className="text-center text-gray-500 py-8">Your cart is currently empty. Add some products!</p>
            )}

            <div className="space-y-1">
                {cart.map(item => (
                    <CartItem key={item.id} item={item} onDelete={onDelete} />
                ))}
            </div>
            <div className="mt-6 pt-4 flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-800">Grand Total:</span>
                <span className="text-3xl font-extrabold text-green-600">${cartTotal.toFixed(2)}</span>
            </div>
        </div>
    )
}