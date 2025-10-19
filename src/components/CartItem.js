import React from 'react';

export default function CartItem({ item, onDelete }) {
    const subTotal = item.price * item.quantity;

    return (
        <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <div className="flex-1">
                <p className="inline text-lg font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center space-x-6 text-right">
                <span className="text-md font-medium text-gray-600">Qty: {item.quantity}</span>
                <span className="text-xl font-bold text-indigo-600">${subTotal.toFixed(2)}</span>
                <button onClick={() => onDelete(item.id)}className= "text-2xl">🗑️</button>
            </div>
        </div>
        
    )
}