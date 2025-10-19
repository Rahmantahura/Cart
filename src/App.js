import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductItem from './components/ProductItem';
import CartList from './components/CartList';
import SearchModal from './components/SearchModal';


function App() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
    }

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchInput = (event) => {
        setSearchTerm(event.target.value);
    }


    const [products, setProducts] = useState([
        { id: 1, name: "C++ Guide", price: 100, image: "https://via.placeholder.com/150" },
        { id: 2, name: "Your Java Guide", price: 200, image: "https://via.placeholder.com/150" },
        { id: 3, name: "Good Parts Of JavaScript", price: 300, image: "https://via.placeholder.com/150" },
        { id: 4, name: "Learn with Python", price: 400, image: "https://via.placeholder.com/150" },
        { id: 5, name: "The Ultimate Swift Guide", price: 500, image: "https://via.placeholder.com/150" },
        { id: 6, name: "Learn with GO", price: 600, image: "https://via.placeholder.com/150" },
        { id: 7, name: "Master Ruby", price: 700, image: "https://via.placeholder.com/150" },
        { id: 8, name: "Kotlin Guide", price: 800, image: "https://via.placeholder.com/150" },
        { id: 9, name: "Why PHP?", price: 900, image: "https://via.placeholder.com/150" },
        { id: 10, name: "Dear CSS", price: 1000, image: "https://via.placeholder.com/150" },
        { id: 11, name: "Whats Good About TypeScript", price: 1100, image: "https://via.placeholder.com/150" },
        { id: 12, name: "Store with SQL", price: 1200, image: "https://via.placeholder.com/150" }
    ]);

    const [cart, setCart] = useState([]);

    const handleAddToCart = (placeholder) => {
        setCart(placeholder2 => {
            const existingItem = placeholder2.find(item => item.id === placeholder.id);

            if (existingItem) {
                return placeholder2.map(item => 
                    item.id === placeholder.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            } else {
                return [...placeholder2, { ...placeholder, quantity: 1}]
            }
        })
    }

    const onDelete = (itemId) => {
        setCart(placeholder2 => {
            return placeholder2.filter(item => item.id !== itemId);
        })
    }


    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar 
            onSearchClick={handleSearchToggle}/>
            {isSearchOpen ? <SearchModal
            onClose={handleSearchToggle}
            searchTerm={searchTerm}
            handleSearchInput={handleSearchInput} /> : null}
            <main className={`pt-20 lg:pt-20 p-8 max-w-7xl mx-auto transition-filter duration-300 ${isSearchOpen ? 'blur-sm pointer-events-none' : ' ' }`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products.map(product => (
                        <ProductItem key={product.id}
                        product={product} 
                        onAddToCart={handleAddToCart}/>
                    ))}
                </div>
                <div id="shopping-cart">
                <CartList cart={cart}
                onDelete={onDelete} />
                </div>
                </main>
        </div>
    );


}


export default App;
