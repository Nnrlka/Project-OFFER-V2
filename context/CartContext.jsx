import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    
    const value = {
        cartItems,
        cartCount: cartItems.length,
        addToCart: (item) => setCartItems(prev => [...prev, item]),
        clearCart: () => setCartItems([]),
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};