
import React, { useState } from 'react';

export default function Navbar({onSearchClick}) {
    return (
      <nav className='fixed w-full flex items-center justify-between h-auto shadow-md p-3 z-10 bg-white'>
        <h1 className='text-indigo-500 text-4xl font-sans font-bold'>ShoppingPaglu</h1>
        <div className='flex space-x-5 text-3xl'>
          <span onClick={() => onSearchClick()} className="cursor-pointer">🔍</span>
          <a href="#shopping-cart" className="text-gray-600 hover:text-indigo-600 transition cursor-pointer">
          <span>🛒</span></a>
        </div>
      </nav>
    )


}
 
