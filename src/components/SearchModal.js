import React from 'react';

export default function SearchBar({ onClose, searchTerm, handleSearchInput }) {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <button onClick={onClose} className="absolute top-20 right-4 text-white text-3xl">❌</button>
            <form id='search-form' className="w-full max-w-xl mx-auto p-3">
            <input type='search' placeholder='Search...' value={searchTerm} onChange={handleSearchInput} className='w-full text-xl p-3 border rounded-lg'>
            </input>
            </form>
            </div>
    )
}