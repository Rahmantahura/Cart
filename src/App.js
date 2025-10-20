import React, { useState } from 'react';

// Component 1: Navbar
// Now handles the search input and filtering logic display directly.
function Navbar({ searchInput, handleSearch, products, partialMatches, handleSelectSuggestion }) {
    // Determine if an exact match is found for a simple status message
    // Note: The status message is now hidden, as requested previously.
    const exactMatchProduct = products.find(p => p.name.toLowerCase() === searchInput.toLowerCase());
     

    return (
        <header className="fixed w-full top-0 bg-white shadow-md z-10 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
                
                {/* Logo Area */}
                <div className="text-3xl font-bold text-gray-800 flex-shrink-0 space-x-1">
                    <span className="text-blue-600">Dev</span>Books
                </div>

                {/* Search Bar Area */}
                <div className="flex-grow max-w-xl mx-8">
                    <div className="relative">
                        <input 
                            type="text" 
                            value={searchInput} 
                            onChange={handleSearch} 
                            placeholder="Search..."
                            className="w-full p-3 pl-4 pr-12 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 shadow-inner"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        {(searchInput.length > 0 && partialMatches.length > 0) && (
                            <div className="absolute w-full bg-white shadow-xl rounded-b-xl border-t-0 z-30 top-full max-h-64 overflow-y-auto">
                                {partialMatches.map(product => (
                                    <div 
                                        key={product.id} 
                                        className="p-3 hover:bg-gray-100 cursor-pointer transition duration-150 flex justify-between items-center"
                                        // NEW: Call the function and pass the product name
                                        onClick={() => handleSelectSuggestion(product.name)}
                                    >
                                        <p className="font-medium text-gray-700">{product.name}</p>
                                        <span className="text-sm text-blue-500 font-semibold">${product.price}</span>
                                    </div> 
                                ))}
                            </div>
                        )}
                        
                </div>
                </div>

                {/* Cart Icon / Status Area */}
                <div className="flex items-center space-x-4 flex-shrink-0">
                    <div className="hidden">
                        {exactMatchProduct 
                            ? <span className="text-green-600 font-bold">Match Found!</span>
                            : <span className="text-gray-500">Search Ready</span>
                        }
                    </div>
                    {/* Placeholder for Cart Icon (Now h-10 w-10 for a bigger icon) */}
                    <a href= '#shopping-cart'><div className="p-2 h-10 w-10 text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div></a>
                </div>
            </div>
        </header>
    );
}

// Component 2: ProductItem (No change)
function ProductItem({ product, onAddToCart }) {
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            <img 
                src={product.image || "https://placehold.co/150x150/e0f2f1/004d40?text=Book"} 
                alt={product.name} 
                className="w-full h-48 object-cover object-center"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/e0f2f1/004d40?text=Book"; }}
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h3>
                <p className="text-2xl font-bold text-blue-600 mt-1 mb-3">${product.price}</p>
                <button
                    onClick={() => onAddToCart(product)}
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-150 transform hover:scale-[1.01]"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

// Component 3: CartList (No change)
function CartList({ cart, onDelete }) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="mt-10 p-6 bg-white rounded-xl shadow-2xl border-t-4 border-blue-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart ({cart.length} items)</h2>
            {cart.length === 0 ? (
                <p className="text-gray-500 italic">Your cart is empty. Start shopping!</p>
            ) : (
                <>
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                            <div className="flex-grow">
                                <p className="font-medium text-gray-700">{item.name}</p>
                                <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
                            </div>
                            <button
                                onClick={() => onDelete(item.id)}
                                className="text-red-500 hover:text-red-700 transition"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="pt-4 mt-4 border-t-2 border-gray-200 flex justify-between items-center font-bold text-xl">
                        <span>Total:</span>
                        <span className="text-blue-600">${total.toFixed(2)}</span>
                    </div>
                </>
            )}
        </div>
    );
}

// Component 4: SearchModal (Unused, returning null)
function SearchModal({ onClose, searchTerm, handleSearchInput, results }) {
    return null; 
}


// Component 5: ProductSearch (Removed as its logic is merged into App/Navbar)
// function ProductSearch({ products, onExactMatchFound }) { return null; }


// --- Main App Component ---
export default function App() {
    const [searchInput, setSearchInput] = useState('');
    const [productToDisplay, setProductToDisplay] = useState(null); // Controls main content
    const [partialMatches, setPartialMatches] = useState([]);

    // New combined handler for search input, containing all filtering logic
    const handleSearch = (e) => {
        const newSearchTerm = e.target.value;
        const termLower = newSearchTerm.toLowerCase(); 
        setSearchInput(newSearchTerm);

        // Find Exact Match
        const foundExactMatch = products.find(product => {
            return product.name.toLowerCase() === termLower;
        });

        // Update the display state
        setProductToDisplay(foundExactMatch || null);

        const foundPartialMatch = products.filter(product => {
              return product.name.toLowerCase().includes(termLower)
        })
        setPartialMatches(foundPartialMatch)
        }

        const handleSelectSuggestion = (product) => {
            setProductToDisplay(product);
            setSearchInput(product.name);
            setPartialMatches([]);
        }


    // --- End New Search Logic ---

    


    // Unused states/handlers (kept them defined for a clean structure but are not used)
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); 
    const handleSearchToggle = () => { setIsSearchOpen(!isSearchOpen); }
    const handleSearchInput = (event) => { setSearchTerm(event.target.value); }


    const [products, setProducts] = useState([
        { id: 1, name: "C++ Guide", price: 100, image: "https://via.placeholder.com/150", description: "A comprehensive guide to modern C++ best practices and advanced features." },
        { id: 2, name: "Your Java Guide", price: 200, image: "https://via.placeholder.com/150", description: "Master object-oriented programming with Java from basics to enterprise applications." },
        { id: 3, name: "Good Parts Of JavaScript", price: 300, image: "https://via.placeholder.com/150", description: "Focus on the reliable and elegant features of JavaScript that lead to maintainable code." },
        { id: 4, name: "Learn with Python", price: 400, image: "https://via.placeholder.com/150", description: "An introductory course for Python scripting, data science, and web development." },
        { id: 5, name: "The Ultimate Swift Guide", price: 500, image: "https://via.placeholder.com/150", description: "Dive deep into Swift, Apple's powerful and intuitive language for app development." },
        { id: 6, name: "Learn with GO", price: 600, image: "https://via.placeholder.com/150", description: "Discover Go (Golang) for building fast, reliable, and efficient software at scale." },
        { id: 7, name: "Master Ruby", price: 700, image: "https://via.placeholder.com/150", description: "A classic guide to the Ruby language and the philosophy of Ruby on Rails." },
        { id: 8, name: "Kotlin Guide", price: 800, image: "https://via.placeholder.com/150", description: "The definitive guide to Kotlin, the modern language for Android and multi-platform development." },
        { id: 9, name: "Why PHP?", price: 900, image: "https://via.placeholder.com/150", description: "Explore the modern capabilities and frameworks of PHP for professional web services." },
        { id: 10, name: "Dear CSS", price: 1000, image: "https://via.placeholder.com/150", description: "Advanced CSS layout techniques including Flexbox, Grid, and responsive design." },
        { id: 11, name: "Whats Good About TypeScript", price: 1100, image: "https://via.placeholder.com/150", description: "Learn how TypeScript adds static typing to JavaScript to build larger, more robust applications." },
        { id: 12, name: "Store with SQL", price: 1200, image: "https://via.placeholder.com/150", description: "A practical guide to relational databases, SQL queries, and database optimization." }
    ]);

    const [cart, setCart] = useState([]);

    // --- Handlers ---
    const handleAddToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);

            if (existingItem) {
                return prevCart.map(item => 
                    item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1}]
            }
        })
    }

    const onDelete = (itemId) => {
        setCart(prevCart => {
            return prevCart.filter(item => item.id !== itemId);
        })
    }
    
    // --- RENDER ---
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar 
                searchInput={searchInput} 
                handleSearch={handleSearch} 
                products={products}
                partialMatches={partialMatches}
                handleSelectSuggestion={handleSelectSuggestion}
            />
            
            <main className={`pt-24 lg:pt-28 p-8 max-w-7xl mx-auto transition-filter duration-300`}>
                
                {productToDisplay ? (
                    // RENDER 1: Show the single, exact-match product card
                    <div className="flex justify-center w-full">
                        <div className="w-full md:w-3/4 lg:w-1/2 p-6 bg-white rounded-xl shadow-2xl border-2 border-green-500">
                            <h2 className="text-3xl font-extrabold text-green-700 mb-4">Exact Match Found!</h2>
                            <ProductItem product={productToDisplay} onAddToCart={handleAddToCart} />
                            <p className="mt-4 text-gray-700 italic">{productToDisplay.description || "No description available."}</p>
                            <button 
                                onClick={() => setProductToDisplay(null)}
                                className="mt-6 w-full py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
                            >
                                Back to All Products
                            </button>
                        </div>
                    </div>
                ) : (
                    // RENDER 2: Show the whole grid
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id='grid-area'>
                        {products.map(product => (
                        <ProductItem 
                            key={product.id}
                            product={product} 
                            onAddToCart={handleAddToCart}
                        />
                        ))}
                    </div>
                )}

                <div id="shopping-cart" className="mt-12">
                    <CartList cart={cart} onDelete={onDelete} />
                </div>
            </main>
        </div>
    );
}